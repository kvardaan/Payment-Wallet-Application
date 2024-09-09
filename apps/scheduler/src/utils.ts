import prisma from '@repo/db'

/**
 * Gets the unsettled payments for the merchant
 */
export async function getPayments(merchantId: number) {
	const payments = await prisma.merchantPayment.findMany({
		where: {
			merchantId,
			settlementId: null,
		},
	})

	return payments
}
