import { createServerFn } from '@tanstack/react-start'
import { requireUserMiddleware } from '~/middleware/auth.middleware'

const $addIngredientSection = createServerFn({ method: 'POST' })
  .middleware([requireUserMiddleware])
  .validator((data) => data)
  .handler(async ({ context, data }) => {
    const { userSession } = context
    const sectionName = data
  })
