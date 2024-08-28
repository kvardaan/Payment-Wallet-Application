import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import '@repo/ui/styles.css'
import { cn } from '@repo/ui/cn'
import { inter } from '@repo/ui/font'
import { ThemeProvider } from '@repo/ui/theme-provider'
import { AppProvider } from '@/store/AppProvider'

export const metadata: Metadata = {
	title: 'Payment Wallet Application',
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={cn(inter.className, 'antialiased')}>
					<AppProvider>
						<ThemeProvider>
							{children}
							<Toaster richColors position="top-center" closeButton />
						</ThemeProvider>
					</AppProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
