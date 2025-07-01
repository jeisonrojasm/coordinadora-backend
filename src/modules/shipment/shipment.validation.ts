import * as z from 'zod'
import { BasePackageSchema } from '../../utils/global-schemas'

export const CreateShipmentSchema = BasePackageSchema.extend({
  price: z
    .number({ required_error: 'El campo price es obligatorio' })
    .positive('El campo price debe ser un número positivo')
})

export const UpdateShipmentStatusSchema = z.object({
  shipmentId: z
    .string({
      required_error: 'El campo shipmentId es obligatorio',
      invalid_type_error: 'El campo shipmentId debe ser una cadena UUID'
    })
    .uuid({ message: 'El campo shipmentId debe ser un UUID válido' }),

  statusId: z
    .number({
      required_error: 'El campo statusId es obligatorio',
      invalid_type_error: 'statusId debe ser un número'
    })
    .refine((val) => [1, 2, 3].includes(val), {
      message: 'El campo statusId debe ser 1 (En espera), 2 (En tránsito) o 3 (Entregado)',
    }),
})

export type CreateShipmentDto = z.infer<typeof CreateShipmentSchema>
export type UpdateShipmentStatusDto = z.infer<typeof UpdateShipmentStatusSchema>
