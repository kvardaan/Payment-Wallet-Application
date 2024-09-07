'use client'

import axios from 'axios'

import { useAppStore } from '@/store/useAppStore'
import { columns } from '@/components/dashboard/settlements/columns'
import { DataTable } from '@/components/dashboard/settlements/data-table'
import { Button, Card, CardContent, Heading, toast } from '@repo/ui/components'

export default function Page() {
	const merchantId = useAppStore((state) => state.merchantId)
	const settlementAmount = useAppStore((state) => state.settlementAmount)
	const settlements = useAppStore((state) => state.settlements)
	const fetchSettlementAmount = useAppStore((state) => state.fetchSettlementAmount)
	const fetchSettlements = useAppStore((state) => state.fetchSettlements)

	async function settleBatch() {
		try {
			const response: any = await axios({
				method: 'post',
				url: '/api/merchants/settle-batch',
				data: { merchantId },
			})

			console.log(response)

			fetchSettlements()
			fetchSettlementAmount()

			if (response.data?.status === 201)
				toast.success('Batch settled successfully!', {
					description: `${new Date().toLocaleString()}`,
				})
			else toast.warning(response.data.message)
		} catch (error) {
			console.log(error)

			toast.error('An unexpected error occurred. Please try again.')
		}
	}

	return (
		<div className="flex flex-col rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Settlements" />
			<div className="flex flex-col md:!flex-row items-center justify-between gap-2 mb-1 p-2 text-center md:!text-left">
				<p>Amount yet to be settled: {settlementAmount}</p>
				<Button variant="outline" onClick={settleBatch}>
					Settle Batch
				</Button>
			</div>
			{settlements && settlements.length ? (
				<DataTable columns={columns} data={settlements} />
			) : (
				<Card className=" border dark:bg-black dark:border-white/25 dark:text-white">
					<CardContent className="p-3 space-y-2 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
						<p className="text-center text-black/50 dark:text-white/50">No recent settlements</p>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
