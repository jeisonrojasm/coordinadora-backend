import { NextFunction, Request, Response } from 'express'
import { registerUserService } from './auth.service'

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await registerUserService(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}