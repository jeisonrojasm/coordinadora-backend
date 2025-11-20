import { Router } from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  createShipmentController,
  getUserShipmentsController,
  updateShipmentStatusController,
} from './shipment.controller'
import { CreateShipmentSchema, UpdateShipmentStatusSchema } from './shipment.validation'

const shipmentRouter = Router()

/**
 * @swagger
 * /shipment:
 *   post:
 *     summary: Create a shipment order
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
 *                 description: Origin city ID
 *               destination:
 *                 type: integer
 *                 example: 2
 *                 description: Destination city ID
 *               weight:
 *                 type: number
 *                 example: 2.5
 *                 description: Real weight of the package (kg)
 *               height:
 *                 type: number
 *                 example: 25
 *                 description: Height of the package (cm)
 *               width:
 *                 type: number
 *                 example: 20
 *                 description: Width of the package (cm)
 *               length:
 *                 type: number
 *                 example: 30
 *                 description: Length of the package (cm)
 *               price:
 *                 type: number
 *                 example: 18000
 *                 description: Quoted price of the shipment
 *     responses:
 *       201:
 *         description: Shipment created successfully
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
 *         description: Validation error or missing data
 *       401:
 *         description: Invalid or missing token
 *       500:
 *         description: Internal server error
 */
shipmentRouter.post(
  '/',
  authMiddleware,
  validateRequest(CreateShipmentSchema),
  createShipmentController
)

/**
 * @swagger
 * /shipment/findAll/user/{userId}:
 *   get:
 *     summary: Get all shipments for a user
 *     tags: [Shipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the user whose shipments are to be retrieved
 *     responses:
 *       200:
 *         description: List of user's shipments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 body:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       shipment_id:
 *                         type: string
 *                         format: uuid
 *                         example: "ff666369-ee16-4332-a454-5e108dff0bea"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                       weight:
 *                         type: string
 *                         example: "150"
 *                       height:
 *                         type: string
 *                         example: "152"
 *                       width:
 *                         type: string
 *                         example: "154"
 *                       length:
 *                         type: string
 *                         example: "165"
 *                       price:
 *                         type: string
 *                         example: "79000"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                       origin_name:
 *                         type: string
 *                         example: "Bogotá"
 *                       destination_name:
 *                         type: string
 *                         example: "Medellín"
 *                       status_id:
 *                         type: integer
 *                         example: 1
 *                       status_name:
 *                         type: string
 *                         example: "En espera"
 *                       changed_at:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: User not found or no shipments available
 *       500:
 *         description: Internal server error
 */
shipmentRouter.get(
  '/findAll/user/:userId',
  authMiddleware,
  getUserShipmentsController
)

/**
 * @swagger
 * /shipment/status:
 *   patch:
 *     summary: Update a shipment status
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
 *               - shipmentId
 *               - statusId
 *             properties:
 *               shipmentId:
 *                 type: string
 *                 format: uuid
 *                 example: "ff666369-ee16-4332-a454-5e108dff0bea"
 *                 description: ID of the shipment to be updated
 *               statusId:
 *                 type: integer
 *                 example: 2
 *                 enum: [1, 2, 3]
 *                 description: ID of the new status (1 = Pending, 2 = In transit, 3 = Delivered)
 *     responses:
 *       201:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid request data (Zod validation errors)
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: Shipment not found or no associated status
 *       500:
 *         description: Internal server error
 */
shipmentRouter.patch(
  '/status',
  authMiddleware,
  validateRequest(UpdateShipmentStatusSchema),
  updateShipmentStatusController
)

export default shipmentRouter
