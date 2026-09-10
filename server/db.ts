import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

function createDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema });
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
