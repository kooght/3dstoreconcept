import { PrismaClient } from "@prisma/client";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function resolveDatabaseUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // On Vercel (read-only FS), copy SQLite DB into /tmp for runtime access.
  if (process.env.VERCEL) {
    const source = path.join(process.cwd(), "prisma", "dev.db");
    const targetDir = "/tmp";
    const target = path.join(targetDir, "dev.db");
    try {
      if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
      if (existsSync(source) && !existsSync(target)) {
        copyFileSync(source, target);
      }
      return `file:${target}`;
    } catch {
      return `file:${source}`;
    }
  }

  return "file:./dev.db";
}

function createPrismaClient() {
  process.env.DATABASE_URL = resolveDatabaseUrl();
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
