-- CreateTable
CREATE TABLE "Consensus" (
    "questionId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "confidence" TEXT NOT NULL,
    "answer" "EvidenceType" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Consensus_questionId_key" ON "Consensus"("questionId");

-- AddForeignKey
ALTER TABLE "Consensus" ADD CONSTRAINT "Consensus_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
