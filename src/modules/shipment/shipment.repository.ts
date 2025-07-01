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

export const getShipmentsByUserRepository = async (userId: string) => {
  const result = await pool.query(
    `
    SELECT 
      s.shipment_id,
      s.user_id,
      s.weight,
      s.height,
      s.width,
      s.length,
      s.price,
      s.created_at,
      s.updated_at,
      origin_city.city_name AS origin_name,
      destination_city.city_name AS destination_name,
      st.status_id,
      st.status_name,
      st.changed_at
    FROM shipment s
    -- Join para obtener nombre de ciudad origen
    JOIN city origin_city ON s.origin = origin_city.city_id
    -- Join para obtener nombre de ciudad destino
    JOIN city destination_city ON s.destination = destination_city.city_id
    -- Join lateral para último estado
    LEFT JOIN LATERAL (
      SELECT ssh.status_id, ssh.changed_at, st.status_name
      FROM shipment_status_history ssh
      JOIN status st ON st.status_id = ssh.status_id
      WHERE ssh.shipment_id = s.shipment_id
      ORDER BY ssh.changed_at DESC
      LIMIT 1
    ) st ON true
    WHERE s.user_id = $1
    ORDER BY s.created_at DESC
    `,
    [userId]
  )
  return result.rows
}

export const insertShipmentStatus = (shipmentId: string, statusId: number) => {
  return pool.query(
    `INSERT INTO shipment_status_history (shipment_id, status_id) VALUES ($1, $2)`,
    [shipmentId, statusId]
  )
}

export const getUserIdByShipmentId = async (shipmentId: string) => {
  const { rows } = await pool.query(
    `SELECT user_id FROM shipment WHERE shipment_id = $1`,
    [shipmentId]
  )
  return rows[0]?.user_id || null
}

export const getLatestStatusByShipmentId = async (shipmentId: string) => {
  const { rows } = await pool.query(
    `SELECT s.status_name, ssh.changed_at
     FROM shipment_status_history ssh
     JOIN status s ON s.status_id = ssh.status_id
     WHERE ssh.shipment_id = $1
     ORDER BY ssh.changed_at DESC LIMIT 1`,
    [shipmentId]
  )
  return rows[0] || null
}
