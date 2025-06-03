import { Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute({
  component: Layout,
  beforeLoad: async ({ context, location }) => {
    if (!context.userSession?.session.id) {
      throw redirect({ to: '/login', search: { redirectTo: location.href } })
    }
  },
})

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
