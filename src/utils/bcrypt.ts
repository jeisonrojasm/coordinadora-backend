import * as bcrypt from 'bcrypt'
import { ApiException } from './exceptions/ApiException'

export const hashPasswordWithBcrypt = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const comparePasswordsWithBcrypt = (password: string, hash: string) => {
  try {
    return bcrypt.compareSync(password, hash)
  } catch (error) {
    throw new ApiException('WRONG_CREDENTIALS', 401)
  }
}