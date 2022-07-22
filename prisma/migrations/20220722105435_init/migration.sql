-- CreateEnum
CREATE TYPE "ComnpanyStatus" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "company" ADD COLUMN     "status" "ComnpanyStatus" NOT NULL DEFAULT 'active';
