import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { BankAccount } from '@/(dashboard)/overview/page'
import { getMerchantBalance, getMerchantBankAccount, getMerchantPayments } from '@/lib/user'
import { Payment } from '@/components/dashboard/payments/columns'

interface AppState {
	balance: { amount: number } | null
	bankAccount: BankAccount | null
	payments: Payment[] | null
	fetchBalance: () => Promise<void>
	fetchBankAccount: () => Promise<void>
	fetchPayments: () => Promise<void>
	fetchAllData: () => Promise<void>
}

export const useAppStore = create<AppState>()(
	devtools(
		(set) => ({
			balance: null,
			bankAccount: null,
			payments: null,
			fetchBalance: async () => {
				const balance = await getMerchantBalance()
				set({ balance })
			},
			fetchBankAccount: async () => {
				const bankAccount = await getMerchantBankAccount()
				set({ bankAccount })
			},
			fetchPayments: async () => {
				const payments = await getMerchantPayments()
				set({ payments })
			},

			fetchAllData: async () => {
				const [balance, bankAccount, payments] = await Promise.all([
					getMerchantBalance(),
					getMerchantBankAccount(),
					getMerchantPayments(),
				])
				set({ balance, bankAccount, payments })
			},
		}),
		{ name: 'app-store' }
	)
)
