'use client'

import z from 'zod'

import { ColumnDef } from '@tanstack/react-table'

export const PaymentSchema = z.object({
	id: z.string(),
	amount: z.number(),
	date: z.date(),
	time: z.date(),
	timestamp: z.date(),
	userId: z.number(),
	customerName: z.string(),
})

export type Payment = z.infer<typeof PaymentSchema>

export const columns: ColumnDef<Payment>[] = [
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
		header: () => <div className="text-center">Payment ID</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue('id')}</div>
		},
	},
	{
		accessorKey: 'customerName',
		header: () => <div className="text-center">Customer Name</div>,
		cell: ({ row }) => {
			return <div className="text-center">{row.getValue('customerName')}</div>
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
			}).format(amount)
			return <div className="text-center">{formatted}</div>
		},
	},
]
