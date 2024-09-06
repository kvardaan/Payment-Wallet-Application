'use server'

import { auth } from '@clerk/nextjs/server'

import prisma from '@repo/db'
import { date } from 'zod'
import { formatDateTime } from './utils'

export async function getMerchantId() {
	const { userId } = auth()

	if (!userId) return

	const merchant = await prisma.merchant.findUnique({
		where: { externalId: userId },
	})

	return merchant?.id
}

export async function getMerchantBalance() {
	const merchantId = await getMerchantId()

	const merchantBalance = await prisma.merchantBalance.findFirst({
		where: { merchantId },
	})

	return {
		amount: merchantBalance?.amount || 0,
	}
}

export async function getMerchantBankAccount() {
	const merchantId = await getMerchantId()

	const merchantBankAccount = await prisma.merchantBankAccount.findFirst({
		where: { merchantId },
	})

	if (!merchantBankAccount) return

	return {
		bankName: merchantBankAccount.bankName,
		accountNumber: merchantBankAccount.accountNumber,
	}
}

export async function getMerchantPayments() {
	const merchantId = await getMerchantId()

	const merchantPayments = await prisma.merchantPayments.findMany({
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
		amount: payment.amount,
		date: formatDateTime(payment.timestamp.toLocaleString()).split(',')[0] as unknown as Date,
		time: formatDateTime(payment.timestamp.toLocaleString()).split(',')[1] as unknown as Date,
		timestamp: payment.timestamp,
		userId: payment.userId,
		customerName: payment.user.name,
	}))
}
