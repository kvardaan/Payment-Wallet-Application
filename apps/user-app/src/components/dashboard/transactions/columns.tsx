'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu'
import { Button } from '@repo/ui/button'

export type Transfer = {
	id: number
	amount: number
	date: Date
	time: Date
	timestamp: Date
	type: 'sent' | 'received'
	otherPartyId: number
	name: string
}

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
	{
		id: 'actions',
		cell: ({ row }) => {
			const transaction = row.original

			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						asChild
						className="flex lg:!justify-end items-center dark:hover:bg-white/25 dark:focus:bg-white/25"
					>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(transaction.id))}>
							Copy transaction ID
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
