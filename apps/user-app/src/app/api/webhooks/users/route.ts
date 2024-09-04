import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import prisma from '@repo/db'

const webhookSecret = process.env.WEBHOOK_SECRET || ''

async function handler(request: Request) {
	// Get the headers
	const headerPayload = headers()
	const svix_id = headerPayload.get('svix-id')
	const svix_timestamp = headerPayload.get('svix-timestamp')
	const svix_signature = headerPayload.get('svix-signature')

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		})
	}

	// Get the body
	const payload = await request.json()
	const body = JSON.stringify(payload)

	// Create a new Svix instance with your secret.
	const wh = new Webhook(webhookSecret)

	let evt

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as any
	} catch (err) {
		console.error('Error verifying webhook:', err)
		return new Response('Error occured', {
			status: 400,
		})
	}

	const eventType: string = evt.type

	const { id } = evt.data
	const emailAddresses = evt.data.email_addresses
	const email_address: string = emailAddresses.length > 0 ? emailAddresses[0].email_address : ''

	if (eventType === 'user.created') {
		const response = await prisma.user.create({
			data: {
				name: `${evt.data.first_name} ${evt.data.last_name}`,
				email: email_address,
				username: evt.data.username as string,
				imageUrl: evt.data.image_url as string,
				externalId: id as string,
			},
		})
		return NextResponse.json(response)
	}

	if (eventType === 'user.updated') {
		const response = await prisma.user.update({
			where: { externalId: id as string },
			data: {
				name: `${evt.data.first_name} ${evt.data.last_name}`,
				email: email_address,
				username: evt.data.username as string,
				imageUrl: evt.data.image_url as string,
			},
		})
		return NextResponse.json(response)
	}
}

export const GET = handler
export const POST = handler
export const PUT = handler
