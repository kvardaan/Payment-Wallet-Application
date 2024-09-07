/*
  Warnings:

  - You are about to drop the `MerchantPayments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SettlementStatus" AS ENUM ('Pending', 'Processing', 'Completed', 'Failed');

-- DropForeignKey
ALTER TABLE "MerchantPayments" DROP CONSTRAINT "MerchantPayments_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "MerchantPayments" DROP CONSTRAINT "MerchantPayments_userId_fkey";

-- DropTable
DROP TABLE "MerchantPayments";

-- CreateTable
CREATE TABLE "MerchantPayment" (
    "id" TEXT NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "settlementId" TEXT,

    CONSTRAINT "MerchantPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantSettlement" (
    "id" TEXT NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "SettlementStatus" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "MerchantSettlement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MerchantPayment" ADD CONSTRAINT "MerchantPayment_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantPayment" ADD CONSTRAINT "MerchantPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantPayment" ADD CONSTRAINT "MerchantPayment_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES "MerchantSettlement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantSettlement" ADD CONSTRAINT "MerchantSettlement_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
