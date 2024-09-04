import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import '@repo/ui/styles.css'
import { cn, inter, ThemeProvider, Toaster } from '@repo/ui/components'

export const metadata: Metadata = {
	title: 'Merchant | Payment Wallet Application',
	description: 'Generated by create turbo',
}

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={cn(inter.className, 'antialiased')}>
					<ThemeProvider>
						{children}
						<Toaster richColors closeButton />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
