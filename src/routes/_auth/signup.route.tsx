import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { authClient } from '~/lib/auth-client'

export const Route = createFileRoute('/_auth/signup')({
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
