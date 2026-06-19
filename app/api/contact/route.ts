import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

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

    const pool = getPool();
    await pool.query(CREATE_TABLE_SQL);
    await pool.query(
      `INSERT INTO contact_submissions (service, follow_up, budget, name, email, details)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [service, followUp, budget, name.trim(), email.trim(), details],
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form submission failed:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again or email me directly.' }, { status: 500 });
  }
}
