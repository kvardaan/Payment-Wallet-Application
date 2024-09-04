import { Footer } from '@/components/footer'
import { AppBar } from '@/components/app-bar'
import { SideBar } from '@/components/side-bar'

interface DashboardLayoutProps {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<AppBar />
			<main className="flex-grow flex flex-row md:justify-between gap-2 w-full p-3 dark:text-white">
				<SideBar />
				{children}
			</main>
			<Footer />
		</div>
	)
}
