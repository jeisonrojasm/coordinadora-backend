import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import { pool } from './config/database'
import { errorHandler } from './middlewares/errorHandler'
import authRouter from './modules/auth/auth.routes'
import { ApiException } from './utils/exceptions/ApiException'
import { swaggerUiMiddleware, swaggerUiSetup } from './config/swagger'
import quoteRouter from './modules/quote/quote.routes'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Root endpoint')
    const result = await pool.query('SELECT NOW()')
    res.send(`Conectado a PostgreSQL. Hora actual: ${result.rows[0].now}`)
  } catch (error) {
    console.error(error)
    next(new ApiException('DATABASE_SERVICE_NOT_AVAILABLE', 500))
  }
})

// Documentación Swagger
app.use('/api-docs', swaggerUiMiddleware, swaggerUiSetup)

// Rutas por módulo
app.use('/auth', authRouter)
app.use('/quote', quoteRouter)

// Middleware de errores global
app.use(errorHandler)

export default app