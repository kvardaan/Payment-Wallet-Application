import Link from 'next/link'

import { UpRightIcon } from '@repo/ui/components'

export const Message = () => {
	return (
		<h2 className="tracking-tighter text-3xl md:text-4xl font-medium text-center py-10 md:py-16">
			<Link
				href={`${process.env.MERCHANT_APP_ROUTE}`}
				className="flex h-fit items-center justify-center gap-x-4"
			>
				Are you a merchant? <UpRightIcon className="w-6 h-6" />
			</Link>
		</h2>
	)
}
