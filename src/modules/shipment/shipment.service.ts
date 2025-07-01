import { pool } from '../../config/database'
import { getIO } from '../../config/socket'
import { ApiException } from '../../utils/exceptions/ApiException'
import {
  addShipmentStatusHistory,
  createShipmentRepository,
  getLatestStatusByShipmentId,
  getShipmentsByUserRepository,
  getUserIdByShipmentId,
  insertShipmentStatus,
} from './shipment.repository'
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

export const getUserShipmentsService = async (userId: string) => {
  return await getShipmentsByUserRepository(userId)
}

export const updateShipmentStatusService = async (
  shipmentId: string,
  statusId: number
) => {
  // 1. Insertar nuevo estado
  await insertShipmentStatus(shipmentId, statusId)

  // 2. Obtener userId
  const userId = await getUserIdByShipmentId(shipmentId)
  if (!userId) throw new ApiException('SHIPMENT_NOT')

  // 3. Obtener estado actual
  const status = await getLatestStatusByShipmentId(shipmentId)
  if (!status) throw new ApiException('STATUS_NOT_FOUND')

  // 4. Emitir evento en tiempo real
  getIO().to(`user:${userId}`).emit('shipmentStatusUpdated', {
    shipment_id: shipmentId,
    status_name: status.status_name,
    changed_at: status.changed_at
  })

  return { success: true }
}
