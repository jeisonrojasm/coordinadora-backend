import { registerUserService } from './auth.service'
import * as authRepository from './auth.repository'
import * as bcryptUtils from '../../utils/bcrypt'
import { ApiException } from '../../utils/exceptions/ApiException'

jest.mock('./auth.repository')
jest.mock('../../utils/bcrypt')

describe('registerUserService', () => {
  const testUser = {
    name: 'Jeison',
    lastname: 'Rojas',
    email: 'jeison@example.com',
    password: 'Pass123*'
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('debe lanzar un ApiException si el usuario ya existe', async () => {
    jest.spyOn(authRepository, 'findOneByEmailRepository').mockResolvedValueOnce({ email: testUser.email })

    await expect(registerUserService(testUser)).rejects.toThrow(ApiException)
    expect(authRepository.findOneByEmailRepository).toHaveBeenCalledWith(testUser.email)
    expect(authRepository.createUserRepository).not.toHaveBeenCalled()
  })

  it('debe lanzar ApiException con mensaje "USER_ALREADY_EXISTS" y código 400', async () => {
    jest.spyOn(authRepository, 'findOneByEmailRepository').mockResolvedValueOnce({ email: testUser.email })

    try {
      await registerUserService(testUser)
    } catch (error: any) {
      expect(error).toBeInstanceOf(ApiException)
      expect(error.message).toBe('USER_ALREADY_EXISTS')
      expect(error.statusCode).toBe(400)
    }
  })

  it('debe registrar un nuevo usuario cuando el email no existe', async () => {
    jest.spyOn(authRepository, 'findOneByEmailRepository').mockResolvedValueOnce(null)
    jest.spyOn(bcryptUtils, 'hashPasswordWithBcrypt').mockResolvedValueOnce('$2b$10$aQY3Xfjoo8RBdhQ16rih.OjPFMKxpafCuIQIwwjfXegR2JlcfIu4S')
    jest.spyOn(authRepository, 'createUserRepository').mockResolvedValueOnce({
      userId: 1,
      name: 'Jeison',
      lastname: 'Rojas',
      email: 'jeison@example.com'
    })

    const result = await registerUserService(testUser)

    expect(authRepository.findOneByEmailRepository).toHaveBeenCalledWith(testUser.email)
    expect(bcryptUtils.hashPasswordWithBcrypt).toHaveBeenCalledWith(testUser.password)
    expect(authRepository.createUserRepository).toHaveBeenCalledWith({
      ...testUser,
      password: '$2b$10$aQY3Xfjoo8RBdhQ16rih.OjPFMKxpafCuIQIwwjfXegR2JlcfIu4S'
    })
    expect(result.success).toBe(true)
    expect(result.body.email).toBe(testUser.email)
  })
})
