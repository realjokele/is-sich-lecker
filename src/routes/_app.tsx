import { Outlet, redirect, createFileRoute } from '@tanstack/react-router'
import { Toast } from '~/components/ui/toast'

export const Route = createFileRoute('/_app')({
  component: AppLayout,
  beforeLoad: async ({ context, location }) => {
    if (!context.userSession?.session.id) {
      throw redirect({ to: '/login', search: { redirectTo: location.href } })
    }
  },
})

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-row">
      <nav className="sticky top-0 left-0 h-screen w-44 overflow-y-auto bg-gray-100 p-4">
        <Navbar />
      </nav>
      <div className="flex-1">
        <div className="flex h-full flex-col">
          <header className="sticky top-0 left-0 w-full bg-white p-4">
            <h1>Header</h1>
          </header>
          <main className="flex-1 px-4">
            <Outlet />
            <Toast />
          </main>
        </div>
      </div>
    </div>
  )
}

function Navbar() {
  return (
    <div className="">
      {[...Array(20)].map((_, i) => {
        return <div key={crypto.randomUUID()}>{`Navigation-${i}`}</div>
      })}
    </div>
  )
}
