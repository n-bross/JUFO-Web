import { Pool } from 'pg';

let pool;

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL ist nicht gesetzt.');
  }

  if (!pool) {
    const sslConfig =
      process.env.NODE_ENV === 'production'
        ? {
            rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false',
            ...(process.env.DATABASE_SSL_CA ? { ca: process.env.DATABASE_SSL_CA } : {}),
          }
        : undefined;

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: sslConfig,
    });
  }

  return pool;
}
