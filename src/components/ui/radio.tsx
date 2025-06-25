import { RadioGroup as BaseRadioGroup, Radio } from '@base-ui-components/react'
import * as React from 'react'

import { cn } from '~/utils/cn'

const RadioGroup = ({ className, ref, ...props }: React.ComponentProps<typeof BaseRadioGroup>) => {
  return <BaseRadioGroup ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
}

interface RadioGroupItemProps extends React.ComponentProps<typeof Radio.Root> {
  label?: string
}

const RadioGroupItem = ({ className, id, label, ref, ...props }: RadioGroupItemProps) => {
  const generatedId = React.useId()
  id = id ?? generatedId

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Radio.Root
        id={id}
        ref={ref}
        className={cn(
          'peer focus-visible:ring-ring data-[checked]:border-primary flex size-4 items-center justify-center rounded-full border focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <Radio.Indicator className="before:bg-primary flex before:size-2.5 before:rounded-full data-[unchecked]:hidden" />
      </Radio.Root>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

RadioGroup.Item = RadioGroupItem

export { RadioGroup }
