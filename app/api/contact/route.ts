import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { sendMail } from '@/lib/mailer';
import { buildAutoReplyEmail, buildLeadNotificationEmail } from '@/lib/emailTemplates';
import { notifyLeadWebhook } from '@/lib/n8n';

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id          SERIAL PRIMARY KEY,
    service     TEXT,
    follow_up   TEXT,
    budget      TEXT,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    details     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { service = '', followUp = '', budget = '', name = '', email = '', details = '' } = body ?? {};

    if (!name.trim() || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ error: 'Name and a valid email are required.' }, { status: 400 });
    }

    const form = { service, followUp, budget, name: name.trim(), email: email.trim(), details };

    const pool = getPool();
    await pool.query(CREATE_TABLE_SQL);
    await pool.query(
      `INSERT INTO contact_submissions (service, follow_up, budget, name, email, details)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [form.service, form.followUp, form.budget, form.name, form.email, form.details],
    );

    /* Email sending is best-effort — the lead is already safely in
       the database, so a mail failure shouldn't surface as an error
       to the person submitting the form. */
    const salesEmail = process.env.SALES_EMAIL;
    if (salesEmail) {
      const notify = buildLeadNotificationEmail(form);
      const reply = buildAutoReplyEmail(form);
      await Promise.allSettled([
        sendMail({ to: salesEmail, replyTo: form.email, subject: notify.subject, html: notify.html }),
        sendMail({ to: form.email, from: `"Umer Khan" <${salesEmail}>`, subject: reply.subject, html: reply.html }),
      ]).then((results) => {
        results.forEach((r) => {
          if (r.status === 'rejected') console.error('Contact email send failed:', r.reason);
        });
      });
    }

    await notifyLeadWebhook({ source: 'contact', tool: 'Contact Form', email: form.email, message: details, inputs: form, result: {} });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form submission failed:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again or email me directly.' }, { status: 500 });
  }
}
