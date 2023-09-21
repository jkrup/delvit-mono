-- CreateEnum
CREATE TYPE "OpinionOpinion" AS ENUM ('AGREE', 'DISAGREE');

-- CreateTable
CREATE TABLE "Opinion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "opinion" "OpinionOpinion" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "opinion_user_question" ON "Opinion"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
