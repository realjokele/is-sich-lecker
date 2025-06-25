import { Select as BaseSelect } from '@base-ui-components/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '~/utils/cn'

const Select = <T,>(props: BaseSelect.Root.Props<T>) => <BaseSelect.Root modal={false} {...props} />

const SelectTrigger = ({ children, className, ref, ...props }: React.ComponentProps<typeof BaseSelect.Trigger>) => {
  return (
    <BaseSelect.Trigger
      ref={ref}
      className={cn(
        'inline-flex h-9 min-w-64 w-auto items-center justify-between gap-3 rounded-md border border-gray-200 pr-3 pl-3.5 text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:primary active:bg-gray-100 data-[popup-open]:bg-gray-100',

        className,
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon>
        <ChevronsUpDownIcon className="size-4" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

const SelectValue = ({ className, ref, ...props }: React.ComponentProps<typeof BaseSelect.Value>) => {
  return <BaseSelect.Value ref={ref} className={cn('text-sm', className)} {...props} />
}

interface SelectContentProps extends React.ComponentProps<typeof BaseSelect.Popup> {
  positionerProps?: BaseSelect.Positioner.Props
}

const SelectContent = ({ children, className, positionerProps, ref, ...props }: SelectContentProps) => {
  return (
    <BaseSelect.Positioner
      sideOffset={4}
      {...positionerProps}
      align="start"
      alignItemWithTrigger={false}
      className="w-[var(--anchor-width)] origin-[var(--transform-origin)]"
    >
      <BaseSelect.Popup
        ref={ref}
        className={cn(
          'overflow-y-auto overscroll-contain rounded-md border bg-popover p-1.5 text-sm text-popover-foreground shadow-sm outline-none transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none',
          className,
        )}
        {...props}
      >
        {children}
      </BaseSelect.Popup>
    </BaseSelect.Positioner>
  )
}

const SelectItem = ({ children, className, ref, ...props }: React.ComponentProps<typeof BaseSelect.Item>) => {
  return (
    <BaseSelect.Item
      ref={ref}
      className={cn(
        'flex select-none items-center gap-2 rounded-md px-4 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <div className="size-4">
        <BaseSelect.ItemIndicator>
          <CheckIcon className="size-full" />
        </BaseSelect.ItemIndicator>
      </div>
      <BaseSelect.ItemText className="w-full">{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  )
}

const SelectGroupLabel = ({ className, ref, ...props }: React.ComponentProps<typeof BaseSelect.GroupLabel>) => {
  return (
    <BaseSelect.GroupLabel
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-medium text-muted-foreground', className)}
      {...props}
    />
  )
}

const SelectSeparator = ({ className, ref, ...props }: React.ComponentProps<typeof BaseSelect.Separator>) => {
  return <BaseSelect.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
}

Select.Trigger = SelectTrigger
Select.Content = SelectContent
Select.Item = SelectItem
Select.Value = SelectValue
Select.Group = BaseSelect.Group
Select.GroupLabel = SelectGroupLabel
Select.Separator = SelectSeparator

export { Select }
