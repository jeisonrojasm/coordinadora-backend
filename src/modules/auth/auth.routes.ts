import { Router } from 'express'
import { registerUserController } from './auth.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { RegisterUserSchema } from './auth.validation'

const authRouter = Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registro de un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jeison
 *               lastname:
 *                 type: string
 *                 example: Rojas
 *               email:
 *                 type: string
 *                 example: jeison@example.com
 *               password:
 *                 type: string
 *                 example: Pass123*
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 body:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: number
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Jeison
 *                     lastname:
 *                       type: string
 *                       example: Rojas
 *                     email:
 *                       type: string
 *                       example: jeison@example.com
 *       400:
 *         description: El usuario ya existe o hay errores de validación
 */
authRouter.post(
  '/register',
  validateRequest(RegisterUserSchema),
  registerUserController
)

export default authRouter