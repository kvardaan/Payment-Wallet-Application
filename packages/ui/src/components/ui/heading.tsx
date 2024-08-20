import { cn } from '@repo/ui/cn'
import { lusitana } from '@repo/ui/font'

interface HeadingProps {
	title: string
	className?: string
	children?: React.ReactNode
}

export function Heading({ title, className, children }: HeadingProps) {
	return (
		<h1
			className={cn(
				lusitana.className,
				'font-medium text-4xl m-2 text-center md:!text-left',
				className
			)}
		>
			{title}
			{children}
		</h1>
	)
}
