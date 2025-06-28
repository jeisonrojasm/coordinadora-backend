import * as z from 'zod'
import { BasePackageSchema } from '../../utils/global-schemas'

export const CreateShipmentSchema = BasePackageSchema.extend({
  price: z
    .number({ required_error: 'El campo price es obligatorio' })
    .positive('El campo price debe ser un número positivo')
})

export type CreateShipmentDto = z.infer<typeof CreateShipmentSchema>
