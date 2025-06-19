import { Input } from '~/components/ui/input'
import { useFieldContext } from '~/lib/form'

export function TextField(props: typeof Input) {
  const field = useFieldContext<string>()

  const errorMessage = field.state.meta.errors.map((err) => err?.message).join(',')

  return (
    <>
      <Input
        {...props}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        // isInvalid={!field.state.meta.isValid}
        // errorMessage={errorMessage}
      />
    </>
  )
}
