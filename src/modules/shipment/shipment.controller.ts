import { NextFunction, Response } from 'express'
import { AuthRequest } from '../../middlewares/authMiddleware'
import { createShipmentService } from './shipment.service'

export const createShipmentController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId
    const result = await createShipmentService(userId!, req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}
