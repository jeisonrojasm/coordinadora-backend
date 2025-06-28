import * as z from 'zod'

export const RegisterUserSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').trim(),
  lastname: z.string().min(3, 'El apellido debe tener al menos 3 caracteres').trim(),
  email: z.string().email('Correo no válido'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(16, 'La contraseña no puede tener más de 16 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial')
})

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>