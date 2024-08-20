'use client'

import { Menu } from 'lucide-react'
import { SignedIn, useClerk } from '@clerk/nextjs'
import { ArrowLeftRight, Handshake, Home, LogOut, PlusCircle } from 'lucide-react'

import Clerk from '@/components/clerk'
import { Button } from '@repo/ui/button'
import { SideBarItem } from '@repo/ui/side-bar-item'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/sheet'

export default function SideModal() {
	const { signOut } = useClerk()

	return (
		<div className="lg:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<Menu />
				</SheetTrigger>
				<SheetContent className="w-2/3 sm:!w-1/3 dark:bg-black dark:border-white/25 flex flex-col items-center justify-between dark:text-white/50">
					<section className="w-full flex flex-col items-center gap-4">
						<SheetHeader className="flex flex-col items-center gap-2 pt-4">
							<SheetTitle className="dark:text-white/75">Payment Application</SheetTitle>
							<Clerk />
						</SheetHeader>
						<SignedIn>
							<div className="w-full sm:w-2/3 flex flex-col justify-center items-center gap-x-2 gap-y-3">
								<SideBarItem
									href="/overview"
									title="Overview"
									icon={<Home className="w-4 h-4" />}
								/>
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
								<SideBarItem
									href="/transfer"
									title="Transfer"
									icon={<Handshake className="w-4 h-4" />}
								/>
							</div>
						</SignedIn>
					</section>
					<SignedIn>
						<Button
							variant="ghost"
							onClick={() => signOut({ redirectUrl: '/' })}
							className="w-full sm:w-2/3 flex flex-row items-center justify-start gap-x-2 bg-gray-50 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/25"
						>
							<LogOut className="w-4 h-4" />
							<span>Sign out</span>
						</Button>
					</SignedIn>
				</SheetContent>
			</Sheet>
		</div>
	)
}
