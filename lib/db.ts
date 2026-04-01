import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  var dbInitPromise: Promise<void> | undefined;
}

function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0) {
    return process.env.DATABASE_URL;
  }

  if (process.env.NETLIFY) {
    return "file:/tmp/url-shortener.db";
  }

  return "file:./dev.db";
}

process.env.DATABASE_URL = resolveDatabaseUrl();

export const db =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}

async function ensureSqliteTables() {
  await db.$executeRawUnsafe(`PRAGMA foreign_keys = ON`);

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Link" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "originalUrl" TEXT NOT NULL,
      "shortCode" TEXT NOT NULL,
      "customAlias" TEXT,
      "manageTokenHash" TEXT NOT NULL,
      "passwordHash" TEXT,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "expiresAt" DATETIME,
      "clickCount" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Link_shortCode_key" ON "Link"("shortCode")`);
  await db.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "Link_customAlias_key" ON "Link"("customAlias")`);
  await db.$executeRawUnsafe(
    `CREATE UNIQUE INDEX IF NOT EXISTS "Link_manageTokenHash_key" ON "Link"("manageTokenHash")`
  );

  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ClickEvent" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "linkId" TEXT NOT NULL,
      "referrer" TEXT,
      "userAgent" TEXT,
      "ipHash" TEXT,
      "country" TEXT,
      "clickedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "ClickEvent_linkId_fkey"
        FOREIGN KEY ("linkId")
        REFERENCES "Link" ("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `);

  await db.$executeRawUnsafe(
    `CREATE INDEX IF NOT EXISTS "ClickEvent_linkId_clickedAt_idx" ON "ClickEvent"("linkId", "clickedAt")`
  );

  const linkColumns = await db.$queryRawUnsafe<Array<{ name: string }>>(`PRAGMA table_info("Link")`);
  const hasPasswordHashColumn = linkColumns.some((column) => column.name === "passwordHash");

  if (!hasPasswordHashColumn) {
    await db.$executeRawUnsafe(`ALTER TABLE "Link" ADD COLUMN "passwordHash" TEXT`);
  }
}

export async function ensureDatabaseReady() {
  const url = process.env.DATABASE_URL ?? "";

  if (!url.startsWith("file:")) {
    return;
  }

  if (!global.dbInitPromise) {
    global.dbInitPromise = ensureSqliteTables();
  }

  await global.dbInitPromise;
}
