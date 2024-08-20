import { Heading } from '@repo/ui/heading'
import { TransactionsCard } from '@/components/dashboard/transactions-card'

const transactions = [
	{
		id: 1,
		provider: 'HDFC Bank',
		timestamp: '2024-10-10T11:10:42.056Z',
		amount: 100000,
		fromUserName: 'Random Person',
		type: 'received',
	},
	{
		id: 2,
		provider: 'HDFC Bank',
		timestamp: '2024-08-10T11:10:42.056Z',
		amount: 200000,
		toUserName: 'Random Person',
		type: 'send',
	},
	{
		id: 3,
		provider: 'Axis Bank',
		timestamp: '2024-08-10T11:10:42.056Z',
		amount: 300000,
		fromUserName: 'Random Person',
		type: 'received',
	},
	{
		id: 4,
		provider: 'Axis Bank',
		timestamp: '2024-08-10T11:10:42.056Z',
		amount: 500000,
		toUserName: 'Random Person',
		type: 'received',
	},
]

export default function Page() {
	return (
		<div className="flex flex-col rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Transactions" />
			<TransactionsCard transactions={transactions} />
		</div>
	)
}
