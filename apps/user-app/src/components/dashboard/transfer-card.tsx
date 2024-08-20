'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@repo/ui/input'
import { Button } from '@repo/ui/button'
import { toast } from '@repo/ui/sonner'
import { Card, CardContent } from '@repo/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'

const FormSchema = z.object({
	number: z
		.string({ required_error: 'Please enter a phone number to continue!' })
		.refine((value) => /^[1-9][0-9]{9}$/.test(value), {
			message: 'Phone number must be exactly 10 digits long and cannot start with 0',
		}),
	amount: z.string({ required_error: 'Amount is required!' }).refine(
		(value) => {
			const num = parseFloat(value)
			return !isNaN(num) && num > 0
		},
		{
			message: 'Amount must be at least ₹ 1.00',
		}
	),
})

export const TransferCard = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			number: '',
			amount: '',
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast('You submitted the following values:', {
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		})
	}

	return (
		<Card className="md:w-1/2 mx-auto mt-4 border dark:bg-black dark:border-white/25">
			<CardContent className="p-4 py-2 m-2 rounded-md max-w-full shadow-sm border bg-gray-50 dark:bg-black dark:border dark:border-white/25">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-3 flex flex-col justify-center w-full"
					>
						{/* Number */}
						<FormField
							name="number"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Number</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="dark:bg-white/5"
											placeholder="Enter the number of the person"
										/>
									</FormControl>
									<FormMessage className="dark:text-red-500" />
								</FormItem>
							)}
						/>

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
									<FormMessage className="dark:text-red-500" />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="lg:w-1/5 mx-auto text-white hover:bg-gray-500 dark:bg-white/10 dark:hover:bg-white/25"
						>
							Send
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
