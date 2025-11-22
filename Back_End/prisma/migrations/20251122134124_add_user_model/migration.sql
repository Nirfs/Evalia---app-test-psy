/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Psychologist` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Psychologist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Psychologist` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Psychologist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Psychologist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Psychologist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PSYCHOLOGIST', 'PATIENT', 'ADMIN');

-- DropIndex
DROP INDEX "Patient_email_key";

-- DropIndex
DROP INDEX "Psychologist_email_key";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Psychologist" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Psychologist_userId_key" ON "Psychologist"("userId");

-- AddForeignKey
ALTER TABLE "Psychologist" ADD CONSTRAINT "Psychologist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
