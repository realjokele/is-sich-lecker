import { createServerFn } from '@tanstack/react-start'
import { db } from '~/lib/prisma'
import { requireUserMiddleware } from '~/middleware/auth.middleware'

const $addIngredientSection = createServerFn()
  .middleware([requireUserMiddleware])
  .validator((data) => data)
  .handler(async ({ context, data }) => {
    const { userSession } = context
    const sectionName = data
  })
