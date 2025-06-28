import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Coordinadora',
      version: '1.0.0',
      description: 'Documentación de endpoints con Swagger',
    },
  },
  apis: [path.resolve(__dirname, '../modules/**/*.ts')],
}

export const swaggerSpec = swaggerJsdoc(options)
export const swaggerUiMiddleware = swaggerUi.serve
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec)