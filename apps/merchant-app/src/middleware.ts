import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicApiRoute = createRouteMatcher([
	'/api/webhooks/merchants',
	'/api/merchants/settle-batch',
])
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

export default clerkMiddleware((auth, req) => {
	const { userId } = auth()
	const currentUrl = new URL(req.url)
	const isAccessingDashboard = currentUrl.pathname === '/'
	const isApiRequest = currentUrl.pathname.startsWith('/api')

	// If user is logged in and accessing a public route but not the dashboard
	if (userId && isPublicRoute(req) && !isAccessingDashboard) {
		return NextResponse.redirect(new URL('/', req.url))
	}

	// not logged in
	if (!userId) {
		// If user is not logged in and trying to access a protected route
		if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
			return NextResponse.redirect(new URL('/sign-in', req.url))
		}

		// If the request is for a protected API and the user is not logged in
		if (isApiRequest && !isPublicApiRoute(req)) {
			return NextResponse.redirect(new URL('/sign-in', req.url))
		}
	}
	return NextResponse.next()
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
}
