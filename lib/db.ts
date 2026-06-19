import { Pool } from 'pg';

/* Reuse a single pool across hot-reloads / serverless invocations
   instead of opening a new connection per request. */
declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

export function getPool(): Pool {
  if (!global.__pgPool) {
    global.__pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }
  return global.__pgPool;
}
