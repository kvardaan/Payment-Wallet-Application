-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_toMerchantId_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_toUserId_fkey";

-- AlterTable
ALTER TABLE "Transfer" ALTER COLUMN "toUserId" DROP NOT NULL,
ALTER COLUMN "toMerchantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_toMerchantId_fkey" FOREIGN KEY ("toMerchantId") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
