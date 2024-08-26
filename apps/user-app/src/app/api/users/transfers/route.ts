import { HttpStatusCode } from 'axios'

import prisma from '@repo/db'
import { getUserId } from '@/lib/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const userId = await getUserId()
	const body = await request.json()

	const { amount, transferToNumber }: { amount: number; transferToNumber: string } = body

	if (!userId)
		return NextResponse.json({ error: 'Unauthorized' }, { status: HttpStatusCode.Unauthorized })

	const transferToUser = await prisma.user.findUnique({
		where: { number: transferToNumber },
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
				data: { amount: { decrement: Number(amount) * 100 } },
			})

			// update: balance for the user receiving the money
			await transaction.balance.update({
				where: { userId: transferToUser?.id },
				data: { amount: { increment: Number(amount) * 100 } },
			})

			// create: transfer in the DB
			await transaction.transfer.create({
				data: {
					fromUserId: userId,
					toUserId: transferToUser?.id as number,
					amount: Number(amount) * 100,
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
