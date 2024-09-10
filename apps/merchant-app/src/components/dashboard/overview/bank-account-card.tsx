'use client'

import {
	cn,
	poppins,
	Card,
	CardContent,
	CardTitle,
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableHead,
	TableRow,
} from '@repo/ui/components'
import { useAppStore } from '@/store/useAppStore'

export const BankAccountCard = () => {
	const merchantBankAccount = useAppStore((state) => state.bankAccount)

	return (
		<Card className="w-full md:!w-1/2 border dark:border-white/25 dark:bg-black">
			<CardTitle className={cn(poppins.className, 'm-4 font-medium text-center md:!text-left')}>
				Bank Account
			</CardTitle>
			<CardContent className="p-1 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border-white/25">
				{!merchantBankAccount ? (
					<p className="p-2 text-center text-black/50 dark:text-white/50">Add bank account</p>
				) : (
					<Table className="w-full">
						<TableHeader>
							<TableRow>
								<TableHead className="text-center">Bank</TableHead>
								<TableHead className="text-center">Account Number</TableHead>
								<TableHead className="text-center">Account Balance</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow key={merchantBankAccount.accountNumber}>
								<TableCell className="w-1/2 text-center">{merchantBankAccount.bankName}</TableCell>
								<TableCell className="w-1/2 text-center">
									{merchantBankAccount.accountNumber}
								</TableCell>
								<TableCell className="w-1/2 text-center">₹{merchantBankAccount.balance}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	)
}
