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
 *     summary: Quote a shipment cost
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
 *                 description: Origin city ID
 *               destination:
 *                 type: integer
 *                 example: 2
 *                 description: Destination city ID
 *               weight:
 *                 type: number
 *                 example: 1.5
 *                 description: Real weight of the package (kg)
 *               height:
 *                 type: number
 *                 example: 20
 *                 description: Height of the package (cm)
 *               width:
 *                 type: number
 *                 example: 30
 *                 description: Width of the package (cm)
 *               length:
 *                 type: number
 *                 example: 40
 *                 description: Length of the package (cm)
 *     responses:
 *       200:
 *         description: Quote generated successfully
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
 *                       description: Greater value between the real weight and the volumetric weight
 *                     price:
 *                       type: string
 *                       example: 15000
 *       404:
 *         description: No rate found for the specified route and weight
 *       401:
 *         description: Invalid or missing token
 */
quoteRouter.post(
  '/',
  authMiddleware,
  validateRequest(QuoteSchema),
  calculateQuoteController
)

export default quoteRouter
