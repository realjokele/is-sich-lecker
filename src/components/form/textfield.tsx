import { useFieldContext } from '~/lib/form'
import { TextField as TextFieldPrimitive, type TextFieldProps } from '~/components/ui/textfield'

export function TextField(props: TextFieldProps) {
  const field = useFieldContext<string>()

  const errorMessage = field.state.meta.errors.map((err) => err?.message).join(',')

  return (
    <>
      <TextFieldPrimitive
        {...props}
        value={field.state.value}
        onChange={field.handleChange}
        onBlur={field.handleBlur}
        isInvalid={!field.state.meta.isValid}
        errorMessage={errorMessage}
      />
    </>
  )
}
