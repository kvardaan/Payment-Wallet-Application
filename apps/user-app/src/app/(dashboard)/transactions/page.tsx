import { Heading } from '@repo/ui/heading'
import { getUserTransfers } from '@/lib/user'
import { DataTable } from '@/components/dashboard/transactions/data-table'
import { columns, Transfer } from '@/components/dashboard/transactions/columns'

export default async function Page() {
	const userTransfers: Transfer[] | any = await getUserTransfers()

	return (
		<div className="flex flex-col rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Transactions" />
			<DataTable columns={columns} data={userTransfers} />
		</div>
	)
}
