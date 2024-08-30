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
import { BankAccount } from '@/(dashboard)/overview/page'

export const UserBankAccountsCard = () => {
	const userBankAccounts = useAppStore((state) => state.bankAccounts)

	return (
		<Card className="w-full md:!w-1/2 border dark:border-white/25 dark:bg-black">
			<CardTitle className={cn(poppins.className, 'm-4 font-medium text-center md:!text-left')}>
				Bank Accounts
			</CardTitle>
			<CardContent className="p-1 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border-white/25">
				{userBankAccounts && !userBankAccounts.length ? (
					<p className="p-2 text-center text-black/50 dark:text-white/50">Add bank accounts</p>
				) : (
					<Table className="w-full">
						<TableHeader>
							<TableRow>
								<TableHead className="text-center">Bank</TableHead>
								<TableHead className="text-center">Account Number</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{userBankAccounts &&
								userBankAccounts.map((account: BankAccount) => (
									<TableRow key={account.id}>
										<TableCell className="w-1/2 text-center">{account.bankName}</TableCell>
										<TableCell className="w-1/2 text-center">{account.accountNumber}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	)
}
