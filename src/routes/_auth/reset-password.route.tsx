import { useMutation } from '@tanstack/react-query'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import z from 'zod/v4'

import { Card } from '~/components/ui/card'
import { useAppForm } from '~/lib/form'
import { resetPassword } from '~/server/auth/$reset-password'

export const passwordPolicyMessage =
  "Password must be a minimum of 10 characters and can contain the following character 'a-zA-Z0-9 !?'"
export function complyWithPasswordPolicy(password: string) {
  return password.match(/^[0-9a-zA-Z -!?]{9,30}/)
}

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().refine((password) => complyWithPasswordPolicy(password), {
      message: passwordPolicyMessage,
    }),
    confirmPassword: z.string(),
  })
  .transform((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: "New password and confirm password don't match.",
      })
      return z.NEVER
    }
    return { newPassword: data.newPassword }
  })

export const tokenSchema = z.object({
  token: z.string(),
})

export const Route = createFileRoute('/_auth/reset-password')({
  component: ResetPassword,
  validateSearch: tokenSchema,
  errorComponent: ({ error }) => {
    return <div>{error.message}</div>
  },
})

function ResetPassword() {
  return (
    <Card className="mx-auto w-full max-w-[500px] border-0 px-8 py-16 [--card-spacing:24px] md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:border">
      <Card.Header>
        <Card.Title>Change password</Card.Title>
      </Card.Header>

      <Card.Content>
        <ResetPasswordForm />
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

function ResetPasswordForm() {
  const router = useRouter()
  const { token } = Route.useSearch()

  const form = useAppForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      token,
    },
    validators: {
      onSubmit: resetPasswordSchema.and(tokenSchema),
    },
    onSubmit: ({
      value,
    }: {
      value: { newPassword: string; confirmPassword: string; token: string }
    }) => {
      mutate({ newPassword: value.newPassword, confirmPassword: value.confirmPassword, token })
    },
  })

  const { mutate } = useMutation({
    mutationFn: async (data: { newPassword: string; confirmPassword: string; token: string }) => {
      return resetPassword({ data })
    },
    onSuccess: () => {
      router.navigate({ to: '/password-changed' })
    },
  })

  return (
    <form
      method="post"
      className="gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="space-y-4 md:space-y-8">
        <form.AppField
          name="newPassword"
          children={(field) => (
            <field.TextField label="New Password" isRevealable type="password" />
          )}
        />
        <form.AppField
          name="confirmPassword"
          children={(field) => (
            <field.TextField label="Confirm Password" isRevealable type="password" />
          )}
        />
        <form.AppForm>
          <form.SubmitButton className="w-full">Save</form.SubmitButton>
        </form.AppForm>
      </div>
    </form>
  )
}
