-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN IF NOT EXISTS "platform" TEXT;
ALTER TABLE "ContactSubmission" ADD COLUMN IF NOT EXISTS "connectionMode" TEXT;
ALTER TABLE "ContactSubmission" ADD COLUMN IF NOT EXISTS "budget" TEXT;
