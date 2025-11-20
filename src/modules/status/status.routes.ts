import { Router } from 'express'
import { getAllStatusController } from './status.controller'

const statusRouter = Router()

/**
 * @swagger
 * /status/getAll:
 *   get:
 *     summary: Get all available statuses
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: List of available statuses
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
 *                       statusId:
 *                         type: integer
 *                         example: 1
 *                       statusName:
 *                         type: string
 *                         example: "En espera"
 *       500:
 *         description: Internal server error
 */
statusRouter.get(
  '/getAll',
  getAllStatusController
)

export default statusRouter
