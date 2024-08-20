export interface Verification {
	attempts: number
	expire_at: number
	status: string
	strategy: string
}

export interface EmailAddress {
	created_at: number
	email_address: string
	id: string
	linked_to: any[]
	object: string
	reserved: boolean
	updated_at: number
	verification: Verification
}

export interface PhoneNumbers {
	default_second_factor: boolean
	id: string
	linked_to: []
	object: string
	phone_number: string
	reserved_for_second_factor: boolean
	verification: object
}

export interface Data {
	backup_code_enabled: boolean
	banned: boolean
	create_organization_enabled: boolean
	created_at: number
	delete_self_enabled: boolean
	email_addresses: EmailAddress[]
	external_accounts: any[]
	external_id: string | null
	first_name: string
	has_image: boolean
	id: string
	image_url: string
	last_active_at: number
	last_name: string
	last_sign_in_at: string | null
	locked: boolean
	lockout_expires_in_seconds: number | null
	mfa_disabled_at: number | null
	mfa_enabled_at: number | null
	object: string
	passkeys: any[]
	password_enabled: boolean
	phone_numbers: any[] // Adjust type if needed
	primary_email_address_id: string
	primary_phone_number_id: string | null
	primary_web3_wallet_id: string | null
	private_metadata: any // Adjust type if needed
	profile_image_url: string
	public_metadata: any // Adjust type if needed
	saml_accounts: any[] // Adjust type if needed
	totp_enabled: boolean
	two_factor_enabled: boolean
	unsafe_metadata: any // Adjust type if needed
	updated_at: number
	username: string | null
	verification_attempts_remaining: number
	web3_wallets: any[] // Adjust type if needed
}

export interface EventAttributes {
	http_request: {
		client_ip: string
		user_agent: string
	}
}

export interface Event {
	data: Data
	event_attributes: EventAttributes
	object: string
	type: string
}

export type EventType = 'user.created'
