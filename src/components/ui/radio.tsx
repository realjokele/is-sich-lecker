import { Radio } from '@base-ui-components/react/radio'
import { RadioGroup as BaseRadioGroup } from '@base-ui-components/react/radio-group'
import * as React from 'react'

import { cn } from '~/utils/cn'

const RadioGroup = ({ className, ref, ...props }: React.ComponentProps<typeof BaseRadioGroup>) => {
  return <BaseRadioGroup ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
}

const RadioGroupItem = ({ className, ref, ...props }: React.ComponentProps<typeof Radio.Root>) => {
  return (
    <Radio.Root
      ref={ref}
      className={cn(
        'peer flex size-4 items-center justify-center rounded-full border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-primary',
        className,
      )}
      {...props}
    >
      <Radio.Indicator className="flex before:size-2.5 before:rounded-full before:bg-primary data-[unchecked]:hidden" />
    </Radio.Root>
  )
}

RadioGroup.Item = RadioGroupItem

export { RadioGroup }
