import { Field } from '@base-ui-components/react/field'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'

import { Input } from '~/components/ui/input'
import { cn } from '~/utils/cn'
import { Button } from './button'

export interface TextFieldProps extends React.ComponentProps<typeof Input> {
  label?: string
  errorMessage?: string
  invalid?: boolean
}

export function TextField({ type, label, errorMessage, invalid, ...props }: TextFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
  }

  return (
    <Field.Root className={cn('group flex w-full flex-col gap-1')} invalid={invalid}>
      <Field.Label>{label}</Field.Label>
      <div className="relative">
        <Input
          className={cn(type === 'password' && 'pe-9')}
          {...props}
          type={type === 'password' && showPassword ? 'text' : type}
          aria-invalid={invalid}
        />
        {type === 'password' && (
          <Button
            type="button"
            onClick={togglePasswordVisibility}
            variant="icon"
            size="icon"
            className="text-muted-foreground hover:text-primary focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
          </Button>
        )}
      </div>
      {errorMessage && <div className="text text-destructive">{errorMessage}</div>}
    </Field.Root>
  )
}
