// import dotenv from 'dotenv'
// import express, { NextFunction, Request, Response } from 'express'
// import { pool } from './config/database'
// import { errorHandler } from './middlewares/errorHandler'
// import { ApiException } from './utils/exceptions/ApiException'

// dotenv.config()
// const PORT = process.env.PORT || 3000

// const app = express()

// app.get('/', async (_req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await pool.query('SELECT NOW()')
//     res.send(`Conectado a PostgreSQL. Hora actual: ${result.rows[0].now}`)
//   } catch (error) {
//     console.error(error)
//     next(new ApiException('DATABASE_SERVICE_NOT_AVAILABLE', 500))
//   }
// })

// app.use(errorHandler)

// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en: http://localhost:${PORT}`)
// })

import app from './app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})