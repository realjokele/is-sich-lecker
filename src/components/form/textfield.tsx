import { type TextFieldProps, TextField as UITextField } from '~/components/rac-ui/textfield'
import { useFieldContext } from '~/lib/form'

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>()

  const errorMessage = field.state.meta.errors.map((err) => err?.message).join(',')

  return (
    <>
      <UITextField
        {...props}
        value={field.state.value}
        onChange={(e) => field.handleChange(e)}
        onBlur={field.handleBlur}
        invalid={!field.state.meta.isValid}
        errorMessage={errorMessage}
      />
    </>
  )
}
