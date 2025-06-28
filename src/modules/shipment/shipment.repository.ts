import { pool } from '../../config/database'

export const createShipmentRepository = async (userId: string, data: {
  origin: number
  destination: number
  weight: number
  height: number
  width: number
  length: number
  price: number
}) => {
  const result = await pool.query(
    `
    INSERT INTO shipment (user_id, origin, destination, weight, height, width, length, price)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `,
    [userId, data.origin, data.destination, data.weight, data.height, data.width, data.length, data.price]
  )
  return result.rows[0]
}

export const addShipmentStatusHistory = async (shipmentId: string, statusId: number) => {
  await pool.query(
    `
    INSERT INTO shipment_status_history (shipment_id, status_id)
    VALUES ($1, $2)
    `,
    [shipmentId, statusId]
  )
}