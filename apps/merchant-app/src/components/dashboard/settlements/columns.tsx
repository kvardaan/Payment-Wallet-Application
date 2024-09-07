'use client'

import z from 'zod'

import { ColumnDef } from '@tanstack/react-table'
import { Check, Hourglass, RefreshCcwDot, X } from 'lucide-react'

export const SettlementSchema = z.object({
	id: z.string(),
	amount: z.number(),
	merchantId: z.number(),
	status: z.enum(['Pending', 'Processing', 'Completed', 'Failed']),
})

export type Settlement = z.infer<typeof SettlementSchema>

export const columns: ColumnDef<Settlement>[] = [
	{
		accessorKey: 'id',
		header: () => <div className="text-center">ID</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue('id')}</div>
		},
	},
	{
		accessorKey: 'status',
		header: () => <div className="text-center">Status</div>,
		cell: ({ row }) => {
			const settlementStatus = row.getValue('status')

			return (
				<div className="flex items-center justify-center text-center">
					{settlementStatus === 'Completed' ? (
						<span className="flex flex-row justify-center items-center gap-2 font-medium text-emerald-500 rounded-full px-3 py-1 min-w-20 bg-gray-50 border dark:bg-transparent dark:border-white/25">
							<Check className="w-4 h-4" />
							{settlementStatus}
						</span>
					) : settlementStatus === 'Failed' ? (
						<span className="flex flex-row justify-center items-center gap-2 font-medium text-red-500 rounded-full px-3 py-1 min-w-20 bg-gray-50 border dark:bg-transparent dark:border-white/25">
							<X className="w-4 h-4" />
							{settlementStatus}
						</span>
					) : settlementStatus === 'Pending' ? (
						<span className="flex flex-row justify-center items-center gap-2 font-medium text-gray-500 rounded-full px-3 py-1 min-w-20 bg-gray-50 border dark:bg-transparent dark:border-white/25">
							<Hourglass className="w-4 h-4" />
							{settlementStatus}
						</span>
					) : settlementStatus === 'Processing' ? (
						<span className="flex flex-row justify-center items-center gap-2 font-medium text-yellow-500 rounded-full px-3 py-1 min-w-20 bg-gray-50 border dark:bg-transparent dark:border-white/25">
							<RefreshCcwDot className="w-4 h-4" />
							{settlementStatus}
						</span>
					) : (
						<p>Hello!</p>
					)}
				</div>
			)
		},
	},

	{
		accessorKey: 'amount',
		header: () => <div className="text-center">Amount</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'INR',
			}).format(amount / 100)
			return <div className="text-center">{formatted}</div>
		},
	},
]
