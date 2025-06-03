import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { authClient } from '~/lib/auth-client'

export const Route = createFileRoute({
  component: Home,
})

function Home() {
  const router = useRouter()
  const queryClient = useQueryClient()

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.resetQueries()
          router.navigate({ to: '/login' })
        },
      },
    })
  }
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <Button onClick={async () => await handleLogout()}>Sign Out</Button>
    </div>
  )
}
