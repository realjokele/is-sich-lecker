import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),
  },
  clientPrefix: 'VITE_',
  client: {
    VITE_SERVER_URL: z.string().url(),
    VITE_GOOGLE_CLIENT_ID: z.string().optional(),
  },
  runtimeEnv: {
    BETTER_AUTH_SECRET: import.meta.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: import.meta.env.BETTER_AUTH_URL,
    VITE_SERVER_URL: import.meta.env.VITE_SERVER_URL,
    VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  },
  emptyStringAsUndefined: true,
})
