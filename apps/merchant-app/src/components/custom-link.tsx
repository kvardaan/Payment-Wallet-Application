import Link from 'next/link'

import { cn, UpRightIcon } from '@repo/ui/components'

interface CustomLinkProps {
	href: string
	title: string
	className?: string
}

export function CustomLink({ href, title, className }: CustomLinkProps) {
	return (
		<Link
			href={href}
			target="_blank"
			className={cn('flex gap-2 font-medium items-center text-xs md:text-sm', className)}
		>
			{title}
			<UpRightIcon />
		</Link>
	)
}
