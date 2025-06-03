import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { ArrowLeftIcon } from 'lucide-react'

import { useAppForm } from '~/lib/form'
import { Card } from '~/components/ui/card'
import { forgotPassword } from '~/server/auth/$forgot-password'
import { Link } from '~/components/ui/link'
export const forgotPasswordSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username is required' })
    .max(10, { message: 'Username must be less than 10 characters' }),
})

export const Route = createFileRoute({
  component: ForgotPassword,
})

export default function ForgotPassword() {
  return (
    <Card className="mx-auto w-full max-w-[500px] border-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:border [--card-spacing:24px] py-16 px-8">
      <Card.Header>
        <Card.Title>Forgot password</Card.Title>
        <Card.Description>
          Please enter your username to receive a verification code to reset your password.
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <ForgotPasswordForm />
      </Card.Content>

      <Card.Footer>
        <div className="flex items-center justify-center">
          <Link to="/login">
            <ArrowLeftIcon data-slot="icon" className="mr-1.5 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </Card.Footer>
    </Card>
  )
}

function ForgotPasswordForm() {
  const form = useAppForm({
    defaultValues: {
      username: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value.username)
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (username: string) => forgotPassword({ data: { username } }),
    onError: (error) => {
      console.log('Error:', error)
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
          <form.AppField name="username" children={(field) => <field.TextField label="Username" />} />

          <form.AppForm>
            <form.SubmitButton className="w-full">Send code</form.SubmitButton>
          </form.AppForm>
        </div>
      </form>
    </>
  )
}
