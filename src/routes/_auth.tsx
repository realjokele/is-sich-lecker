import { Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute({
  beforeLoad: ({ context }) => {
    if (context.userSession?.session.id) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
