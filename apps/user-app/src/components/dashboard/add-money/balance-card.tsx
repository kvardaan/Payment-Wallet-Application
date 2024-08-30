'use client'

import {
	cn,
	poppins,
	Card,
	CardContent,
	CardTitle,
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@repo/ui/components'
import { useAppStore } from '@/store/useAppStore'

export const BalanceCard = () => {
	const balances = useAppStore((state) => state.balance)
	return (
		<Card className="border dark:border-white/25 dark:bg-black">
			<CardTitle className={cn(poppins.className, 'm-4 font-medium text-center md:!text-left')}>
				Balance
			</CardTitle>
			<CardContent className="p-1 m-2 rounded-md shadow-sm border bg-gray-50 dark:bg-black dark:border-white/25">
				<Table>
					<TableBody>
						<TableRow className="leading-[4px]">
							<TableCell className="flex flex-row justify-between items-center p-2 py-5">
								<span>Unlocked Balance</span>
								<span>₹ {balances && balances?.unlocked / 100}</span>
							</TableCell>
						</TableRow>
						<TableRow className="leading-[4px]">
							<TableCell className="flex flex-row justify-between items-center p-2 py-5">
								<span>Locked Balance</span>
								<span>₹ {balances && balances?.locked / 100}</span>
							</TableCell>
						</TableRow>
						<TableRow className="leading-[4px]">
							<TableCell className="flex flex-row justify-between font-semibold items-center p-2 py-5">
								<span>Total</span>
								<span>₹ {balances && (balances?.unlocked + balances?.locked) / 100}</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
