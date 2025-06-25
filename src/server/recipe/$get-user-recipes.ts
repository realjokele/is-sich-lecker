import { createServerFn } from '@tanstack/react-start'
import { db } from '~/lib/prisma'
import { requireUserMiddleware } from '~/middleware/auth.middleware'

export const $getUserRecipes = createServerFn({ method: 'GET' })
  .middleware([requireUserMiddleware])
  .handler(async ({ context }) => {
    const { userSession } = context

    // Get or create UserData for the user
    let userData = await db.userData.findUnique({
      where: {
        userId: userSession.session.userId,
      },
    })

    if (!userData) {
      // Create UserData if it doesn't exist
      userData = await db.userData.create({
        data: {
          userId: userSession.session.userId,
        },
      })
    }

    const userRecipes = await db.recipe.findMany({
      where: {
        userDataId: userData.id,
      },
    })

    return userRecipes
  })
