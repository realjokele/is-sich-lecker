import { Button, type ButtonProps } from '~/components/ui/button'
import { useFormContext } from '~/lib/form'

type SubmitButtonProps = ButtonProps & {
  isSubmitting?: boolean
}

export function SubmitButton({ isSubmitting, type = 'submit', isDisabled, className, ...props }: SubmitButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" isDisabled={isSubmitting || isDisabled} className={className}>
          Submit
        </Button>
      )}
    </form.Subscribe>
  )
}
