export function onRampRandomStatus(): 'Success' | 'Failure' {
	const randomNumber = Math.random()
	return randomNumber > 0.2 ? 'Success' : 'Failure'
}
