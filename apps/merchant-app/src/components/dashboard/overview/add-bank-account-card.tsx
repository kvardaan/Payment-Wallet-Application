'use client'

import { z } from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	cn,
	poppins,
	Input,
	toast,
	Button,
	Card,
	CardContent,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@repo/ui/components'
import { useAppStore } from '@/store/useAppStore'

const FormSchema = z.object({
	accountNumber: z
		.string({
			required_error: 'Please enter account number!',
		})
		.length(8, 'Account number must be exactly 8 digits long')
		.regex(/^\d+$/, 'Account number must be numeric'),
	bankName: z
		.string({ required_error: 'Please select a bank to continue!' })
		.min(3, 'Bank name cannot be empty'),
})

type FormData = z.infer<typeof FormSchema>

export const AddBankAccountCard = () => {
	const fetchBankAccount = useAppStore((state) => state.fetchBankAccount)
	const merchantBankAccount = useAppStore((state) => state.bankAccount)

	const form = useForm<FormData>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			accountNumber: '',
			bankName: '',
		},
	})

	async function onSubmit(data: FormData) {
		try {
			await axios({
				method: 'post',
				url: '/api/merchants/accounts',
				data: { accountNumber: Number(data.accountNumber), bankName: data.bankName },
			})

			toast.success('Bank account added successfully!', {
				description: `${new Date().toLocaleString()}`,
			})

			fetchBankAccount()
		} catch (error) {
			console.log(error)

			toast.error('An unexpected error occurred. Please try again.')
		}
	}

	if (merchantBankAccount) return null

	return (
		<Card className="w-full md:!w-1/2 border dark:border-white/25 dark:bg-black">
			<CardTitle className={cn(poppins.className, 'm-4 font-medium text-center md:!text-left')}>
				Add Bank Account
			</CardTitle>
			<CardContent className="p-4 py-2 m-2 rounded-md max-w-full shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-3 flex flex-col justify-center w-full"
					>
						{/* Account Number Field */}
						<FormField
							name="accountNumber"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Account Number</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="Enter Account Number"
											className="dark:bg-white/5"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Bank Name Field */}
						<FormField
							name="bankName"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bank Name</FormLabel>
									<FormControl className="dark:bg-white/5">
										<Input {...field} placeholder="Enter Bank Name" className="dark:bg-white/5" />
									</FormControl>
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
	)
}
