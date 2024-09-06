import { z } from 'zod'
import { HttpStatusCode } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@repo/db'
import { getMerchantId } from '@/lib/user'

const SettleBatchSchema = z.object({
	amount: z.number(),
})

export async function POST(request: NextRequest) {
	const merchantId = await getMerchantId()
	const body = await request.json()
	const batchSettleData = SettleBatchSchema.safeParse(body)

	if (!merchantId)
		return NextResponse.json({ error: 'Unauthorized' }, { status: HttpStatusCode.Unauthorized })

	if (!batchSettleData.success) {
		console.log(batchSettleData.error)

		return NextResponse.json(
			{ error: batchSettleData.error.name },
			{ status: HttpStatusCode.BadRequest }
		)
	}

	const { amount } = batchSettleData.data
}
