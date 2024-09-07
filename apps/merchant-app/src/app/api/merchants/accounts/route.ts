import { z } from 'zod'
import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@repo/db'
import { getMerchantId } from '@/lib/user'

const AccountSchema = z.object({
	accountNumber: z.number(),
	bankName: z.string(),
})

export async function POST(request: NextRequest) {
	const merchantId = await getMerchantId()
	const body = await request.json()
	const accoutData = AccountSchema.safeParse(body)

	if (!merchantId)
		return NextResponse.json({ error: 'Unauthorized' }, { status: StatusCodes.UNAUTHORIZED })

	if (!accoutData.success) {
		console.log(accoutData.error)

		return NextResponse.json({ error: accoutData.error.name }, { status: StatusCodes.BAD_REQUEST })
	}

	// Check: if the merchant already has a bank account
	const existingAccount = await prisma.merchantBankAccount.findFirst({
		where: { merchantId },
	})

	if (existingAccount) {
		return NextResponse.json(
			{ error: 'Multiple Bank Accounts not allowed!' },
			{ status: StatusCodes.CONFLICT }
		)
	}

	const { accountNumber, bankName } = accoutData.data

	try {
		const response = await prisma.merchantBankAccount.create({
			data: { bankName, accountNumber, merchantId },
		})

		return NextResponse.json(response)
	} catch (error) {
		if (error instanceof Error && 'code' in error) {
			// Prisma unique constraint violation
			if (error.code === 'P2002') {
				return NextResponse.json(
					{ error: 'Bank account already exists.' },
					{ status: StatusCodes.CONFLICT }
				)
			}
		}

		console.log(`API: "${error}`)
		return NextResponse.json(
			{ error: 'An error occurred while adding the Bank Account.' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		)
	}
}
