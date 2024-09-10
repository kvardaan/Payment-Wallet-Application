import { redirect } from 'next/navigation'

import { getMerchantId } from '@/lib/user'

export default async function Page() {
	const merchantId = await getMerchantId()

	if (!merchantId) return redirect('/sign-in')
}
