-- CreateEnum
CREATE TYPE "SchellingState" AS ENUM ('INVITED', 'PENDING', 'SUBMITTED');

-- CreateTable
CREATE TABLE "Schelling" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "confidence" INTEGER NOT NULL,
    "bestPostId" TEXT NOT NULL,
    "personalAnswer" BOOLEAN NOT NULL,
    "state" "SchellingState" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Schelling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schelling_userId_questionId_key" ON "Schelling"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "Schelling" ADD CONSTRAINT "Schelling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schelling" ADD CONSTRAINT "Schelling_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schelling" ADD CONSTRAINT "Schelling_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
