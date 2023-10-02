-- CreateEnum
CREATE TYPE "DisbursementKind" AS ENUM ('SYSTEM', 'VOTE', 'CONSENSUS');

-- CreateTable
CREATE TABLE "PointDisbursement" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "kind" "DisbursementKind" NOT NULL DEFAULT 'VOTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "questionId" TEXT,

    CONSTRAINT "PointDisbursement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointDisbursement" ADD CONSTRAINT "PointDisbursement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointDisbursement" ADD CONSTRAINT "PointDisbursement_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
