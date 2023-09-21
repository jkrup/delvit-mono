/*
  Warnings:

  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'https://ipfs.io/ipfs/QmWPg7N5oD2SQ5ML2ZhbpUYtxv8NP322iTWycCs8YWxP9T';
