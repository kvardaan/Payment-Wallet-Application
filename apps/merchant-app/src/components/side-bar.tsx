'use client'

import { useClerk } from '@clerk/nextjs'
import { ArrowLeftRight, FileCheck2, Home, LogOut } from 'lucide-react'

import { Button } from '@repo/ui/components'
import { SideBarItem } from '@repo/ui/components'

export function SideBar() {
	const { signOut } = useClerk()

	return (
		<div id="sidebar" className="hidden lg:!flex flex-col justify-between w-40 gap-x-2">
			<div className="w-full flex flex-col justify-center items-center gap-x-2 gap-y-3">
				<SideBarItem href="/overview" title="Overview" icon={<Home className="w-4 h-4" />} />
				<SideBarItem
					href="/payments"
					title="Payments"
					icon={<ArrowLeftRight className="w-4 h-4" />}
				/>
				<SideBarItem
					href="/settlements"
					title="Settlements"
					icon={<FileCheck2 className="w-4 h-4" />}
				/>
			</div>
			<Button
				variant="ghost"
				onClick={() => signOut({ redirectUrl: '/' })}
				className="w-full flex flex-row items-center justify-start gap-x-2 bg-gray-50 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/25"
			>
				<LogOut className="w-4 h-4" />
				<span>Sign out</span>
			</Button>
		</div>
	)
}
