import { z } from 'zod'

export const descriptionValidation = z.string().trim().min(3).max(50)
export const notesValidation = z.any().transform(val => !val ? '' : val.toString()).pipe(z.string().max(300))
export const amountValidation = z.number().refine(val => val !== 0, { message: 'Amount can not be 0' })
export const amountWith0Validation = z.preprocess((val: any) => parseFloat(val), z.number())
export const symbolValidation = z.string().trim().toUpperCase().length(3).regex(/^[A-Z]*$/i, { message: 'Invalid symbol format' })