import * as z from 'zod'
import { BasePackageSchema } from '../../utils/global-schemas'

export const QuoteSchema = BasePackageSchema

export type QuoteDto = z.infer<typeof QuoteSchema>
