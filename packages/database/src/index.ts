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

		const balance = await prisma.balance.create({
			data: {
				userId: result.id as number,
				amount: 0,
				locked: 0,
			},
		})

		return result
	}
	return next(params)
})

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
