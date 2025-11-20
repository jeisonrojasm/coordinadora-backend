import path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coordinadora API',
      version: '1.0.0',
      description: 'Endpoints documentation with Swagger',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.resolve(__dirname, '../modules/**/*.ts')],
}

export const swaggerSpec = swaggerJsdoc(options)
export const swaggerUiMiddleware = swaggerUi.serve
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec)
