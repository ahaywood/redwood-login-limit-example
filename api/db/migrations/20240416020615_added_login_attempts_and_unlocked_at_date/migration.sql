-- AlterTable
ALTER TABLE "User" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unlockedAt" TIMESTAMP(3);
