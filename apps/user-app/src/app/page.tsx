import { Footer } from '@/components/footer'
import { AppBar } from '@/components/app-bar'

export default function Page() {
	return (
		<div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
			<AppBar />
			<div className="flex-grow"></div>
			<Footer />
		</div>
	)
}
