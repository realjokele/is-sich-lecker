import { createMiddleware, createServerFn, json } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'
import { auth } from '~/lib/auth'

export const userSessionMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const request = getWebRequest()
    if (!request) throw new Error('No request found in current execution context')

    const userSession = await auth.api.getSession({
      headers: request.headers,
    })

    return await next({
      context: {
        userSession,
      },
    })
  },
)

export const requireUserMiddleware = createMiddleware({ type: 'function' })
  .middleware([userSessionMiddleware])
  .server(async ({ next, context }) => {
    if (!context.userSession) {
      throw json({ message: 'You must be logged in to do that!' }, { status: 401 })
    }

    return await next({ context: { userSession: context.userSession } })
  })
