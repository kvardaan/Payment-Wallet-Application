import { z } from 'zod'
import axios, { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@repo/db'
import { getUserId } from '@/lib/user'
import { generateToken } from '@/lib/utils'

const TransactionSchema = z.object({
	amount: z.number(),
	provider: z.string(),
})

export async function POST(request: NextRequest) {
	const userId = await getUserId()
	const body = await request.json()

	const transactionData = TransactionSchema.safeParse(body)

	if (!userId)
		return NextResponse.json({ error: 'Unauthorized' }, { status: HttpStatusCode.Unauthorized })

	if (!transactionData.success) {
		console.log(transactionData.error)

		return NextResponse.json(
			{ error: transactionData.error.name },
			{ status: HttpStatusCode.BadRequest }
		)
	}

	const { amount, provider } = transactionData.data

	const token = generateToken()

	try {
		await prisma.onRampTransaction.create({
			data: {
				userId,
				amount: amount * 100,
				provider,
				token,
				startTime: new Date(),
			},
		})

		const bankWebHookResponse = await axios({
			method: 'post',
			url: `${process.env.BANK_WEBHOOK_API}/web-hook`,
			data: {
				userId,
				amount,
				token,
			},
		})

		return NextResponse.json({
			message: 'Transaction started successfully!',
			status: bankWebHookResponse.data.status,
		})
	} catch (error) {
		console.log(`API: "${error}`)

		return NextResponse.json(
			{ error: 'An error occured while starting the transaction.' },
			{ status: HttpStatusCode.InternalServerError }
		)
	}
}
