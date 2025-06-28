import { comparePasswordsWithBcrypt, hashPasswordWithBcrypt } from '../../utils/bcrypt'
import { ApiException } from '../../utils/exceptions/ApiException'
import { generateToken } from '../../utils/jwt'
import { createUserRepository, findOneByEmailRepository } from './auth.repository'
import { LoginUserDto, RegisterUserDto } from './auth.validation'

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
  const user = await findOneByEmailRepository(email)

  if (!user) throw new ApiException('WRONG_CREDENTIALS', 401)

  const isPasswordMatch = comparePasswordsWithBcrypt(data.password, user.password_hash)
  if (!isPasswordMatch) throw new ApiException('WRONG_CREDENTIALS', 401)

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
