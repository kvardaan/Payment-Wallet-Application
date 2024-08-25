import { cn } from '@repo/ui/cn'
import { poppins } from '@repo/ui/font'
import { Card, CardContent, CardTitle } from '@repo/ui/card'
import { BankAccount, UserBankAccounts } from '@/(dashboard)/overview/page'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@repo/ui/table'

export const UserBankAccountsCard = ({ userBankAccounts }: UserBankAccounts) => {
	return (
		<Card className="w-full md:!w-1/2 border dark:border-white/25 dark:bg-black">
			<CardTitle className={cn(poppins.className, 'm-4 font-medium text-center md:!text-left')}>
				Bank Accounts
			</CardTitle>
			<CardContent className="p-1 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border-white/25">
				{!userBankAccounts.length ? (
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
							{userBankAccounts.map((account: BankAccount) => (
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