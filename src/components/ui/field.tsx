// Changelog:
// - 2025-03-29: Initial implementation

import type {
  FieldErrorProps as FieldErrorPrimitiveProps,
  GroupProps,
  InputProps as InputPrimitiveProps,
  LabelProps,
  TextFieldProps as TextFieldPrimitiveProps,
  TextProps,
  ValidationResult,
} from 'react-aria-components'
import {
  FieldError as FieldErrorPrimitive,
  Group,
  Input as InputPrimitive,
  Label as LabelPrimitive,
  Text,
  composeRenderProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { composeTailwindRenderProps, focusStyles } from './primitive'

interface FieldProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  'aria-label'?: TextFieldPrimitiveProps['aria-label']
  'aria-labelledby'?: TextFieldPrimitiveProps['aria-labelledby']
}

const fieldStyles = tv({
  slots: {
    description: 'text-muted-fg text-sm/6 text-pretty',
    label: 'text-secondary-fg w-fit cursor-default text-sm/6 font-medium',
    fieldError: 'text-danger text-sm/6',
  },
})

const { description, label, fieldError } = fieldStyles()

const Label = ({ className, ...props }: LabelProps) => {
  return <LabelPrimitive {...props} className={label({ className })} />
}

interface DescriptionProps extends TextProps {
  isWarning?: boolean
  ref?: React.RefObject<HTMLElement>
}

const Description = ({ ref, className, ...props }: DescriptionProps) => {
  const isWarning = props.isWarning ?? false
  return (
    <Text
      ref={ref}
      {...props}
      slot="description"
      className={description({ className: isWarning ? 'text-warning' : className })}
    />
  )
}

interface FieldErrorProps extends FieldErrorPrimitiveProps {
  ref?: React.RefObject<HTMLElement>
}
const FieldError = ({ className, ref, ...props }: FieldErrorProps) => {
  return <FieldErrorPrimitive ref={ref} {...props} className={composeTailwindRenderProps(className, fieldError())} />
}

const fieldGroupStyles = tv({
  base: [
    // Basic layout and appearance
    'group border-input flex h-10 items-center overflow-hidden rounded-lg border shadow-xs transition duration-200 ease-out',
    // Focus and validation states
    'group-data-invalid:focus-within:border-danger group-data-invalid:focus-within:ring-danger/20 relative focus-within:ring-2',
    // Progress bar spacing
    '[&>[role=progressbar]:first-child]:ml-2.5 [&>[role=progressbar]:last-child]:mr-2.5',
    // Icon base styles
    '**:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0 **:[button]:shrink-0',
    // Icon button positioning
    '[&>button:has([data-slot=icon])]:absolute [&>button:has([data-slot=icon]):first-child]:left-0 [&>button:has([data-slot=icon]):last-child]:right-0',
    // Icon positioning and appearance
    '*:data-[slot=icon]:text-muted-fg *:data-[slot=icon]:pointer-events-none *:data-[slot=icon]:absolute *:data-[slot=icon]:top-[calc(var(--spacing)*2.7)] *:data-[slot=icon]:z-10 *:data-[slot=icon]:size-4',
    '[&>[data-slot=icon]:first-child]:left-2.5 [&>[data-slot=icon]:last-child]:right-2.5',
    // Input padding with icons
    '[&:has([data-slot=icon]+input)]:pl-6 [&:has(input+[data-slot=icon])]:pr-6',
    '[&:has([data-slot=icon]+[role=group])]:pl-6 [&:has([role=group]+[data-slot=icon])]:pr-6',
    'has-[[data-slot=icon]:last-child]:[&_input]:pr-7',
    // Button styles
    '*:[button]:h-8 *:[button]:rounded-[calc(var(--radius-sm)-1px)] *:[button]:px-2.5',
    '[&>button:first-child]:ml-[calc(var(--spacing)*0.7)] [&>button:last-child]:mr-[calc(var(--spacing)*0.7)]',
  ],
  variants: {
    isFocusWithin: focusStyles.variants.isFocused,
    isInvalid: focusStyles.variants.isInvalid,
    isDisabled: {
      true: 'opacity-50',
    },
  },
})

const FieldGroup = ({ className, ...props }: GroupProps) => {
  return (
    <Group
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        fieldGroupStyles({
          ...renderProps,
          className,
        }),
      )}
    />
  )
}

interface InputProps extends InputPrimitiveProps, React.RefAttributes<HTMLInputElement> {}

const Input = ({ className, ref, ...props }: InputProps) => {
  return (
    <InputPrimitive
      ref={ref}
      {...props}
      className={composeTailwindRenderProps(
        className,
        'text-fg placeholder-muted-fg w-full min-w-0 bg-transparent px-2.5 py-2 text-base outline-hidden data-focused:outline-hidden sm:text-sm/6 [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:hidden',
      )}
    />
  )
}

export type { FieldProps, InputProps, FieldErrorProps }
export { Description, FieldError, FieldGroup, Input, Label }
