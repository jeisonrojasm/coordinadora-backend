import { Router } from 'express'
import { registerUserController } from './auth.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { RegisterUserSchema } from './auth.validation'

const authRouter = Router()

authRouter.post(
  '/register',
  validateRequest(RegisterUserSchema),
  registerUserController
)

export default authRouter