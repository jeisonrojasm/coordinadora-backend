import { pool } from '../../config/database'

export const findOneByRouteAndWeight = async (
  origin: number,
  destination: number,
  weight: number
) => {
  console.log('ENTRÓ A CONSULTAR LA BD')
  const result = await pool.query(
    `
    SELECT price FROM rate
    WHERE origin = $1
      AND destination = $2
      AND $3 BETWEEN min_weight AND max_weight
    LIMIT 1
    `,
    [origin, destination, weight]
  )
  return result.rows[0]
}
