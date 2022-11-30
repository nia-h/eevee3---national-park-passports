-- CreateEnum
CREATE TYPE "DofV" AS ENUM ('Date', 'null');

-- AlterTable
ALTER TABLE "visitedPark" ADD COLUMN     "date_of_visit" "DofV" NOT NULL DEFAULT 'null';
