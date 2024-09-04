export function formatDateTime(inputStr: string): string {
	const date = new Date(inputStr)

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		// fractionalSecondDigits: 3, // Display milliseconds
		// timeZoneName: "short", // Show time zone
	}

	const formatter = new Intl.DateTimeFormat('en-US', options)
	return formatter.format(date)
}

export function generateToken(): string {
	function randomString(): string {
		return Math.random().toString(36).substring(2)
	}
	function token(length: number): string {
		return (randomString() + randomString() + randomString() + randomString()).substring(0, length)
	}

	return token(20)
}
