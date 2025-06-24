import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox'
import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui-components/react/checkbox-group'

import { CheckIcon, MinusIcon } from 'lucide-react'
import type * as React from 'react'

import { cn } from '~/utils/cn'

const Checkbox = ({ className, ref, ...props }: React.ComponentProps<typeof BaseCheckbox.Root>) => {
  return (
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
  )
}

const CheckboxGroup = ({ className, ref, ...props }: React.ComponentProps<typeof BaseCheckboxGroup>) => {
  return <BaseCheckboxGroup ref={ref} className={cn('flex flex-col items-start gap-1', className)} {...props} />
}

export { Checkbox, CheckboxGroup }
