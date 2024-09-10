'use server'

import { auth } from '@clerk/nextjs/server'

import prisma from '@repo/db'
import { formatDateTime } from './utils'

/**
 * Gets the merchant id
 */
export async function getMerchantId() {
	const { userId } = auth()

	if (!userId) return

	const merchant = await prisma.merchant.findUnique({
		where: { externalId: userId },
	})

	return merchant?.id
}

/**
 * Gets the merchant balance
 */
export async function getMerchantBalance() {
	const merchantId = await getMerchantId()

	const merchantBalance = await prisma.merchantBalance.findFirst({
		where: { merchantId },
	})

	return {
		amount: merchantBalance?.amount || 0,
	}
}

/**
 * Gets the merchant bank account
 */
export async function getMerchantBankAccount() {
	const merchantId = await getMerchantId()

	const merchantBankAccount = await prisma.merchantBankAccount.findFirst({
		where: { merchantId },
	})

	if (!merchantBankAccount) return

	return {
		bankName: merchantBankAccount.bankName,
		accountNumber: merchantBankAccount.accountNumber,
		balance: merchantBankAccount.balance / 100,
	}
}

/**
 * Gets the merchant payments (receivables)
 */
export async function getMerchantPayments() {
	const merchantId = await getMerchantId()

	const merchantPayments = await prisma.merchantPayment.findMany({
		where: { merchantId },
		include: {
			user: {
				select: {
					name: true,
					username: true,
				},
			},
		},
		orderBy: { timestamp: 'desc' },
	})

	return merchantPayments?.map((payment) => ({
		id: payment.id,
		amount: payment.amount / 100,
		date: formatDateTime(payment.timestamp.toLocaleString()).split(',')[0] as unknown as Date,
		time: formatDateTime(payment.timestamp.toLocaleString()).split(',')[1] as unknown as Date,
		timestamp: payment.timestamp,
		userId: payment.userId,
		customerName: payment.user.name,
	}))
}

/**
 * Gets the settlement amount for the unsettled payments
 */
export async function getSettlementAmount() {
	const merchantId = await getMerchantId()

	const unsettledPayments = await prisma.merchantPayment.findMany({
		where: {
			merchantId,
			settlementId: null,
		},
	})

	if (unsettledPayments.length === 0) return 0

	const totalAmountToBeSettled = unsettledPayments.reduce((sum, payment) => sum + payment.amount, 0)

	return totalAmountToBeSettled / 100
}

/**
 * Gets the merchant settlements
 */
export async function getMerchantSettlements() {
	const merchantId = await getMerchantId()

	const merchantSettlements = await prisma.merchantSettlement.findMany({
		where: { merchantId },
	})

	return merchantSettlements
}

/**
 * Gets the unsettled payments for the day
 */
export async function getDailyPayments(merchantId: number) {
	const date = new Date()
	date.setHours(0, 0, 0, 0) // gets the start of the day

	const payments = await prisma.merchantPayment.findMany({
		where: {
			merchantId,
			settlementId: null,
			timestamp: {
				gte: date,
			},
		},
	})

	return payments
}
