import { loginUserService, registerUserService } from './auth.service'
import * as authRepository from './auth.repository'
import * as bcryptUtils from '../../utils/bcrypt'
import * as jwtUtils from '../../utils/jwt'
import { ApiException } from '../../utils/exceptions/ApiException'

jest.mock('./auth.repository')
jest.mock('../../utils/bcrypt')
jest.mock('../../utils/jwt')

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

describe('loginUserService', () => {
  const loginData = {
    email: 'jeison@example.com',
    password: 'Pass123*'
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('debe lanzar ApiException con mensaje "WRONG_CREDENTIALS" y código 401 si el usuario no existe', async () => {
    jest.spyOn(authRepository, 'findOneByEmailRepository').mockResolvedValueOnce(null)

    try {
      await loginUserService(loginData)
    } catch (error: any) {
      expect(error).toBeInstanceOf(ApiException)
      expect(error.message).toBe('WRONG_CREDENTIALS')
      expect(error.statusCode).toBe(401)
    }
  })

  it('debe lanzar ApiException con mensaje "WRONG_CREDENTIALS" y código 401 si la contraseña es incorrecta', async () => {
    jest.spyOn(authRepository, 'findOneByEmailRepository').mockResolvedValueOnce({
      user_id: 1,
      email: loginData.email,
      password_hash: '$2b$10$wrongHash',
      name: 'Jeison',
      lastname: 'Rojas'
    })

    jest.spyOn(bcryptUtils, 'comparePasswordsWithBcrypt').mockReturnValue(false)

    try {
      await loginUserService(loginData)
    } catch (error: any) {
      expect(error).toBeInstanceOf(ApiException)
      expect(error.message).toBe('WRONG_CREDENTIALS')
      expect(error.statusCode).toBe(401)
    }
  })

  it('debe retornar token y datos del usuario si las credenciales son correctas', async () => {
    jest.spyOn(authRepository, 'findOneByEmailRepository').mockResolvedValueOnce({
      user_id: 1,
      email: loginData.email,
      password_hash: '$2b$10$correctHash',
      name: 'Jeison',
      lastname: 'Rojas'
    })

    jest.spyOn(bcryptUtils, 'comparePasswordsWithBcrypt').mockReturnValue(true)

    jest.spyOn(jwtUtils, 'generateToken').mockReturnValue('fake-jwt-token')

    const result = await loginUserService(loginData)

    expect(result.success).toBe(true)
    expect(result.body.token).toBe('fake-jwt-token')
    expect(result.body.user).toEqual({
      userId: 1,
      name: 'Jeison',
      lastname: 'Rojas',
      email: loginData.email
    })
  })
})
