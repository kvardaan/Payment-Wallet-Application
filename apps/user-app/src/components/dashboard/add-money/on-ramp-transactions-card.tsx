'use client'

import { cn } from '@repo/ui/cn'
import { poppins } from '@repo/ui/font'
import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent, CardTitle } from '@repo/ui/card'
import { DataTable } from '@/components/dashboard/add-money/data-table'
import { columns } from '@/components/dashboard/add-money/columns'

export const OnRampTransactionsCard = () => {
	const transactions = useAppStore((state) => state.onRampTransactions)

	return (
		<Card className=" border dark:bg-black dark:border-white/25 dark:text-white">
			<CardTitle className={cn(poppins.className, 'm-4 font-medium text-center md:!text-left')}>
				Recent Transactions
			</CardTitle>
			<CardContent className="p-3 space-y-2 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
				{transactions && transactions.length ? (
					<DataTable columns={columns} data={transactions} />
				) : (
					<p className="text-center text-black/50 dark:text-white/50">No recent transactions</p>
				)}
			</CardContent>
		</Card>
	)
}
