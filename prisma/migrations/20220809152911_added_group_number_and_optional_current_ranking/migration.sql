/*
  Warnings:

  - A unique constraint covering the columns `[teamName]` on the table `SoccerDB` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `groupNumber` to the `SoccerDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationDate` to the `SoccerDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamName` to the `SoccerDB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SoccerDB" ADD COLUMN     "currentRanking" INTEGER,
ADD COLUMN     "goalsScored" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "groupNumber" INTEGER NOT NULL,
ADD COLUMN     "matchesDrawn" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "matchesLost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "matchesWon" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "registrationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "teamName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SoccerDB_teamName_key" ON "SoccerDB"("teamName");
