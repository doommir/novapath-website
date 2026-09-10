import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

// DATABASE_URL must be the Supabase Transaction pooler URI
// (Dashboard → Connect → Transaction pooler, typically port 6543).
// That mode is required for Vercel serverless; session/direct URLs
// can exhaust Postgres connections under bursty function traffic.
function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // PgBouncer transaction mode does not support prepared statements.
  const client = postgres(process.env.DATABASE_URL, { prepare: false });
  return drizzle(client, { schema });
}

type Database = ReturnType<typeof createDb>;

let cached: Database | undefined;

// Lazy so Vercel can import the Express app at build/trace time
// without requiring DATABASE_URL until a route actually queries.
export const db: Database = new Proxy({} as Database, {
  get(_target, prop, receiver) {
    cached ??= createDb();
    const value = Reflect.get(cached, prop, receiver);
    return typeof value === "function" ? value.bind(cached) : value;
  },
});
