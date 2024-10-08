import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
	return new PrismaClient()
}

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma: ReturnType<typeof prismaClientSingleton> =
	globalThis.prismaGlobal ?? prismaClientSingleton()

prisma.$use(async (params, next) => {
	if (params.model === 'User' && params.action === 'create') {
		const result = await next(params)
		await prisma.balance.create({
			data: { userId: result.id as number },
		})

		return result
	}

	if (params.model === 'Merchant' && params.action === 'create') {
		const result = await next(params)
		await prisma.merchantBalance.create({
			data: { merchantId: result.id as number },
		})

		return result
	}
	return next(params)
})

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
