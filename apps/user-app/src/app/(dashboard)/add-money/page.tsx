import { Heading } from '@repo/ui/heading'

import { BalanceCard } from '@/components/dashboard/add-money/balance-card'
import { AddMoneyCard } from '@/components/dashboard/add-money/add-money-card'
import { getUserBalance, getUserBankAccounts, getUserOnRampTransactions } from '@/lib/user'
import { OnRampTransactionsCard } from '@/components/dashboard/add-money/on-ramp-transactions-card'

export default async function Page() {
	const balances = await getUserBalance()
	const userBankAccounts = await getUserBankAccounts()
	const transactions = await getUserOnRampTransactions()

	return (
		<div className="rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Add Money" />
			<div className="flex flex-col lg:!flex-row w-full gap-2 mt-4">
				<div className="w-full lg:!w-2/5 flex flex-col gap-2">
					<AddMoneyCard userBankAccounts={userBankAccounts} />
					<BalanceCard balances={balances} />
				</div>
				<div className="w-full lg:w-3/5 flex flex-col gap-2">
					<OnRampTransactionsCard transactions={transactions} />
				</div>
			</div>
		</div>
	)
}
