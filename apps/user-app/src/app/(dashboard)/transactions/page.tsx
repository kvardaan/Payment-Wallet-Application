import { Heading } from '@repo/ui/heading'
import { getUserTransfers } from '@/lib/user'
import { TransactionsCard } from '@/components/dashboard/transactions-card'

type Transfer = {
	id: number
	amount: number
	timestamp: Date
	type: 'sent' | 'received'
	otherPartyId: number
	otherPartyName: string
}

export default async function Page() {
	const userTransfers: Transfer[] | null = await getUserTransfers()

	return (
		<div className="flex flex-col rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Transactions" />
			<TransactionsCard transactions={userTransfers} />
		</div>
	)
}
