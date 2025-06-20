import { Button, type ButtonProps } from '~/components/ui/button'
import { useFormContext } from '~/lib/form'

type SubmitButtonProps = ButtonProps & {
  isSubmitting?: boolean
}

export function SubmitButton({ isSubmitting, type = 'submit', disabled, className, ...props }: SubmitButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={isSubmitting || disabled} className={className}>
          Submit
        </Button>
      )}
    </form.Subscribe>
  )
}
