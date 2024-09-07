import { z } from 'zod'
import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
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
		return NextResponse.json({ error: 'Unauthorized' }, { status: StatusCodes.UNAUTHORIZED })

	if (!transactionData.success) {
		console.log(transactionData.error)

		return NextResponse.json(
			{ error: transactionData.error.name },
			{ status: StatusCodes.BAD_REQUEST }
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

		const bankWebHookResponse: any = await axios({
			method: 'post',
			url: `${process.env.BANK_WEBHOOK_API}/web-hook`,
			data: {
				userId,
				amount,
				token,
			},
		})

		console.log(bankWebHookResponse)

		return NextResponse.json({
			message: 'Transaction started successfully!',
			status: bankWebHookResponse.data.status as string,
		})
	} catch (error) {
		console.log(`API: "${error}`)

		return NextResponse.json(
			{ error: 'An error occured while starting the transaction.' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		)
	}
}
