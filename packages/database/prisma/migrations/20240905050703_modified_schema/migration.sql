/*
  Warnings:

  - Made the column `imageUrl` on table `Merchant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "locked" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "imageUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "MerchantBalance" ALTER COLUMN "amount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imageUrl" SET NOT NULL;
