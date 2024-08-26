import { redirect } from 'next/navigation'

import { getUserId } from '@/lib/user'
import { Footer } from '@/components/footer'
import { AppBar } from '@/components/app-bar'
import { Hero } from '@/components/landing/hero'
import { Testimonials } from '@/components/landing/testimonials'

export default async function Page() {
	const userId = await getUserId()

	if (userId) return redirect('/overview')

	return (
		<div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
			<AppBar />
			<div className="flex flex-col max-w-full overflow-hidden">
				<Hero />
				<Testimonials />
			</div>
			<Footer />
		</div>
	)
}
