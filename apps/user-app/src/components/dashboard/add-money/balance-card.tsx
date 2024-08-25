import { cn } from '@repo/ui/cn'
import { poppins } from '@repo/ui/font'
import { Card, CardContent, CardTitle } from '@repo/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@repo/ui/table'

interface BalanceCardProps {
	balances: {
		unlocked: number
		locked: number
	}
}

export const BalanceCard = ({ balances }: BalanceCardProps) => {
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
								<span>₹ {balances?.unlocked / 100}</span>
							</TableCell>
						</TableRow>
						<TableRow className="leading-[4px]">
							<TableCell className="flex flex-row justify-between items-center p-2 py-5">
								<span>Locked Balance</span>
								<span>₹ {balances?.locked / 100}</span>
							</TableCell>
						</TableRow>
						<TableRow className="leading-[4px]">
							<TableCell className="flex flex-row justify-between font-semibold items-center p-2 py-5">
								<span>Total</span>
								<span>₹ {(balances?.unlocked + balances?.locked) / 100}</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
