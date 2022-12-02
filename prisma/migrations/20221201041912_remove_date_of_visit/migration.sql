/*
  Warnings:

  - You are about to drop the column `date_of_visit` on the `visitedPark` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "visitedPark" DROP COLUMN "date_of_visit";

-- DropEnum
DROP TYPE "DofV";
