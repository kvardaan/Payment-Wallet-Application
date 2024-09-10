import { Metadata } from 'next'

import { Heading } from '@repo/ui/components'
import { TransactionsCard } from '@/components/dashboard/transactions/transactions-card'

export const metadata: Metadata = {
	title: 'Transactions',
}

export default function Page() {
	return (
		<div className="flex flex-col rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Transactions" />
			<TransactionsCard />
		</div>
	)
}
