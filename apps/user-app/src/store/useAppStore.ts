import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import {
	getUserBalance,
	getUserBankAccounts,
	getUserOnRampTransactions,
	getUserTransfers,
} from '@/lib/user'
import { BankAccount } from '@/(dashboard)/overview/page'
import { Transaction } from '@/components/dashboard/add-money/columns'
import { Transfer } from '@/components/dashboard/transactions/columns'

interface AppState {
	balance: { unlocked: number; locked: number } | null
	bankAccounts: BankAccount[] | null
	onRampTransactions: Transaction[] | null
	transfers: Transfer[] | null
	fetchBalance: () => Promise<void>
	fetchBankAccounts: () => Promise<void>
	fetchOnRampTransactions: () => Promise<void>
	fetchTransfers: () => Promise<void>
	fetchAllData: () => Promise<void>
}

export const useAppStore = create<AppState>()(
	devtools(
		(set) => ({
			balance: null,
			bankAccounts: null,
			onRampTransactions: null,
			transfers: null,
			fetchBalance: async () => {
				const balance = await getUserBalance()
				set({ balance })
			},
			fetchBankAccounts: async () => {
				const bankAccounts = await getUserBankAccounts()
				set({ bankAccounts })
			},
			fetchOnRampTransactions: async () => {
				const onRampTransactions = await getUserOnRampTransactions()
				set({ onRampTransactions })
			},
			fetchTransfers: async () => {
				const transfers = await getUserTransfers()
				set({ transfers })
			},

			fetchAllData: async () => {
				const [balance, bankAccounts, onRampTransactions, transfers] = await Promise.all([
					getUserBalance(),
					getUserBankAccounts(),
					getUserOnRampTransactions(),
					getUserTransfers(),
				])
				set({ balance, bankAccounts, onRampTransactions, transfers })
			},
		}),
		{ name: 'app-store' }
	)
)
