'use client'

import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent } from '@repo/ui/components'
import { columns } from '@/components/dashboard/transactions/columns'
import { DataTable } from '@/components/dashboard/transactions/data-table'

export const TransactionsCard = () => {
	const userTransfers = useAppStore((state) => state.transfers)

	return (
		<>
			{' '}
			{userTransfers && userTransfers.length ? (
				<DataTable columns={columns} data={userTransfers} />
			) : (
				<Card className=" border dark:bg-black dark:border-white/25 dark:text-white">
					<CardContent className="p-3 space-y-2 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
						<p className="text-center text-black/50 dark:text-white/50">No recent transfers</p>
					</CardContent>
				</Card>
			)}
		</>
	)
}
