import { pool } from '../../config/database'

export const getAllStatusRepository = async () => {
  const result = await pool.query('SELECT status_id, status_name FROM status')
  return result.rows
}