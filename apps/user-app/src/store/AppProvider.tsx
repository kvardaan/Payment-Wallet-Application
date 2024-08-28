'use client'

import { useRef, useEffect } from 'react'
import { useAppStore } from './useAppStore'

export function AppProvider({ children }: { children: React.ReactNode }) {
	const initializeStore = useRef(false)

	useEffect(() => {
		if (!initializeStore.current) {
			useAppStore.getState().fetchAllData()
			initializeStore.current = true
		}
	}, [])

	return <>{children}</>
}
