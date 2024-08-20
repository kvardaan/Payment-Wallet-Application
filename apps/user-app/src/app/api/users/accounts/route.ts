import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@repo/db'
import { getUserId } from '@/lib/user'

export async function POST(request: NextRequest) {
	const userId = await getUserId()
	const body = await request.json()

	const { bankName, accountNumber } = body

	if (!userId)
		return NextResponse.json({ error: 'Unauthorized' }, { status: HttpStatusCode.Unauthorized })

	try {
		const response = await prisma.bankAccount.create({
			data: {
				bankName,
				accountNumber: Number(accountNumber),
				userId,
			},
		})

		return NextResponse.json(response)
	} catch (error) {
		// Check if the error is a Prisma error
		if (error instanceof Error && 'code' in error) {
			// Prisma unique constraint violation
			if (error.code === 'P2002') {
				return NextResponse.json(
					{ error: 'Bank account already exists.' },
					{ status: HttpStatusCode.Conflict } // 409 Conflict
				)
			}
		}

		// Handle other errors
		console.log(`API: "${error}`)
		return NextResponse.json(
			{ error: 'An error occurred while adding the Bank Account.' },
			{ status: HttpStatusCode.InternalServerError }
		)
	}
}
