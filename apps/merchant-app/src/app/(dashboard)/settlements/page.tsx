'use client'

import { Heading } from '@repo/ui/components'

export default function Page() {
	const settlementAmount = 10000

	return (
		<div className="flex flex-col rounded-md p-2 text-clip w-full overflow-y-auto bg-gray-50 dark:bg-white/10">
			<Heading title="Settlements" />
			<div className="p-2">
				<p>Amount yet to be settled: {settlementAmount / 100}</p>
			</div>
		</div>
	)
}
