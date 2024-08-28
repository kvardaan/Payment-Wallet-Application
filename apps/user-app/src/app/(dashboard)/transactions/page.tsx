'use client'

import { Heading } from '@repo/ui/heading'
import { useAppStore } from '@/store/useAppStore'
import { DataTable } from '@/components/dashboard/transactions/data-table'
import { columns } from '@/components/dashboard/transactions/columns'

export default function Page() {
	const userTransfers = useAppStore((state) => state.transfers)

	return (
		<div className="flex flex-col rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Transactions" />
			{userTransfers && userTransfers.length ? (
				<DataTable columns={columns} data={userTransfers} />
			) : (
				<p className="text-center text-black/50 dark:text-white/50">No recent transfers</p>
			)}
		</div>
	)
}
