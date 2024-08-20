'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from '@repo/ui/dropdown-menu'
import { Button } from '@repo/ui/button'

export const ThemeToggle = () => {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="dark:bg-black">
				<Button
					variant="outline"
					size="icon"
					className="border dark:bg-transparent dark:border-white/25 hover:bg-none dark:hover:bg-black"
				>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="dark:bg-black dark:border-white/50">
				<DropdownMenuItem
					onClick={() => setTheme('light')}
					className="flex items-center justify-start gap-x-3 dark:hover:bg-white/15"
				>
					<Sun className="h-4 w-4" />
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme('dark')}
					className="flex items-center justify-start gap-x-3 dark:hover:bg-white/15"
				>
					<Moon className="h-4 w-4" />
					Dark
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => setTheme('system')}
					className="flex items-center justify-start gap-x-3 dark:hover:bg-white/15"
				>
					<Monitor className="h-4 w-4" />
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
