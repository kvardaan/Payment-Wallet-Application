'use client'

import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent } from '@repo/ui/components'
import { columns } from '@/components/dashboard/payments/columns'
import { DataTable } from '@/components/dashboard/payments/data-table'

export const PaymentsCard = () => {
	const userPayments = useAppStore((state) => state.payments)

	return (
		<>
			{' '}
			{userPayments && userPayments.length ? (
				<DataTable columns={columns} data={userPayments} />
			) : (
				<Card className=" border dark:bg-black dark:border-white/25 dark:text-white">
					<CardContent className="p-3 space-y-2 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
						<p className="text-center text-black/50 dark:text-white/50">No recent payments</p>
					</CardContent>
				</Card>
			)}
		</>
	)
}
