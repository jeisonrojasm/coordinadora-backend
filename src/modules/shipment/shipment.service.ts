import { addShipmentStatusHistory, createShipmentRepository } from './shipment.repository'
import { CreateShipmentDto } from './shipment.validation'

const STATUS_EN_ESPERA_ID = 1 // "En espera"

export const createShipmentService = async (userId: string, data: CreateShipmentDto) => {
  const shipment = await createShipmentRepository(userId, data)
  await addShipmentStatusHistory(shipment.shipment_id, STATUS_EN_ESPERA_ID)

  return {
    success: true,
    body: shipment
  }
}