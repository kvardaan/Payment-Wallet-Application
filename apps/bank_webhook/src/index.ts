import express from 'express'
import { configDotenv } from 'dotenv'

import { router } from './routes'

const app = express()

app.use(express.json())
configDotenv()

const { PORT } = process.env || 3003

app.use(router)

app.listen(PORT, () => {
	console.log(`Server listening on PORT:${PORT}`)
})
