import redis from '../../config/redis'
import { comparePasswordsWithBcrypt, hashPasswordWithBcrypt } from '../../utils/bcrypt'
import { ApiException } from '../../utils/exceptions/ApiException'
import { generateToken } from '../../utils/jwt'
import { createUserRepository, findOneByEmailRepository } from './auth.repository'
import { LoginUserDto, RegisterUserDto } from './auth.validation'

const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || '3')
const BLOCK_TIME_SECONDS = parseInt(process.env.BLOCK_TIME_SECONDS || '60')

export const registerUserService = async (data: RegisterUserDto) => {
  const email = data.email.toLowerCase()
  const existing = await findOneByEmailRepository(email)
  if (existing) throw new ApiException('USER_ALREADY_EXISTS', 400)

  const hashedPassword = await hashPasswordWithBcrypt(data.password)

  const userCreated = await createUserRepository({ ...data, email, password: hashedPassword })
  return { success: true, body: userCreated }
}

export const loginUserService = async (data: LoginUserDto) => {
  const email = data.email.toLowerCase()
  const redisKey = `login:attempts:${email}`

  const user = await findOneByEmailRepository(email)
  if (!user) throw new ApiException('WRONG_CREDENTIALS', 401)

  const attempts = parseInt(await redis.get(redisKey) || '0')
  if (attempts >= MAX_LOGIN_ATTEMPTS) {
    throw new ApiException('TOO_MANY_LOGIN_ATTEMPTS', 429)
  }

  const isPasswordMatch = comparePasswordsWithBcrypt(data.password, user.password_hash)
  if (!isPasswordMatch) {
    await redis.incr(redisKey)
    await redis.expire(redisKey, BLOCK_TIME_SECONDS) // Reiniciar el contador con cada intento fallido
    throw new ApiException('WRONG_CREDENTIALS', 401)
  }

  // Limpiar contador
  await redis.del(redisKey)

  const token = generateToken({ userId: user.user_id, email: user.email })

  return {
    success: true,
    body: {
      token,
      user: {
        userId: user.user_id,
        name: user.name,
        lastname: user.lastname,
        email: user.email
      }
    }
  }
}
