import { createServerFn } from '@tanstack/react-start'
import z from 'zod/v4'
import { db } from '~/lib/prisma'
import { requireUserMiddleware } from '~/middleware/auth.middleware'

const GetRecipeSchema = z.object({
  recipeId: z.string(),
})

export const $getRecipe = createServerFn()
  .middleware([requireUserMiddleware])
  .validator((data) => GetRecipeSchema.parse(data))
  .handler(async ({ context, data }) => {
    const { userSession } = context
    const { recipeId } = data

    const recipe = await db.recipe.findUnique({
      where: { id: recipeId },
    })

    return recipe
  })
