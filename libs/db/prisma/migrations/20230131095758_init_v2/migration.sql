-- CreateEnum
CREATE TYPE "QuestionStateState" AS ENUM ('PENDING', 'ACTIVE', 'CLOSED');

-- CreateEnum
CREATE TYPE "EvidenceType" AS ENUM ('FOR', 'AGAINST');

-- CreateTable
CREATE TABLE "QuestionState" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "state" "QuestionStateState" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,
    "forPercent" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imgSrc" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceOnQuestion" (
    "parentQuestionId" TEXT NOT NULL,
    "evidencePostId" TEXT NOT NULL,
    "evidenceType" "EvidenceType" NOT NULL
);

-- CreateTable
CREATE TABLE "EvidenceOnPost" (
    "parentPostId" TEXT NOT NULL,
    "evidencePostId" TEXT NOT NULL,
    "evidenceType" "EvidenceType" NOT NULL
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT,
    "questionId" TEXT,
    "commentId" TEXT,
    "vote" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "parentCommentId" TEXT,
    "depth" INTEGER NOT NULL DEFAULT 0,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "postId" TEXT,
    "questionId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicOnQuestion" (
    "topicId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TopicOnPost" (
    "topicId" TEXT NOT NULL,
    "postId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Web3Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Web3Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EvidenceOnQuestion_evidencePostId_parentQuestionId_key" ON "EvidenceOnQuestion"("evidencePostId", "parentQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "EvidenceOnPost_evidencePostId_parentPostId_key" ON "EvidenceOnPost"("evidencePostId", "parentPostId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_id_key" ON "Vote"("id");

-- CreateIndex
CREATE INDEX "user_post" ON "Vote"("userId", "postId");

-- CreateIndex
CREATE INDEX "user_question" ON "Vote"("userId", "questionId");

-- CreateIndex
CREATE INDEX "user_comment" ON "Vote"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "TopicOnQuestion_topicId_questionId_key" ON "TopicOnQuestion"("topicId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "TopicOnPost_topicId_postId_key" ON "TopicOnPost"("topicId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "Web3Account_provider_address_key" ON "Web3Account"("provider", "address");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "QuestionState" ADD CONSTRAINT "QuestionState_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceOnQuestion" ADD CONSTRAINT "EvidenceOnQuestion_parentQuestionId_fkey" FOREIGN KEY ("parentQuestionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceOnQuestion" ADD CONSTRAINT "EvidenceOnQuestion_evidencePostId_fkey" FOREIGN KEY ("evidencePostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceOnPost" ADD CONSTRAINT "EvidenceOnPost_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceOnPost" ADD CONSTRAINT "EvidenceOnPost_evidencePostId_fkey" FOREIGN KEY ("evidencePostId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnQuestion" ADD CONSTRAINT "TopicOnQuestion_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnQuestion" ADD CONSTRAINT "TopicOnQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnPost" ADD CONSTRAINT "TopicOnPost_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicOnPost" ADD CONSTRAINT "TopicOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Web3Account" ADD CONSTRAINT "Web3Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
