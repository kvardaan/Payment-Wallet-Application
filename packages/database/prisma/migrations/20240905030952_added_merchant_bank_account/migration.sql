-- CreateTable
CREATE TABLE "MerchantBankAccount" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "merchantId" INTEGER NOT NULL,

    CONSTRAINT "MerchantBankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchantBankAccount_accountNumber_key" ON "MerchantBankAccount"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantBankAccount_merchantId_key" ON "MerchantBankAccount"("merchantId");

-- AddForeignKey
ALTER TABLE "MerchantBankAccount" ADD CONSTRAINT "MerchantBankAccount_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
