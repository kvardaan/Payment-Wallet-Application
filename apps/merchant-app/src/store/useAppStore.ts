import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import {
	getMerchantBalance,
	getMerchantBankAccount,
	getMerchantId,
	getMerchantPayments,
	getMerchantSettlements,
	getSettlementAmount,
} from '@/lib/user'
import { BankAccount } from '@/(dashboard)/overview/page'
import { Payment } from '@/components/dashboard/payments/columns'
import { Settlement } from '@/components/dashboard/settlements/columns'

interface AppState {
	merchantId: number | null
	balance: { amount: number } | null
	bankAccount: BankAccount | null
	payments: Payment[] | null
	settlementAmount: number
	settlements: Settlement[] | null
	fetchMerchantId: () => Promise<void>
	fetchBalance: () => Promise<void>
	fetchBankAccount: () => Promise<void>
	fetchPayments: () => Promise<void>
	fetchSettlementAmount: () => Promise<void>
	fetchSettlements: () => Promise<void>
	fetchAllData: () => Promise<void>
}

export const useAppStore = create<AppState>()(
	devtools(
		(set) => ({
			merchantId: null,
			balance: null,
			bankAccount: null,
			payments: null,
			settlementAmount: 0,
			settlements: null,
			fetchMerchantId: async () => {
				const merchantId = await getMerchantId()
				set({ merchantId })
			},
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
			fetchSettlementAmount: async () => {
				const settlementAmount = await getSettlementAmount()
				set({ settlementAmount })
			},
			fetchSettlements: async () => {
				const settlements = await getMerchantSettlements()
				set({ settlements })
			},
			fetchAllData: async () => {
				const [merchantId, balance, bankAccount, payments, settlementAmount, settlements] =
					await Promise.all([
						getMerchantId(),
						getMerchantBalance(),
						getMerchantBankAccount(),
						getMerchantPayments(),
						getSettlementAmount(),
						getMerchantSettlements(),
					])
				set({ merchantId, balance, bankAccount, payments, settlementAmount, settlements })
			},
		}),
		{ name: 'app-store' }
	)
)
