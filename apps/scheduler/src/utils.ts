import prisma from '@repo/db'

/**
 * Gets the unsettled payments for the day
 */
export async function getDailyPayments(merchantId: number) {
	const date = new Date()
	date.setHours(0, 0, 0, 0) // gets the start of the day

	const payments = await prisma.merchantPayment.findMany({
		where: {
			merchantId,
			settlementId: null,
			timestamp: {
				gte: date,
			},
		},
	})

	return payments
}
