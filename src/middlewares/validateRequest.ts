import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import { ApiException } from '../utils/exceptions/ApiException'

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const message = result.error.errors.map(e => e.message).join(', ')
      return next(new ApiException(message, 400))
    }

    // Sobrescribir req.body con los datos validados
    req.body = result.data
    next()
  }
}
