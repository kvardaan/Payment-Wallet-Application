'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Check, Hourglass, X } from 'lucide-react'

export type Transaction = {
	amount: number
	time: Date
	status: string
	provider: string
	token: string
}

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: 'provider',
		header: () => <div className="text-center">Provider</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue('provider')}</div>
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
	{
		accessorKey: 'status',
		header: () => <div className="text-center">Status</div>,
		cell: ({ row }) => {
			const transactionStatus = row.getValue('status')

			return (
				<div className="text-center">
					{transactionStatus === 'Success' ? (
						<span className="flex flex-row justify-center items-center gap-1 font-medium text-emerald-500 rounded-full p-1 bg-gray-50 border dark:bg-transparent dark:border-white/25">
							<Check className="w-4 h-4" />
						</span>
					) : transactionStatus === 'Failure' ? (
						<span className="flex flex-row justify-center items-center gap-1 font-medium text-red-500 rounded-full p-1 bg-gray-50 border dark:bg-transparent dark:border-white/25">
							<X className="w-4 h-4" />
						</span>
					) : transactionStatus === 'Processing' ? (
						<span className="flex flex-row justify-center items-center gap-1 font-medium text-yellow-500 rounded-full p-1 bg-gray-50 border dark:bg-transparent dark:border-white/25">
							<Hourglass className="w-4 h-4" />
						</span>
					) : (
						<p>Hello!</p>
					)}
				</div>
			)
		},
	},
	{
		accessorKey: 'time',
		header: () => <div className="text-center">Date & Time</div>,
		cell: ({ row }) => {
			const transactionTime: Date = row.getValue('time')

			return <div className="text-center">{transactionTime.toLocaleString()}</div>
		},
	},
	{
		accessorKey: 'token',
		header: () => <div className="text-right">Reference ID</div>,
		cell: ({ row }) => {
			return <div className="text-right truncate text-clip">{row.getValue('token')}</div>
		},
	},
]
