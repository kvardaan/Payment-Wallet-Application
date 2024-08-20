import Link from 'next/link'

import { CustomLink } from '@/components/custom-link'

export function Footer() {
	return (
		<footer className="w-full bottom-0 p-3 md:p-4 border-t dark:border-white/25 dark:text-white/75">
			<div className="flex flex-col md:!flex-row md:justify-between gap-3 py-2">
				<div>
					<Link
						href=""
						target="_blank"
						className="flex gap-2 font-medium text-sm md:text-lg items-center"
					>
						Wallet Application
						<span className="text-white/50">{new Date().getFullYear()}</span>
					</Link>
				</div>
				<div className="flex flex-col md:!flex-row justify-between gap-2 md:gap-4">
					<CustomLink href="https://www.vardaankhattar.com" title="Portfolio" />
					<CustomLink href="https://github.com/kvardaan" title="GitHub" />
					<CustomLink href="https://twitter.com/kvardaan_10" title="X (formally Twitter)" />
				</div>
			</div>
		</footer>
	)
}
