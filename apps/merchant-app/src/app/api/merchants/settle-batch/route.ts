import { StatusCodes } from 'http-status-codes'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@repo/db'

export async function POST(request: NextRequest) {
	const body = await request.json()
	const { merchantId } = body

	console.log(body, merchantId)

	if (!merchantId)
		return NextResponse.json({ error: 'Unauthorized' }, { status: StatusCodes.UNAUTHORIZED })

	try {
		const result = await prisma.$transaction(async (transaction) => {
			// Get unsettled payments for the merchant
			const unsettledPayments = await transaction.merchantPayment.findMany({
				where: {
					merchantId: merchantId as number,
					settlementId: null,
				},
			})

			if (unsettledPayments.length === 0)
				return { message: 'No unsettled payments found!', status: StatusCodes.NO_CONTENT }

			const totalAmountToBeSettled = unsettledPayments.reduce(
				(sum, payment) => sum + payment.amount,
				0
			)

			// Create: Merchant Settlement Record
			const newSettlement = await transaction.merchantSettlement.create({
				data: {
					merchantId: merchantId as number,
					amount: totalAmountToBeSettled,
					status: 'Processing',
					payments: {
						connect: unsettledPayments.map((payment) => ({ id: payment.id })),
					},
				},
			})

			// Update: Merchant Payments with the Settlement ID
			await transaction.merchantPayment.updateMany({
				where: {
					id: {
						in: unsettledPayments.map((payment) => payment.id),
					},
				},
				data: {
					settlementId: newSettlement.id,
				},
			})

			await transaction.merchantBalance.update({
				where: { merchantId },
				data: {
					amount: { decrement: totalAmountToBeSettled },
				},
			})

			return {
				settlementId: newSettlement.id,
				amount: totalAmountToBeSettled,
				status: StatusCodes.CREATED,
			}
		})

		return NextResponse.json(result)
	} catch (error) {
		console.log(`Batch settlement error: ${error}`)

		return NextResponse.json(
			{ error: 'Failed to process the batch settlement' },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		)
	}
}
