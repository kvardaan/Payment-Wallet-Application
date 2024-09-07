import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@repo/db'
import { getUserId } from '@/lib/user'

const AccountSchema = z.object({
	accountNumber: z.number(),
	bankName: z.string(),
})

export async function POST(request: NextRequest) {
	const userId = await getUserId()
	const body = await request.json()
	const accoutData = AccountSchema.safeParse(body)

	if (!userId)
		return NextResponse.json({ error: 'Unauthorized' }, { status: StatusCodes.UNAUTHORIZED })

	if (!accoutData.success) {
		console.log(accoutData.error)

		return NextResponse.json({ error: accoutData.error.name }, { status: StatusCodes.BAD_REQUEST })
	}

	const { accountNumber, bankName } = accoutData.data

	try {
		const response = await prisma.bankAccount.create({
			data: { bankName, accountNumber, userId },
		})

		return NextResponse.json(response)
	} catch (error) {
		// Check if the error is a Prisma error
		if (error instanceof Error && 'code' in error) {
			// Prisma unique constraint violation
			if (error.code === 'P2002') {
				return NextResponse.json(
					{ error: 'Bank account already exists.' },
					{ status: StatusCodes.CONFLICT } // 409 Conflict
				)
			}
		}

		// Handle other errors
		console.log(`API: "${error}`)
		return NextResponse.json(
			{ error: 'An error occurred while adding the Bank Account.' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		)
	}
}
