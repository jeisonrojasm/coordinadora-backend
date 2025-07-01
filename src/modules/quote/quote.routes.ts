import { Router } from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { validateRequest } from '../../middlewares/validateRequest'
import { calculateQuoteController } from './quote.controller'
import { QuoteSchema } from './quote.validation'

const quoteRouter = Router()

/**
 * @swagger
 * /quote:
 *   post:
 *     summary: Cotizar el valor de un envío
 *     tags: [Quote]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origin
 *               - destination
 *               - weight
 *               - height
 *               - width
 *               - length
 *             properties:
 *               origin:
 *                 type: integer
 *                 example: 1
 *                 description: ID de la ciudad de origen
 *               destination:
 *                 type: integer
 *                 example: 2
 *                 description: ID de la ciudad de destino
 *               weight:
 *                 type: number
 *                 example: 1.5
 *                 description: Peso real del paquete (kg)
 *               height:
 *                 type: number
 *                 example: 20
 *                 description: Altura del paquete (cm)
 *               width:
 *                 type: number
 *                 example: 30
 *                 description: Ancho del paquete (cm)
 *               length:
 *                 type: number
 *                 example: 40
 *                 description: Largo del paquete (cm)
 *     responses:
 *       200:
 *         description: Cotización generada exitosamente
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
 *                     origin:
 *                       type: integer
 *                       example: 1
 *                     destination:
 *                       type: integer
 *                       example: 2
 *                     finalWeight:
 *                       type: number
 *                       example: 9.6
 *                       description: Mayor valor entre el peso real y el peso volumétrico
 *                     price:
 *                       type: string
 *                       example: 15000
 *       404:
 *         description: No se encontró tarifa para la ruta y peso especificados
 *       401:
 *         description: Token no válido o no proporcionado
 */
quoteRouter.post(
  '/',
  authMiddleware,
  validateRequest(QuoteSchema),
  calculateQuoteController
)

export default quoteRouter
