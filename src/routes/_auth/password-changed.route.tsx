import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react'
import { Card } from '~/components/ui/card'

export const Route = createFileRoute({
  component: PasswordChanged,
})

export default function PasswordChanged() {
  return (
    <Card className="mx-auto w-full max-w-[500px] border-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:border [--card-spacing:24px] py-16 px-8">
      <Card.Header>
        <Card.Title>Password was changed</Card.Title>
        <Card.Description>
          Your password was successfully changed. You can now log in with your new password.
        </Card.Description>
      </Card.Header>
      <Card.Content className="flex justify-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500" />
      </Card.Content>
      <Card.Footer>
        <div className="flex items-center justify-center">
          <Link to="/login" className="text-muted-foreground flex items-center justify-center text-sm font-normal">
            <ArrowLeftIcon className="mr-1.5 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </Card.Footer>
    </Card>
  )
}
