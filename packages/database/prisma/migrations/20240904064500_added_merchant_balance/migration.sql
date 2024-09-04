/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MerchantBalance" (
    "id" SERIAL NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "MerchantBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchantBalance_merchantId_key" ON "MerchantBalance"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_externalId_key" ON "Merchant"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_username_key" ON "Merchant"("username");

-- AddForeignKey
ALTER TABLE "MerchantBalance" ADD CONSTRAINT "MerchantBalance_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
