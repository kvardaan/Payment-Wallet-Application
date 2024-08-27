'use client'

import { z } from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@repo/ui/input'
import { toast } from '@repo/ui/sonner'
import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import { BankAccount } from '@/(dashboard)/overview/page'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/select'

const FormSchema = z.object({
	amount: z.string().min(1, {
		message: 'Amount must be at least ₹ 1.00',
	}),
	bankName: z.string({ required_error: 'Please select a bank to continue!' }),
})

type FormData = z.infer<typeof FormSchema>
type AddMoneyCardProps = { userBankAccounts: BankAccount[] }

export const AddMoneyCard = ({ userBankAccounts }: AddMoneyCardProps) => {
	const form = useForm<FormData>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			amount: '',
			bankName: userBankAccounts[0]?.bankName,
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
			toast.success('Transaction started successfully!', {
				description: `${new Date().toLocaleString()}`,
			})
		} catch (error) {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data?.error || 'Unknown error')
			} else {
				toast.error('An unexpected error occurred. Please try again.')
			}
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
												{userBankAccounts.map((bankAccount) => (
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
