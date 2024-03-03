import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../../migrations/schema";

if (!process.env.DATABASE_URL) {
  console.log("🔴 no database URL");
}

const client = postgres(process.env.DATABASE_URL as string);
const db = drizzle(client, { schema });

export default db;
