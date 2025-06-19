import { createServerFn } from '@tanstack/react-start'
import { db } from '~/lib/prisma'
import { requireUserMiddleware } from '~/middleware/auth.middleware'

function toastError({
  type = 'success',
  message,
}: {
  type?: 'error' | 'success'
  message: string
}) {
  return {
    toast: 'error',
    message: 'Das hat nicht funktioniert',
  }
}

export const $changeRecipeTitle = createServerFn()
  .middleware([requireUserMiddleware])
  .validator((data: string) => data)
  .handler(async (ctx) => {
    const { userSession } = ctx.context
    const titel = ctx.data

    // throw toastError({
    //   type: 'success',
    //   message: 'Hat geklappt',
    // })
  })
