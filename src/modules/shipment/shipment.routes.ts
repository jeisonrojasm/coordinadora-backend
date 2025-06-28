import { Router } from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { validateRequest } from '../../middlewares/validateRequest'
import { createShipmentController } from './shipment.controller'
import { CreateShipmentSchema } from './shipment.validation'

const shipmentRouter = Router()

/**
 * @swagger
 * /shipment:
 *   post:
 *     summary: Crear una orden de envío
 *     tags: [Shipment]
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
 *               - price
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
 *                 example: 2.5
 *                 description: Peso real del paquete (kg)
 *               height:
 *                 type: number
 *                 example: 25
 *                 description: Altura del paquete (cm)
 *               width:
 *                 type: number
 *                 example: 20
 *                 description: Ancho del paquete (cm)
 *               length:
 *                 type: number
 *                 example: 30
 *                 description: Largo del paquete (cm)
 *               price:
 *                 type: number
 *                 example: 18000
 *                 description: Precio cotizado del envío
 *     responses:
 *       201:
 *         description: Envío creado exitosamente
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
 *                     shipment_id:
 *                       type: string
 *                       format: uuid
 *                       example: "f3bde31e-4579-41c6-84b5-c69c58b9d1b4"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                     origin:
 *                       type: integer
 *                       example: 1
 *                     destination:
 *                       type: integer
 *                       example: 2
 *                     weight:
 *                       type: string
 *                       example: 2.5
 *                     height:
 *                       type: string
 *                       example: 25
 *                     width:
 *                       type: string
 *                       example: 20
 *                     length:
 *                       type: string
 *                       example: 30
 *                     price:
 *                       type: string
 *                       example: 18000
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Error de validación o datos faltantes
 *       401:
 *         description: Token no válido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
shipmentRouter.post(
  '/',
  authMiddleware,
  validateRequest(CreateShipmentSchema),
  createShipmentController
)

export default shipmentRouter
