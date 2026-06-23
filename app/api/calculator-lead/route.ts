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
    inputs      JSONB,
    result      JSONB,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tool, email = '', resultHeadline = '', resultLines = [], shareUrl = '', inputs = {}, result = {} } = body ?? {};

    if (!tool || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const pool = getPool();
    await pool.query(CREATE_TABLE_SQL);
    await pool.query(
      `INSERT INTO calculator_leads (tool, email, inputs, result) VALUES ($1, $2, $3, $4)`,
      [tool, email.trim(), JSON.stringify(inputs), JSON.stringify(result)],
    );

    const salesEmail = process.env.SALES_EMAIL;
    const payload = { tool, email: email.trim(), resultHeadline, resultLines, shareUrl };

    if (salesEmail) {
      const resultEmail = buildCalculatorResultEmail(payload);
      const notifyEmail = buildCalculatorLeadNotificationEmail(payload);
      await Promise.allSettled([
        sendMail({ to: email.trim(), from: `"Umer Khan" <${salesEmail}>`, subject: resultEmail.subject, html: resultEmail.html }),
        sendMail({ to: salesEmail, replyTo: email.trim(), subject: notifyEmail.subject, html: notifyEmail.html }),
      ]).then((results) => {
        results.forEach((r) => {
          if (r.status === 'rejected') console.error('Calculator lead email send failed:', r.reason);
        });
      });
    }

    await notifyLeadWebhook({ source: 'calculator-lead', tool, email: email.trim(), resultHeadline, resultLines, inputs, result });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Calculator lead submission failed:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
