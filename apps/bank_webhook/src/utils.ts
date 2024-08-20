export function onRampRandomStatus(): 'Success' | 'Failure' {
	const randomNumber = Math.random()
	return randomNumber > 0.5 ? 'Success' : 'Failure'
}
