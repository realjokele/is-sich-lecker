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
    <div className={cn('flex gap-2 items-center', className)}>
      <Radio.Root
        id={id}
        ref={ref}
        className={cn(
          'peer flex size-4 items-center justify-center rounded-full border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-primary',
          className,
        )}
        {...props}
      >
        <Radio.Indicator className="flex before:size-2.5 before:rounded-full before:bg-primary data-[unchecked]:hidden" />
      </Radio.Root>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

RadioGroup.Item = RadioGroupItem

export { RadioGroup }
