import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { createServerFn } from '@tanstack/react-start'
import type { Session, User } from 'better-auth'

import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary.js'
import { NotFound } from '~/components/NotFound.js'
import { Button } from '~/components/ui/button'
import { authClient } from '~/lib/auth-client'
import { userSessionMiddleware } from '~/middleware/auth.middleware'
import appCss from '~/styles/tailwind.css?url'
import { seo } from '~/utils/seo.js'

const queryClient = new QueryClient()

type AppContext = {
  queryClient: QueryClient
  userSession: (Session & { user: User }) | null
}

export const getUserSession = createServerFn({ method: 'GET' })
  .middleware([userSessionMiddleware])
  .handler(async ({ context }) => {
    return context.userSession
  })

export const Route = createRootRouteWithContext<AppContext>()({
  beforeLoad: async () => {
    const userSession = await queryClient.ensureQueryData({
      queryKey: ['userSession'],
      queryFn: getUserSession,
      gcTime: 0,
      staleTime: 0,
    })

    return {
      queryClient,
      userSession,
    }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: 'TanStack Start is a type-safe, client-first, full-stack React framework. ',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),

  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <Outlet />
      </QueryClientProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const router = useRouter()

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
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="">
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold',
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{' '}
          <Link
            to="/dashboard"
            activeProps={{
              className: 'font-bold',
            }}
          >
            Dashboard
          </Link>
          <div className="ml-auto">
            <Button onClick={async () => await handleLogout()}>Sign Out</Button>
          </div>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
