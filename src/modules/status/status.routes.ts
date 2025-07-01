import { Router } from 'express'
import { getAllStatusController } from './status.controller'

const statusRouter = Router()

/**
 * @swagger
 * /status/getAll:
 *   get:
 *     summary: Obtener todos los estados disponibles
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: Lista de estados disponibles
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
 *         description: Error interno del servidor
 */
statusRouter.get(
  '/getAll',
  getAllStatusController
)

export default statusRouter
