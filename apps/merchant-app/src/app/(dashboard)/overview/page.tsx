import { Metadata } from 'next'

import { Heading } from '@repo/ui/components'
import { BankAccountCard } from '@/components/dashboard/overview/bank-account-card'
import { AddBankAccountCard } from '@/components/dashboard/overview/add-bank-account-card'

export type BankAccount = {
	accountNumber: number
	bankName: string
	balance: number
}

export const metadata: Metadata = {
	title: 'Overview',
}

export default function Page() {
	return (
		<div className="rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Overview" />
			<div className="flex flex-col lg:!flex-row items-center lg:!items-start justify-center w-full gap-2 mt-4">
				<BankAccountCard />
				<AddBankAccountCard />
			</div>
		</div>
	)
}
