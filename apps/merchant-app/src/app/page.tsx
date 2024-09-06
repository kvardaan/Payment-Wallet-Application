import { redirect } from 'next/navigation'

import { getMerchantId } from '@/lib/user'
import { Footer } from '@/components/footer'
import { AppBar } from '@/components/app-bar'

export default async function Page() {
	const merchantId = await getMerchantId()

	if (merchantId) return redirect('/overview')

	return (
		<div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
			<AppBar />
			<div className="flex flex-col max-w-full overflow-hidden"></div>
			<Footer />
		</div>
	)
}
