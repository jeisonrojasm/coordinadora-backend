import { NextFunction, Response } from 'express'
import { AuthRequest } from '../../middlewares/authMiddleware'
import { createShipmentService, getUserShipmentsService, updateShipmentStatusService } from './shipment.service'
import { getShipmentsByUserRepository } from './shipment.repository'

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

export const getUserShipmentsController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId
    const shipments = await getUserShipmentsService(userId)
    res.json({ success: true, body: shipments })
  } catch (error) {
    next(error)
  }
}

export const updateShipmentStatusController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await updateShipmentStatusService(req.body.shipmentId, req.body.statusId)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}
