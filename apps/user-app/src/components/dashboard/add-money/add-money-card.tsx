'use client'

import { z } from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@repo/ui/components'
import { toast } from '@repo/ui/components'
import { Button } from '@repo/ui/components'
import { useAppStore } from '@/store/useAppStore'
import { Card, CardContent } from '@repo/ui/components'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components'

const FormSchema = z.object({
	amount: z.string().min(1, {
		message: 'Amount must be at least ₹ 1.00',
	}),
	bankName: z.string({ required_error: 'Please select a bank to continue!' }),
})

type FormData = z.infer<typeof FormSchema>

export const AddMoneyCard = () => {
	const bankAccounts = useAppStore((state) => state.bankAccounts)
	const fetchBalance = useAppStore((state) => state.fetchBalance)
	const fetchOnRampTransactions = useAppStore((state) => state.fetchOnRampTransactions)

	const form = useForm<FormData>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			amount: '',
			bankName: bankAccounts ? bankAccounts[0]?.bankName : '',
		},
	})

	async function onSubmit(data: FormData) {
		try {
			const response = await axios({
				method: 'post',
				url: '/api/users/transactions',
				data: {
					amount: Number(data.amount),
					provider: data.bankName,
				},
			})

			fetchBalance()
			fetchOnRampTransactions()

			toast.success('Transaction started successfully!', {
				description: `${new Date().toLocaleString()}`,
			})
		} catch (error: any) {
			console.log(error)

			toast.error('An unexpected error occurred. Please try again.')
		}
	}

	return (
		<div>
			<Card className="w-full border dark:border-white/25 dark:bg-black">
				<CardContent className="p-4 py-2 m-2 rounded-md max-w-full shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-3 flex flex-col justify-center w-full"
						>
							{/* Amount */}
							<FormField
								name="amount"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Amount</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Amount (in ₹)" className="dark:bg-white/5" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Bank */}
							<FormField
								name="bankName"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bank</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl className="dark:bg-white/5">
												<SelectTrigger>
													<SelectValue placeholder="Select a bank" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{bankAccounts &&
													bankAccounts.map((bankAccount) => (
														<SelectItem key={bankAccount.id} value={bankAccount.bankName}>
															{bankAccount.bankName}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="lg:w-1/5 mx-auto text-white hover:bg-gray-500 dark:bg-white/10 dark:hover:bg-white/25"
							>
								Submit
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}
