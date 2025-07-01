import * as z from 'zod'
import { EmailSchema, PasswordSchema } from '../../utils/global-schemas'

export const RegisterUserSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').trim(),
  lastname: z.string().min(3, 'El apellido debe tener al menos 3 caracteres').trim(),
  email: EmailSchema,
  password: PasswordSchema
})

export const LoginUserSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema
})

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>
export type LoginUserDto = z.infer<typeof LoginUserSchema>
