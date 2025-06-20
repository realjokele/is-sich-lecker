import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'
import {
  Label,
  Input as RACInput,
  TextField as RACTextField,
  type TextFieldProps as RACTextFieldProps,
} from 'react-aria-components'

import { cn } from '~/utils/cn'
import { Button } from './button'

export interface TextFieldProps extends RACTextFieldProps {
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
    <RACTextField
      {...props}
      className={(values) =>
        cn(
          'w-full flex flex-col gap-1 group',
          typeof props.className === 'function' ? props.className(values) : props.className,
        )
      }
      isInvalid={invalid}
    >
      <Label>{label}</Label>
      <div className="relative">
        <Input
          className={cn(type === 'password' && 'pe-9')}
          type={type === 'password' && showPassword ? 'text' : type}
          aria-invalid={invalid}
        />
        {type === 'password' && (
          <Button
            type="button"
            onClick={togglePasswordVisibility}
            variant="icon"
            className="text-muted-foreground hover:text-primary focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
          </Button>
        )}
      </div>
      {errorMessage && <div className="text text-destructive">{errorMessage}</div>}
    </RACTextField>
  )
}

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <RACInput
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}
