import { Router } from 'express'
import { getAllCitiesController } from './city.controller'

const cityRouter = Router()

/**
 * @swagger
 * /city/getAll:
 *   get:
 *     summary: Obtener todas las ciudades
 *     tags: [City]
 *     description: Retorna un listado con todas las ciudades registradas en el sistema.
 *     responses:
 *       200:
 *         description: Listado de ciudades obtenido exitosamente
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
 *                       cityId:
 *                         type: integer
 *                         example: 1
 *                       cityName:
 *                         type: string
 *                         example: Bogotá
 *       500:
 *         description: Error interno del servidor
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
 *                       example: INTERNAL_SERVER_ERROR
 *                     statusCode:
 *                       type: number
 *                       example: 500
 *                     path:
 *                       type: string
 *                       example: /city/getAll
 *                     timestamp:
 *                       type: string
 *                       example: 2025-06-28T18:03:13.834Z
 */
cityRouter.get(
  '/getAll',
  getAllCitiesController
)

export default cityRouter
