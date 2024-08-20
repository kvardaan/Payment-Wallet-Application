import { Router, Response, Request } from 'express'

import prisma from '@repo/db'
import { onRampRandomStatus } from './utils'

const router = Router()

type PaymentInformation = {
	userId: number
	amount: number
	token: string
}

router.post('/web-hook', async (request: Request, response: Response) => {
	const { userId, amount, token }: PaymentInformation = request.body

	try {
		const status = onRampRandomStatus()

		if (status === 'Success') {
			await prisma.$transaction([
				prisma.balance.updateMany({
					where: { userId },
					data: { amount: { increment: amount * 100 } },
				}),

				prisma.onRampTransaction.updateMany({
					where: { token },
					data: { status },
				}),
			])
		} else {
			await prisma.onRampTransaction.updateMany({
				where: { token },
				data: { status },
			})
		}

		response.json({
			message: 'Captured',
			status,
		})
	} catch (error) {
		console.error(error)

		response.status(411).json({ message: 'Error while processing webhook' })
	}
})

export { router }
