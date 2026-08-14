import express from 'express'
import attendanceRoutes from './routes/attendanceRoutes.ts'
import { notFound } from './middleware/notFound.ts'
import { errorHandler } from './middleware/errorHandler.ts'
import cors from 'cors'

const app = express()

// Allow requests from the React frontend
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite frontend
    credentials: true,
  }),
)

// Parse JSON request bodies
app.use(express.json())

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }))

app.use('/api', attendanceRoutes)
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
  })
})
app.use(notFound)
app.use(errorHandler)

export default app
