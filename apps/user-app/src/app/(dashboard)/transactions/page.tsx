'use client'

import { Heading } from '@repo/ui/components'
import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent } from '@repo/ui/components'
import { columns } from '@/components/dashboard/transactions/columns'
import { DataTable } from '@/components/dashboard/transactions/data-table'

export default function Page() {
	const userTransfers = useAppStore((state) => state.transfers)

	return (
		<div className="flex flex-col rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Transactions" />
			{userTransfers && userTransfers.length ? (
				<DataTable columns={columns} data={userTransfers} />
			) : (
				<Card className=" border dark:bg-black dark:border-white/25 dark:text-white">
					<CardContent className="p-3 space-y-2 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
						<p className="text-center text-black/50 dark:text-white/50">No recent transfers</p>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
