import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { db } from '~/lib/prisma'
import { requireUserMiddleware } from '~/middleware/auth.middleware'

const DeleteRecipeSchema = z.object({
  id: z.string(),
})

export const $deleteRecipe = createServerFn({ method: 'POST' })
  .middleware([requireUserMiddleware])
  .validator((data) => DeleteRecipeSchema.parse(data))
  .handler(async ({ context, data }) => {
    const { userSession } = context
    const { id } = data

    try {
      const userData = await db.userData.findUnique({
        where: {
          userId: userSession.session.userId,
        },
      })

      if (!userData) {
        throw new Error('User data not found')
      }

      await db.recipe.delete({
        where: {
          id,
          userDataId: userData.id,
        },
      })
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to delete recipe')
    }
  })
