/*
  Warnings:

  - You are about to drop the column `auth_type` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "auth_type";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "externalId" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropEnum
DROP TYPE "AuthType";

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");
