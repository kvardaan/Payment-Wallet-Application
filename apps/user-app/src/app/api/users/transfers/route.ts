import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@repo/db'
import { getUserId } from '@/lib/user'

const TransferSchema = z.object({
	amount: z.number(),
	transferToUsername: z.string(),
})

export async function POST(request: NextRequest) {
	const userId = await getUserId()
	const body = await request.json()
	const transferData = TransferSchema.safeParse(body)

	if (!userId)
		return NextResponse.json({ error: 'Unauthorized' }, { status: StatusCodes.UNAUTHORIZED })

	if (!transferData.success) {
		console.log(transferData.error)

		return NextResponse.json(
			{ error: transferData.error.name },
			{ status: StatusCodes.BAD_REQUEST }
		)
	}

	const { amount, transferToUsername } = transferData.data

	const transferTo =
		(await prisma.user.findUnique({
			where: { username: transferToUsername },
		})) ||
		(await prisma.merchant.findUnique({
			where: { username: transferToUsername },
		}))

	if (!transferTo)
		return NextResponse.json({ error: 'User not found!' }, { status: StatusCodes.BAD_REQUEST })

	// check: self-transfer
	if (userId === transferTo?.id)
		return NextResponse.json(
			{ error: 'Self-transfers not allowed!' },
			{ status: StatusCodes.FORBIDDEN }
		)

	// check: if the user initiating the transfer has sufficient funds or not
	const fromUserBalance = await prisma.balance.findUnique({
		where: { userId },
	})

	if (!fromUserBalance || fromUserBalance.amount < amount * 100)
		return NextResponse.json({ error: 'Insufficient Funds!' }, { status: StatusCodes.BAD_REQUEST })

	try {
		// check: if the payment made is to a merchant or a user
		const transferToMerchant = await prisma.merchant.findUnique({
			where: { username: transferToUsername },
		})

		// payment made is to another user
		if (!transferToMerchant) {
			await prisma.$transaction(async (transaction) => {
				// update: decrement the balance for the user sending the money
				await transaction.balance.update({
					where: { userId },
					data: { amount: { decrement: amount * 100 } },
				})

				// update: increase the balance for the user receiving the money
				await transaction.balance.update({
					where: { userId: transferTo?.id },
					data: { amount: { increment: amount * 100 } },
				})

				// create: user transfer in the DB
				await transaction.transfer.create({
					data: {
						fromUserId: userId,
						toUserId: transferTo?.id as number,
						amount: amount * 100,
						timestamp: new Date(),
					},
				})
			})
		} else {
			// payment is made to a merchant
			await prisma.$transaction(async (transaction) => {
				// update: decrement the balance for the user sending the money
				await transaction.balance.update({
					where: { userId },
					data: { amount: { decrement: amount * 100 } },
				})

				// create: merchant payment for the merchant receiving the money
				await transaction.merchantPayment.create({
					data: {
						merchantId: transferToMerchant?.id,
						amount: amount * 100,
						userId,
						timestamp: new Date(),
					},
				})

				// create: user transfer in the DB
				await transaction.transfer.create({
					data: {
						fromUserId: userId,
						toMerchantId: transferTo?.id as number,
						amount: amount * 100,
						timestamp: new Date(),
					},
				})
			})
		}

		return NextResponse.json({ message: 'Transfer Success!' }, { status: StatusCodes.CREATED })
	} catch (error) {
		console.log(`API: "${error}`)

		return NextResponse.json(
			{ error: 'An error occured while starting the transfer.' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		)
	}
}
