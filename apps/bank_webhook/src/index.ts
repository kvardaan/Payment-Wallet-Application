import cors from 'cors'
import express from 'express'
import { configDotenv } from 'dotenv'

import { router } from './routes'
import loggerMiddleware from './logging.middleware'

const app = express()

configDotenv()
app.use(express.json())
app.use(cors())

const { PORT } = process.env || 3003

app.use(loggerMiddleware)
app.use(router)

app.listen(PORT, () => {
	console.log(`Server listening on PORT:${PORT}`)
})
