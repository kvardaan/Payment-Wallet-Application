'use client'

import { z } from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@repo/ui/input'
import { toast } from '@repo/ui/sonner'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'

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

export const AddBankAccountCard = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			accountNumber: '',
			bankName: '',
		},
	})

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const response = await axios({ method: 'post', url: '/api/users/accounts', data })
			toast.success('Bank account added successfully!', {
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
				<CardHeader className="text-center md:!text-left">
					<CardTitle>Add Bank Account</CardTitle>
				</CardHeader>
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
		</div>
	)
}
