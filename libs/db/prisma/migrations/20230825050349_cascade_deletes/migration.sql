-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_questionId_fkey";

-- DropForeignKey
ALTER TABLE "EvidenceOnPost" DROP CONSTRAINT "EvidenceOnPost_evidencePostId_fkey";

-- DropForeignKey
ALTER TABLE "EvidenceOnPost" DROP CONSTRAINT "EvidenceOnPost_parentPostId_fkey";

-- DropForeignKey
ALTER TABLE "EvidenceOnQuestion" DROP CONSTRAINT "EvidenceOnQuestion_evidencePostId_fkey";

-- DropForeignKey
ALTER TABLE "EvidenceOnQuestion" DROP CONSTRAINT "EvidenceOnQuestion_parentQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "TopicOnPost" DROP CONSTRAINT "TopicOnPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "TopicOnPost" DROP CONSTRAINT "TopicOnPost_topicId_fkey";

-- DropForeignKey
ALTER TABLE "TopicOnQuestion" DROP CONSTRAINT "TopicOnQuestion_questionId_fkey";

-- DropForeignKey
ALTER TABLE "TopicOnQuestion" DROP CONSTRAINT "TopicOnQuestion_topicId_fkey";

-- AddForeignKey
ALTER TABLE "EvidenceOnQuestion" ADD CONSTRAINT "EvidenceOnQuestion_parentQuestionId_fkey" FOREIGN KEY ("parentQuestionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceOnQuestion" ADD CONSTRAINT "EvidenceOnQuestion_evidencePostId_fkey" FOREIGN KEY ("evidencePostId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceOnPost" ADD CONSTRAINT "EvidenceOnPost_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceOnPost" ADD CONSTRAINT "EvidenceOnPost_evidencePostId_fkey" FOREIGN KEY ("evidencePostId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnQuestion" ADD CONSTRAINT "TopicOnQuestion_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnQuestion" ADD CONSTRAINT "TopicOnQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnPost" ADD CONSTRAINT "TopicOnPost_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnPost" ADD CONSTRAINT "TopicOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
