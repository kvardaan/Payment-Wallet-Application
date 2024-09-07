'use client'

import {
	ColumnDef,
	flexRender,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
} from '@tanstack/react-table'

import { Button } from '@repo/ui/components'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/components'

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<div>
			<div className="rounded-md border bg-white dark:bg-black dark:border-white/25 dark:text-white p-4">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination Buttons */}
			<div className="flex items-center justify-end space-x-2 py-4 dark:text-white">
				<Button
					size="sm"
					variant="outline"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className="dark:bg-black dark:border-white/25"
				>
					Previous
				</Button>
				<Button
					size="sm"
					variant="outline"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className="dark:bg-black dark:border-white/25"
				>
					Next
				</Button>
			</div>
		</div>
	)
}
