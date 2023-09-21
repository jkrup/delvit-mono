/*
  Warnings:

  - You are about to drop the column `postId` on the `Schelling` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schelling" DROP CONSTRAINT "Schelling_postId_fkey";

-- AlterTable
ALTER TABLE "Schelling" DROP COLUMN "postId";

-- AddForeignKey
ALTER TABLE "Schelling" ADD CONSTRAINT "Schelling_bestPostId_fkey" FOREIGN KEY ("bestPostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
