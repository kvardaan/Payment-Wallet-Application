'use server'

import { auth } from '@clerk/nextjs/server'

import prisma from '@repo/db'

export async function getUserId() {
	const { userId } = auth()

	if (!userId) return

	const merchant = await prisma.merchant.findUnique({
		where: { externalId: userId },
	})

	return merchant?.id
}
