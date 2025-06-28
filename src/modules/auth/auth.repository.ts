import { pool } from '../../config/database'
import { RegisterUserDto } from './auth.validation'

export const findOneByEmailRepository = async (email: string) => {
  const result = await pool.query(
    'SELECT * FROM "user" WHERE email = $1 LIMIT 1',
    [email]
  )
  return result.rows[0]
}

export const createUserRepository = async (data: RegisterUserDto & { password: string }) => {
  const { name, lastname, email, password } = data
  const result = await pool.query(
    `INSERT INTO "user" (name, lastname, email, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING user_id, name, lastname, email`,
    [name, lastname, email, password]
  )
  return {
    userId: result.rows[0].user_id,
    name: result.rows[0].name,
    lastname: result.rows[0].lastname,
    email: result.rows[0].email,
  }
}