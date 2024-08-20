'use client'

import { useClerk } from '@clerk/nextjs'

import { Button } from '@repo/ui/button'
import { SideBarItem } from '@repo/ui/side-bar-item'
import { ArrowLeftRight, Handshake, Home, LogOut, PlusCircle } from 'lucide-react'

export function SideBar() {
	const { signOut } = useClerk()

	return (
		<div id="sidebar" className="hidden lg:!flex flex-col justify-between w-40 gap-x-2">
			<div className="w-full flex flex-col justify-center items-center gap-x-2 gap-y-3">
				<SideBarItem href="/overview" title="Overview" icon={<Home className="w-4 h-4" />} />
				<SideBarItem
					href="/add-money"
					title="Add Money"
					icon={<PlusCircle className="w-4 h-4" />}
				/>
				<SideBarItem
					href="/transactions"
					title="Transactions"
					icon={<ArrowLeftRight className="w-4 h-4" />}
				/>
				<SideBarItem href="/transfer" title="Transfer" icon={<Handshake className="w-4 h-4" />} />
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