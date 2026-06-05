// Prisma CLI reads DATABASE_URL (or DIRECT_DATABASE_URL) from .env via dotenv.
// Runtime app connections use DATABASE_URL (pooled) in src/lib/prisma.ts.
import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl =
  process.env["DIRECT_DATABASE_URL"] || process.env["DATABASE_URL"];

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
