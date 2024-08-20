import { AddBankAccountCard } from '@/components/dashboard/add-bank-account-card'
import { Heading } from '@repo/ui/heading'

export default function Page() {
	return (
		<div className="rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Overview" />
			<div className="flex flex-col items-center justify-center md:!flex-row w-full gap-2 mt-4">
				<div className="md:w-2/5 flex flex-col space-y-2">
					<AddBankAccountCard />
				</div>
			</div>
		</div>
	)
}
