import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

export function Clerk() {
	return (
		<>
			<SignedOut>
				<SignInButton>Sign In</SignInButton>
				<SignUpButton>Sign Up</SignUpButton>
			</SignedOut>
			<SignedIn>
				<UserButton
					showName
					appearance={{
						elements: {
							userButtonAvatarBox: 'md:size-9 rounded-lg',
							userButtonOuterIdentifier: 'md:text-base dark:text-white/75',
						},
					}}
				/>
			</SignedIn>
		</>
	)
}

export default Clerk
