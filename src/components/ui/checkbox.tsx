import { Checkbox as BaseCheckbox, CheckboxGroup as BaseCheckboxGroup, Field } from '@base-ui-components/react'

import { CheckIcon, MinusIcon } from 'lucide-react'
import type * as React from 'react'

import { cn } from '~/utils/cn'

interface CheckboxProps extends React.ComponentProps<typeof BaseCheckbox.Root> {
  label?: string
}

const Checkbox = ({ className, label, ref, ...props }: CheckboxProps) => {
  return (
    <Field.Root className={cn('flex gap-2 items-center', className)}>
      <BaseCheckbox.Root
        ref={ref}
        className={cn(
          'peer flex size-4 shrink-0 items-center justify-center rounded-sm border bg-input outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:text-destructive aria-[invalid=true]:focus:ring-destructive data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground data-[indeterminate]:text-foreground',
          className,
        )}
        {...props}
      >
        <BaseCheckbox.Indicator className="block data-[unchecked]:hidden">
          {props.indeterminate ? <MinusIcon className="size-3" /> : <CheckIcon className="size-3" />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <Field.Label>{label}</Field.Label>
    </Field.Root>
  )
}

const CheckboxGroup = ({ className, ref, ...props }: React.ComponentProps<typeof BaseCheckboxGroup>) => {
  return <BaseCheckboxGroup ref={ref} className={cn('flex flex-col items-start gap-1', className)} {...props} />
}

export { Checkbox, CheckboxGroup }
