import { authClient } from '~/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { Button } from '~/components/ui/button'

export const Route = createFileRoute({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate } = useMutation({
    mutationFn: () =>
      authClient.signUp.email({
        email: 'test@test.com',
        password: 'test12345',
        name: 'test',
        username: 'test',
      }),
  })

  return (
    <div>
      <Button onClick={() => mutate()}>Sign up</Button>
    </div>
  )
}
