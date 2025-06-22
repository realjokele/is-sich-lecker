import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import { db } from '~/lib/prisma'
import { requireUserMiddleware } from '~/middleware/auth.middleware'

const CreateRecipeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).optional().default('Neues Rezept'),
})

export const $createRecipe = createServerFn({ method: 'POST' })
  .middleware([requireUserMiddleware])
  .validator((data) => CreateRecipeSchema.parse(data))
  .handler(async ({ context, data }) => {
    const { userSession } = context
    const title = data.title
    const id = data.id ?? crypto.randomUUID()

    try {
      // First, get or create the UserData record for this user
      let userData = await db.userData.findUnique({
        where: { userId: userSession.session.userId },
      })

      if (!userData) {
        // Create UserData if it doesn't exist
        userData = await db.userData.create({
          data: {
            userId: userSession.session.userId,
          },
        })
      }

      await db.recipe.create({
        data: {
          id,
          title,
          userDataId: userData.id, // Use the UserData.id, not the User.id
        },
      })
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create recipe')
    }

    // Add a 10 second delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { id }
  })
