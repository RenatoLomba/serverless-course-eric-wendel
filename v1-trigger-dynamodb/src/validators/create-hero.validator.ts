import { z } from 'zod'

export const createHeroSchema = z.object({
  name: z.string().min(1),
  power: z.string().nullable().optional(),
})

export type CreateHeroData = z.infer<typeof createHeroSchema>
