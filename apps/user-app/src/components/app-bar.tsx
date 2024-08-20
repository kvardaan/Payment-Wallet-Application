import Link from 'next/link'

import Clerk from '@/components/clerk'
import LogoIcon from '@/assets/logo.svg'
import SideModal from '@/components/side-modal'
import { ThemeToggle } from '@repo/ui/theme-toggle'

export function AppBar() {
	return (
		<header className="w-full top-0 p-3 md:p-4 border-b dark:border-white/25 dark:text-white/75">
			<div className="flex items-center justify-between w-full h-full">
				<div className="flex flex-row justify-center items-center gap-x-3 text-xl">
					<Link href="/" className="border p-2 rounded-lg dark:border-white/25">
						<LogoIcon className="h-6 w-6" />
					</Link>
				</div>
				<div className="flex justify-between items-center gap-x-1">
					<div className="flex gap-x-3 items-center">
						<ThemeToggle />
						<SideModal />
						<div className="hidden lg:!flex items-center gap-x-3">
							<Clerk />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
