import axios from 'axios'
import tz from 'tz-offset'
import cron from 'node-cron'
import { configDotenv } from 'dotenv'

import prisma from '@repo/db'
import { getPayments } from './utils'

configDotenv()
const API_HOST = process.env.API_HOST

cron.schedule(
	'0 0 * * *',
	async () => {
		console.log(`Running daily settlement task ${new Date()}`)
		const merchants = await prisma.merchant.findMany()

		for (const merchant of merchants) {
			const payments = await getPayments(merchant.id)

			if (payments.length > 0) {
				try {
					const response = await axios({
						method: 'post',
						url: `${API_HOST}/api/merchants/settle-batch`,
						data: { merchantId: merchant.id },
					})

					console.log(`Settled payments for merchant: ${merchant.username}`)
				} catch (error) {
					console.log(`Error settling payments for merchant: ${merchant.username}`)
					console.log(`API Error: ${error}`)
				}
			}
		}
	},
	{ scheduled: true, timezone: 'Asia/Kolkata' }
)
