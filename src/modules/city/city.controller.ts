import { NextFunction, Request, Response } from 'express'
import { getAllCitiesService } from './city.service'

export const getAllCitiesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllCitiesService()
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}