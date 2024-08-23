import { ArrowDownLeft, ArrowUpRight, RefreshCw } from 'lucide-react'

import { formatDateTime } from '@/lib/utils'
import { Card, CardContent } from '@repo/ui/card'
import { Transfer } from '@/components/dashboard/columns'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/table'

interface TransactionsCardProps {
	transactions: Transfer[] | null
}

export const TransactionsCard = ({ transactions }: TransactionsCardProps) => {
	return (
		<Card
			id="transactions"
			className="flex flex-col shadow-sm mt-4 px-2 items-center justify-center w-full border dark:bg-black dark:border-white/25 dark:text-white"
		>
			<CardContent className="w-full p-2 space-y-2 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
				{!transactions?.length ? (
					<p className="text-gray-500 text-center">No recent transactions</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-1/12"></TableHead>
								<TableHead className="text-center">Date</TableHead>
								<TableHead className="text-center">Time</TableHead>
								<TableHead className="text-center w-1/5">Transaction ID</TableHead>
								<TableHead className="text-center w-1/5">Name</TableHead>
								<TableHead className="text-center w-1/5">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{transactions.map((t: Transfer) => (
								<TableRow key={t.id}>
									<TableCell className="text-center w-1/12 p-2">
										{t.type === 'sent' ? (
											<span className="flex items-center justify-center bg-red-500 text-white font-medium p-1 rounded-md">
												<ArrowUpRight />
											</span>
										) : (
											<span className="flex items-center justify-center bg-emerald-500 text-white font-medium p-1 rounded-md">
												<ArrowDownLeft />
											</span>
										)}
									</TableCell>
									<TableCell className="text-center p-2">
										{formatDateTime(t.timestamp.toLocaleString()).split(',')[0]}
										{/* {t.date} */}
									</TableCell>
									<TableCell className="text-center p-2">
										{formatDateTime(t.timestamp.toLocaleString()).split(',')[1]}
										{/* {t.time} */}
									</TableCell>
									<TableCell className="text-center w-1/5 p-2">{t.id}</TableCell>
									<TableCell className="text-center w-1/5 p-2">{t.name}</TableCell>
									<TableCell className="text-center w-1/5 p-2">₹{t.amount / 100}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
			<div className="flex flex-row justify-center items-center font-medium text-sm gap-2 py-3 px-2 text-gray-500 dark:text-white/75">
				<RefreshCw className="w-4 h-4" />
				<p>Updated just now</p>
			</div>
		</Card>
	)
}
