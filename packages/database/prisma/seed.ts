import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const alice = await prisma.user.upsert({
		where: { number: "1111111111" },
		update: {},
		create: {
			number: "1111111111",
			password: await bcrypt.hash("alice", 12),
			email: "alice@test.com",
			name: "alice",
			Balance: {
				create: {
					amount: 20000,
					locked: 0,
				},
			},
			OnRampTransaction: {
				create: {
					startTime: new Date(),
					status: "Success",
					amount: 20000,
					token: "token_for_alice",
					provider: "HDFC Bank",
				},
			},
		},
	});
	const bob = await prisma.user.upsert({
		where: { number: "2222222222" },
		update: {},
		create: {
			number: "2222222222",
			password: await bcrypt.hash("bob", 12),
			email: "bob@test.com",
			name: "bob",
			Balance: {
				create: {
					amount: 2000,
					locked: 0,
				},
			},
			OnRampTransaction: {
				create: {
					startTime: new Date(),
					status: "Failure",
					amount: 2000,
					token: "token_for_bob",
					provider: "HDFC Bank",
				},
			},
		},
	});
	console.log({ alice, bob });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
