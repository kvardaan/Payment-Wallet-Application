import { Heading } from '@repo/ui/heading'
import { BalanceCard } from '@/components/dashboard/balance-card'
import { AddMoneyCard } from '@/components/dashboard/add-money-card'
import { getUserBalance, getUserBankAccounts, getUserOnRampTransactions } from '@/lib/user'
import { OnRampTransactionsCard } from '@/components/dashboard/on-ramp-transactions-card'

export default async function Page() {
	const balances = await getUserBalance()
	const userBankAccounts = await getUserBankAccounts()
	const transactions = await getUserOnRampTransactions()

	return (
		<div className="rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Add Money" />
			<div className="flex flex-col md:!flex-row w-full gap-2 mt-4">
				<div className="md:w-2/5 flex flex-col space-y-2">
					<AddMoneyCard userBankAccounts={userBankAccounts} />
					<BalanceCard balances={balances} />
				</div>
				<div className="md:w-3/5 flex flex-col gap-y-2">
					<OnRampTransactionsCard transactions={transactions} />
				</div>
			</div>
		</div>
	)
}
