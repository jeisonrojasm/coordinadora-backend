import { NextFunction, Request, Response } from 'express'
import { ApiException } from '../utils/exceptions/ApiException'

export const errorHandler = (
  err: ApiException | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const isKnownError = err instanceof ApiException

  const statusCode = isKnownError ? err.statusCode : 500
  const message = isKnownError
    ? err.message
    : 'Unexpected Server Error.'

  res.status(statusCode).json({
    success: false,
    body: {
      message,
      statusCode,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    },
  })
}
