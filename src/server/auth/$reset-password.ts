import { createServerFn } from '@tanstack/react-start'
import { authClient } from '~/lib/auth-client'
import { resetPasswordSchema, tokenSchema } from '~/routes/_auth/reset-password.route'

export const resetPassword = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    const combinedSchema = resetPasswordSchema.and(tokenSchema)
    const result = combinedSchema.parse(data)
    return result
  })
  .handler(async (ctx) => {
    return authClient.resetPassword({ newPassword: ctx.data.newPassword, token: ctx.data.token })
  })
