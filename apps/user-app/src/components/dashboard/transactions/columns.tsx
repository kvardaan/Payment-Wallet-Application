'use client'

import z from 'zod'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

export const TransferSchema = z.object({
	id: z.string(),
	amount: z.number(),
	date: z.date(),
	time: z.date(),
	timestamp: z.date(),
	type: z.enum(['sent', 'received']),
	otherPartyId: z.number(),
	name: z.string(),
})

export type Transfer = z.infer<typeof TransferSchema>

export const columns: ColumnDef<Transfer>[] = [
	{
		accessorKey: 'type',
		header: '',
		cell: ({ row }) => {
			return (
				<div className="text-center w-fit">
					{row.getValue('type') === 'sent' ? (
						<span className="flex items-center justify-center bg-red-500 text-white font-medium p-1 rounded-md">
							<ArrowUpRight />
						</span>
					) : (
						<span className="flex items-center justify-center bg-emerald-500 text-white font-medium p-1 rounded-md">
							<ArrowDownLeft />
						</span>
					)}
				</div>
			)
		},
	},
	{
		accessorKey: 'date',
		header: () => <div className="text-center">Date</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue('date')}</div>
		},
	},
	{
		accessorKey: 'time',
		header: () => <div className="text-center">Time</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue('time')}</div>
		},
	},
	{
		accessorKey: 'id',
		header: () => <div className="text-center">Transaction ID</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue('id')}</div>
		},
	},
	{
		accessorKey: 'name',
		header: () => <div className="text-center">Name</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue('name')}</div>
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
