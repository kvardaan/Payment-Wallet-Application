interface AuthLayout {
	children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayout) {
	return (
		<div className="flex items-center justify-center h-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-200 to-white/25 shadow-md">
			{children}
		</div>
	)
}
