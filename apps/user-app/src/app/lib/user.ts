'use server'

import { auth } from '@clerk/nextjs/server'

import prisma from '@repo/db'
import { formatDateTime } from '@/lib/utils'

export async function getUserId() {
	const { userId } = auth()

	if (!userId) return

	const user = await prisma.user.findUnique({
		where: { externalId: userId },
	})

	return user?.id
}

export async function getUserBalance() {
	const userId = await getUserId()

	if (!userId) return

	const userBalance = await prisma.balance.findFirst({
		where: { userId },
	})

	return {
		unlocked: (userBalance?.amount || 0) / 100,
		locked: (userBalance?.locked || 0) / 100,
	}
}

export async function getUserBankAccounts() {
	const userId = await getUserId()

	if (!userId) return

	const userBankAccounts = await prisma.bankAccount.findMany({
		where: { userId },
	})

	return userBankAccounts.map((bankAccount) => ({
		id: bankAccount.id,
		accountNumber: bankAccount.accountNumber,
		bankName: bankAccount.bankName,
	}))
}

export async function getUserOnRampTransactions() {
	const userId = await getUserId()

	if (!userId) return

	const onRampTransactions = await prisma.onRampTransaction.findMany({
		where: { userId },
		orderBy: { startTime: 'desc' },
	})

	return onRampTransactions.map((transaction) => ({
		provider: transaction.provider,
		amount: transaction.amount / 100,
		status: transaction.status,
		time: transaction.startTime,
		token: transaction.token,
	}))
}

export async function getUserTransfers() {
	const userId = await getUserId()

	if (!userId) return

	const userTransfers = await prisma.user.findUnique({
		where: { id: userId },
		include: {
			sentTransfers: {
				include: {
					toUser: {
						select: {
							id: true,
							name: true,
						},
					},
					toMerchant: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
			receivedTransfers: {
				include: {
					fromUser: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
	})

	if (!userTransfers) return

	return [
		...userTransfers.sentTransfers.map((transfer) => ({
			id: transfer.id,
			amount: transfer.amount / 100,
			date: formatDateTime(transfer.timestamp.toLocaleString()).split(',')[0] as unknown as Date,
			time: formatDateTime(transfer.timestamp.toLocaleString()).split(',')[1] as unknown as Date,
			timestamp: transfer.timestamp,
			type: 'sent' as const,
			otherPartyId: (transfer.toUserId || transfer.toMerchantId) as number,
			name: (transfer.toUser?.name || transfer.toMerchant?.name) as string,
		})),
		...userTransfers.receivedTransfers.map((transfer) => ({
			id: transfer.id,
			amount: transfer.amount / 100,
			date: formatDateTime(transfer.timestamp.toLocaleString()).split(',')[0] as unknown as Date,
			time: formatDateTime(transfer.timestamp.toLocaleString()).split(',')[1] as unknown as Date,
			timestamp: transfer.timestamp,
			type: 'received' as const,
			otherPartyId: transfer.fromUserId,
			name: transfer.fromUser.name,
		})),
	].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}
