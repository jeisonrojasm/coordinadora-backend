import { pool } from '../../config/database'

export const getAllCitiesRepository = async () => {
  const result = await pool.query('SELECT city_id, city_name FROM city ORDER BY city_name ASC')
  return result.rows
}
