import type { Config } from 'tailwindcss'

import sharedConfig from '@repo/tailwind-config'

type TWConfig = Pick<Config, 'content' | 'presets' | 'darkMode' | 'plugins' | 'theme'>

const config: TWConfig = {
	content: ['./src/app/**/*.tsx', './src/components/**/*.tsx'],
	presets: [sharedConfig],
	darkMode: 'class',
	plugins: [],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		extends: {},
	},
}

export default config
