-- DropForeignKey
ALTER TABLE "Consensus" DROP CONSTRAINT "Consensus_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Opinion" DROP CONSTRAINT "Opinion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Opinion" DROP CONSTRAINT "Opinion_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_authorId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionState" DROP CONSTRAINT "QuestionState_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Schelling" DROP CONSTRAINT "Schelling_bestPostId_fkey";

-- DropForeignKey
ALTER TABLE "Schelling" DROP CONSTRAINT "Schelling_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Schelling" DROP CONSTRAINT "Schelling_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- AddForeignKey
ALTER TABLE "Schelling" ADD CONSTRAINT "Schelling_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schelling" ADD CONSTRAINT "Schelling_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schelling" ADD CONSTRAINT "Schelling_bestPostId_fkey" FOREIGN KEY ("bestPostId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionState" ADD CONSTRAINT "QuestionState_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consensus" ADD CONSTRAINT "Consensus_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
