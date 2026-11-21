import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { sendMail } from '@/lib/mailer';
import { buildCalculatorResultEmail, buildCalculatorLeadNotificationEmail } from '@/lib/emailTemplates';
import { notifyLeadWebhook } from '@/lib/n8n';

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS calculator_leads (
    id          SERIAL PRIMARY KEY,
    tool        TEXT NOT NULL,
    email       TEXT NOT NULL,
    name        TEXT,
    company     TEXT,
    role        TEXT,
    inputs      JSONB,
    result      JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );
  ALTER TABLE calculator_leads ADD COLUMN IF NOT EXISTS name TEXT;
  ALTER TABLE calculator_leads ADD COLUMN IF NOT EXISTS company TEXT;
  ALTER TABLE calculator_leads ADD COLUMN IF NOT EXISTS role TEXT;
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tool,
      email = '',
      name = '',
      company = '',
      role = '',
      resultHeadline = '',
      resultLines = [],
      shareUrl = '',
      inputs = {},
      result = {},
    } = body ?? {};

    if (!tool || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const salesEmail = process.env.SALES_EMAIL;
    const payload = { tool, email: email.trim(), name: name.trim(), company: company.trim(), role: role.trim(), resultHeadline, resultLines, shareUrl };

    /* Database, email and n8n are independent routes; the lead only fails when none takes it. */
    const saveToDb = async () => {
      if (!process.env.DATABASE_URL) return false;
      const pool = getPool();
      await pool.query(CREATE_TABLE_SQL);
      await pool.query(
        `INSERT INTO calculator_leads (tool, email, name, company, role, inputs, result) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [tool, email.trim(), name.trim() || null, company.trim() || null, role.trim() || null, JSON.stringify(inputs), JSON.stringify(result)],
      );
      return true;
    };

    const resultEmail = buildCalculatorResultEmail(payload);
    const notifyEmail = buildCalculatorLeadNotificationEmail(payload);
    const [db, sentResult, notified, hook] = await Promise.allSettled([
      saveToDb(),
      sendMail({ to: email.trim(), subject: resultEmail.subject, html: resultEmail.html }).then(() => true),
      salesEmail ? sendMail({ to: salesEmail, replyTo: email.trim(), subject: notifyEmail.subject, html: notifyEmail.html }).then(() => true) : Promise.resolve(false),
      notifyLeadWebhook({ source: 'calculator-lead', tool, email: email.trim(), name: name.trim(), company: company.trim(), role: role.trim(), resultHeadline, resultLines, inputs, result }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') console.error(`Calculator ${['db save', 'result email', 'lead email', 'webhook'][i]} failed:`, r.reason);
      });
      return results.map((r) => r.status === 'fulfilled' && r.value === true);
    });

    if (!db && !sentResult && !notified && !hook) {
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Calculator lead submission failed:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
