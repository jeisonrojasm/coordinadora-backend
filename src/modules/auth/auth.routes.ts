import { Router } from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { loginUserController, registerUserController } from './auth.controller'
import { LoginUserSchema, RegisterUserSchema } from './auth.validation'

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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jeison@example.com
 *               password:
 *                 type: string
 *                 example: Pass123*
 *     responses:
 *       200:
 *         description: Login exitoso
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
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR...
 *                     user:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: string
 *                           example: 783a80d7-bda8-443b-95f7-f663ff12582c
 *                         name:
 *                           type: string
 *                           example: Jeison
 *                         lastname:
 *                           type: string
 *                           example: Rojas
 *                         email:
 *                           type: string
 *                           example: jeison@example.com
 *       401:
 *         description: Credenciales incorrectas
 *       429:
 *         description: Se superó la máxima cantidad de intentos de inicio de sesión fallidos
  *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 body:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: TOO_MANY_LOGIN_ATTEMPTS
 *                     statusCode:
 *                       type: number
 *                       example: 429
 *                     path:
 *                       type: string
 *                       example: /auth/login
 *                     timestamp:
 *                       type: string
 *                       example: 2025-06-28T18:03:13.834Z
 */
authRouter.post(
  '/login',
  validateRequest(LoginUserSchema),
  loginUserController
)

export default authRouter
