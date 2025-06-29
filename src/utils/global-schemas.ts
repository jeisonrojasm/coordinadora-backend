import * as z from 'zod'

export const BasePackageSchema = z.object({
  origin: z
    .number({ required_error: 'El campo origin es obligatorio' })
    .int('El campo origin debe ser un número entero')
    .positive('El campo origin debe ser un número entero positivo'),

  destination: z
    .number({ required_error: 'El campo destination es obligatorio' })
    .int('El campo destination debe ser un número entero')
    .positive('El campo destination debe ser un número entero positivo'),

  weight: z
    .number({ required_error: 'El campo weight es obligatorio' })
    .positive('El campo weight debe ser un número positivo'),

  height: z
    .number({ required_error: 'El campo height es obligatoria' })
    .positive('El campo height debe ser un número positivo'),

  width: z
    .number({ required_error: 'El campo width es obligatorio' })
    .positive('El campo width debe ser un número positivo'),

  length: z
    .number({ required_error: 'El campo length es obligatorio' })
    .positive('El campo length debe ser un número positivo'),
})

export const EmailSchema = z.string().email('Correo no válido')

export const PasswordSchema = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(16, 'La contraseña no puede tener más de 16 caracteres')
  .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
  .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
  .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
  .regex(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial')
