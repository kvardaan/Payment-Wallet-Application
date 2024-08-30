import { Heading } from '@repo/ui/components'
import { TransferCard } from '@/components/dashboard/transfer/transfer-card'

export default function Page() {
	return (
		<div className="rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Transfer" />
			<TransferCard />
		</div>
	)
}
