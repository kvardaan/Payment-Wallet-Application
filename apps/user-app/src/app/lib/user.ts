import { auth } from '@clerk/nextjs/server'

import prisma from '@repo/db'

export async function getUserId() {
	const { userId } = auth()

	if (!userId) return

	try {
		const user = await prisma.user.findUnique({
			where: { externalId: userId },
		})

		return user?.id
	} catch (error) {
		console.log(error)

		return
	}
}

export async function getUserBalance() {
	const userId = await getUserId()

	const userBalance = await prisma.balance.findFirst({
		where: { userId },
	})

	return {
		unlocked: userBalance?.amount || 0,
		locked: userBalance?.locked || 0,
	}
}

export async function getUserBankAccounts() {
	const userId = await getUserId()

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

	const onRampTransactions = await prisma.onRampTransaction.findMany({
		where: { userId },
		orderBy: { startTime: 'desc' },
	})

	return onRampTransactions.map((transaction) => ({
		provider: transaction.provider,
		amount: transaction.amount,
		status: transaction.status,
		time: transaction.startTime,
		token: transaction.token,
	}))
}