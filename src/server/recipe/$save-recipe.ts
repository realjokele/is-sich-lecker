import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { db } from '~/lib/prisma'
import { requireUserMiddleware } from '~/middleware/auth.middleware'

const SaveRecipeSchema = z.object({
  recipeId: z.string(),
  title: z.string(),
})

export const $saveRecipe = createServerFn()
  .middleware([requireUserMiddleware])
  .validator((data) => SaveRecipeSchema.parse(data))
  .handler(async ({ data }) => {
    const { recipeId, title } = data
    try {
      await db.recipe.update({
        where: {
          id: recipeId,
        },
        data: {
          title,
        },
      })
    } catch (error) {
      throw Error('Fehler beim Speichern des Rezepts')
    }
  })
