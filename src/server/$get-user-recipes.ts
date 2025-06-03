import { createServerFn } from '@tanstack/react-start'
import { db } from '~/lib/prisma'
import { requireUserMiddleware } from '~/middleware/auth.middleware'

export const $getUserRecipes = createServerFn()
  .middleware([requireUserMiddleware])
  .handler(async ({ context }) => {
    const { userSession } = context

    const userData = await db.userData.findUnique({
      where: {
        userId: userSession.user.id,
      },
    })

    return userData
  })
