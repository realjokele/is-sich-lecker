import { createServerFn } from '@tanstack/react-start'
import { authClient } from '~/lib/auth-client'
import { db } from '~/lib/prisma'
import { forgotPasswordSchema } from '~/routes/_auth/forgot-password.route'

export const forgotPassword = createServerFn({ method: 'POST' })
  .validator((data: unknown) => forgotPasswordSchema.parse(data))
  .handler(async (ctx) => {
    try {
      const user = await db.user.findUnique({
        where: {
          username: ctx.data.username,
        },
      })

      if (!user) {
        throw new Error('User not found')
      }
      await authClient.forgetPassword({
        email: user?.email ?? '',
        redirectTo: '/reset-password',
      })
    } catch (_error) {
      // Do nothing here!
      // We don't want to leak information about whether a user exists or not
    }
    // Return a success status in any case
    return { status: 'ok' }
  })
