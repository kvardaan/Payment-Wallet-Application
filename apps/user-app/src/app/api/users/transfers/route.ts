import { z } from 'zod'
import { HttpStatusCode } from 'axios'
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
		return NextResponse.json({ error: 'Unauthorized' }, { status: HttpStatusCode.Unauthorized })

	if (!transferData.success) {
		console.log(transferData.error)

		return NextResponse.json(
			{ error: transferData.error.name },
			{ status: HttpStatusCode.BadRequest }
		)
	}

	const { amount, transferToUsername } = transferData.data

	const transferToUser = await prisma.user.findUnique({
		where: { username: transferToUsername },
	})

	if (!transferToUser)
		return NextResponse.json({ error: 'User not found!' }, { status: HttpStatusCode.BadRequest })

	// check: self-transfer
	if (userId === transferToUser?.id)
		return NextResponse.json(
			{ error: 'Self-transfers not allowed!' },
			{ status: HttpStatusCode.Forbidden }
		)

	const fromUserBalance = await prisma.balance.findUnique({
		where: { userId },
	})

	// check: if the user initiating the transfer has sufficient funds or not
	if (!fromUserBalance || fromUserBalance.amount < amount * 100)
		return NextResponse.json(
			{ error: 'Insufficient Funds!' },
			{ status: HttpStatusCode.BadRequest }
		)

	try {
		await prisma.$transaction(async (transaction) => {
			// update: balance for the user sending the money
			await transaction.balance.update({
				where: { userId },
				data: { amount: { decrement: amount * 100 } },
			})

			// update: balance for the user receiving the money
			await transaction.balance.update({
				where: { userId: transferToUser?.id },
				data: { amount: { increment: amount * 100 } },
			})

			// create: transfer in the DB
			await transaction.transfer.create({
				data: {
					fromUserId: userId,
					toUserId: transferToUser?.id as number,
					amount: amount * 100,
					timestamp: new Date(),
				},
			})
		})

		return NextResponse.json({ message: 'Transfer Success!' }, { status: HttpStatusCode.Created })
	} catch (error) {
		console.log(`API: "${error}`)

		return NextResponse.json(
			{ error: 'An error occured while starting the transfer.' },
			{ status: HttpStatusCode.InternalServerError }
		)
	}
}
