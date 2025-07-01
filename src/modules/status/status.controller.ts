import { NextFunction, Request, Response } from 'express'
import { getAllStatusService } from './status.service'

export const getAllStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllStatusService()
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}