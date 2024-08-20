import { Check, Hourglass, RefreshCw, X } from 'lucide-react'

import { cn } from '@repo/ui/cn'
import { poppins } from '@repo/ui/font'
import { formatDateTime } from '@/lib/utils'
import { Card, CardContent, CardTitle } from '@repo/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/table'

interface OnRampTransactionsCardProps {
	transactions: {
		time: Date
		amount: number
		status: string
		provider: string
		token: string
	}[]
}

export const OnRampTransactionsCard = ({ transactions }: OnRampTransactionsCardProps) => {
	return (
		<Card id="transactions" className=" border dark:bg-black dark:border-white/25 dark:text-white">
			<CardTitle className={cn(poppins.className, 'm-4 font-medium text-center md:!text-left')}>
				Recent Transactions
			</CardTitle>
			<CardContent className="p-3 space-y-2 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
				{!transactions.length ? (
					<p className="text-center text-gray-500">No recent transactions</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-1/5">Provider</TableHead>
								<TableHead className="text-center w-[10%]">Amount</TableHead>
								<TableHead className="text-center w-[10%]">Status</TableHead>
								<TableHead className="text-center w-2/5">Date & Time</TableHead>
								<TableHead className="text-center w-1/5">Reference ID</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{transactions.map((t) => (
								<TableRow key={t.token}>
									<TableCell className="w-1/5">{t.provider}</TableCell>
									<TableCell className="text-center w-[10%]">₹{t.amount / 100}</TableCell>
									<TableCell className="text-center w-[10%]">
										{t.status === 'Success' ? (
											<span className="flex flex-row justify-center items-center gap-1 font-medium text-emerald-500 rounded-full p-1 bg-gray-50 border dark:bg-transparent dark:border-white/25">
												<Check className="w-4 h-4" />
											</span>
										) : t.status === 'Failure' ? (
											<span className="flex flex-row justify-center items-center gap-1 font-medium text-red-500 rounded-full p-1 bg-gray-50 border dark:bg-transparent dark:border-white/25">
												<X className="w-4 h-4" />
											</span>
										) : t.status === 'Processing' ? (
											<span className="flex flex-row justify-center items-center gap-1 font-medium text-yellow-500 rounded-full p-1 bg-gray-50 border dark:bg-transparent dark:border-white/25">
												<Hourglass className="w-4 h-4" />
											</span>
										) : (
											<p>{t.status}</p>
										)}
									</TableCell>
									<TableCell className="text-center w-2/5">{t.time.toDateString()}</TableCell>
									<TableCell className="text-center w-1/5">{t.token}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
			<div className="flex flex-row justify-center items-center gap-2 font-medium text-sm py-3 px-2 text-gray-500 dark:text-white/75">
				<RefreshCw className="w-4 h-4" />
				<p>Updated just now</p>
			</div>
		</Card>
	)
}
