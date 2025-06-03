import { useQuery } from '@tanstack/react-query'
import { createAuthClient } from 'better-auth/react'
import { usernameClient, emailOTPClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [usernameClient(), emailOTPClient()],
})

export function useSession() {
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: () => authClient.getSession(),
    staleTime: 0,
  })
  return session
}
