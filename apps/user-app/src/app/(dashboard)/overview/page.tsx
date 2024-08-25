import { Heading } from '@repo/ui/heading'
import { getUserBankAccounts } from '@/lib/user'
import { AddBankAccountCard } from '@/components/dashboard/overview/add-bank-account-card'
import { UserBankAccountsCard } from '@/components/dashboard/overview/user-bank-accounts-card'

export interface BankAccount {
	id: number
	accountNumber: number
	bankName: string
}

export type UserBankAccounts = { userBankAccounts: BankAccount[] }

export default async function Page() {
	const userBankAccounts = await getUserBankAccounts()

	return (
		<div className="rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Overview" />
			<div className="flex flex-col lg:!flex-row items-center lg:!items-start justify-center w-full gap-2 mt-4">
				<UserBankAccountsCard userBankAccounts={userBankAccounts} />
				<AddBankAccountCard />
			</div>
		</div>
	)
}
