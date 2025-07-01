import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ApiException } from '../utils/exceptions/ApiException'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export interface AuthRequest extends Request {
  user?: { userId: string; email: string }
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiException('AUTH_TOKEN_MISSING', 401))
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
    req.user = decoded
    next()
  } catch (err) {
    return next(new ApiException('INVALID_OR_EXPIRED_TOKEN', 401))
  }
}
