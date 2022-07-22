/*
  Warnings:

  - Made the column `address` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "company" ADD COLUMN     "type" TEXT;
