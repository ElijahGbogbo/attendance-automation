import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
  })
})

const PORT = Number(process.env.PORT ?? 3000)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
