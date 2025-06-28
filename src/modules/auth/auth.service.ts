import { hashPasswordWithBcrypt } from '../../utils/bcrypt'
import { ApiException } from '../../utils/exceptions/ApiException'
import { createUserRepository, findOneByEmailRepository } from './auth.repository'
import { RegisterUserDto } from './auth.validation'

export const registerUserService = async (data: RegisterUserDto) => {
  const email = data.email.toLowerCase()
  const existing = await findOneByEmailRepository(email)
  if (existing) throw new ApiException('USER_ALREADY_EXISTS', 400)

  const hashedPassword = await hashPasswordWithBcrypt(data.password)

  const userCreated = await createUserRepository({ ...data, email, password: hashedPassword })
  return { success: true, body: userCreated }
}
