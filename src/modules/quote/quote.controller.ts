import { NextFunction, Request, Response } from 'express'
import { calculateQuoteService } from './quote.service'

export const calculateQuoteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await calculateQuoteService(req.body)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
