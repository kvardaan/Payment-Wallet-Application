import cron from 'node-cron'
import prisma from '@repo/db'
import { getDailyPayments } from './user'

cron.schedule('0 0 * * *', async () => {
	console.log('Running daily settlement task')
	const merchants = await prisma.merchant.findMany()

	for (const merchant of merchants) {
		try {
			const payments = await getDailyPayments(merchant.id)
			if (payments.length > 0) {
				await axios({
					method: 'post',
					url: '/api/merchants/settle-batch',
					data: { merchantId: merchant.id },
				})
				console.log(`Settled payments for merchant: ${merchant.username}`)
			}
		} catch (error) {
			console.log(`Error settling payments for merchant: ${merchant.username}`)
		}
	}
})
