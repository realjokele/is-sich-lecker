import z from 'zod/v4'
import { Card } from '~/components/ui/card'

import { useRouter } from '@tanstack/react-router'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { authClient } from '~/lib/auth-client'
import { useAppForm } from '~/lib/form'
import { Link } from '~/components/ui/link'
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(8, { message: 'Password is required' }),
})

const searchSchema = z.object({
  redirectTo: z.string().optional(),
})

export const Route = createFileRoute({
  validateSearch: (search) => searchSchema.parse(search),
  component: Login,
})

function Login() {
  const { redirectTo } = Route.useSearch()

  return (
    <Card className="mx-auto w-full max-w-[500px] border-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:border py-16 px-8">
      <Card.Header>
        <Card.Title>Login</Card.Title>
      </Card.Header>

      <Card.Content>
        <LoginForm redirectTo={redirectTo} />
      </Card.Content>
    </Card>
  )
}

function LoginForm({ redirectTo }: { redirectTo: string | undefined }) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const form = useAppForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      mutate({ password: value.password, username: value.username })
    },
  })

  const { mutate, data } = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      authClient.signIn.username({
        username,
        password,
      }),
    onSuccess: ({ error }) => {
      queryClient.resetQueries()
      if (!error) {
        router.navigate({
          to: redirectTo ?? '/dashboard',
        })
      } else {
        form.resetField('password')
      }
    },
  })

  return (
    <>
      <form
        method="post"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <div className="space-y-4 md:space-y-8">
          {data?.error && <div className="text-danger w-full text-center">Invalid credentials</div>}

          <form.AppField name="username" children={(field) => <field.TextField label="Username" />} />

          <div className="^w-full space-y-2">
            <form.AppField
              name="password"
              children={(field) => <field.TextField label="Password" type="password" isRevealable />}
            />
            <Link to="/forgot-password">Passwort vergessen?</Link>
          </div>
          <form.AppForm>
            <form.SubmitButton className="w-full">Login</form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </>
  )
}
