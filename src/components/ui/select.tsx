import { Select as BaseSelect } from '@base-ui-components/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '~/utils/cn'

const Select = <T,>(props: BaseSelect.Root.Props<T>) => <BaseSelect.Root modal={false} {...props} />

const SelectTrigger = ({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<typeof BaseSelect.Trigger>) => {
  return (
    <BaseSelect.Trigger
      ref={ref}
      className={cn(
        'focus-visible:primary inline-flex h-9 w-auto min-w-64 items-center justify-between gap-3 rounded-md border border-gray-200 pr-3 pl-3.5 text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 active:bg-gray-100 data-[popup-open]:bg-gray-100',
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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

const SelectValue = ({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof BaseSelect.Value>) => {
  return <BaseSelect.Value ref={ref} className={cn('text-sm', className)} {...props} />
}

interface SelectContentProps extends React.ComponentProps<typeof BaseSelect.Popup> {
  positionerProps?: BaseSelect.Positioner.Props
}

const SelectContent = ({
  children,
  className,
  positionerProps,
  ref,
  ...props
}: SelectContentProps) => {
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
          'bg-popover text-popover-foreground overflow-y-auto overscroll-contain rounded-md border p-1.5 text-sm shadow-sm transition-[transform,scale,opacity] outline-none data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 dark:shadow-none',
          className,
        )}
        {...props}
      >
        {children}
      </BaseSelect.Popup>
    </BaseSelect.Positioner>
  )
}

const SelectItem = ({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<typeof BaseSelect.Item>) => {
  return (
    <BaseSelect.Item
      ref={ref}
      className={cn(
        'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground flex items-center gap-2 rounded-md px-4 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
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

const SelectGroupLabel = ({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof BaseSelect.GroupLabel>) => {
  return (
    <BaseSelect.GroupLabel
      ref={ref}
      className={cn('text-muted-foreground px-2 py-1.5 text-sm font-medium', className)}
      {...props}
    />
  )
}

const SelectSeparator = ({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof BaseSelect.Separator>) => {
  return (
    <BaseSelect.Separator
      ref={ref}
      className={cn('bg-muted -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

Select.Trigger = SelectTrigger
Select.Content = SelectContent
Select.Item = SelectItem
Select.Value = SelectValue
Select.Group = BaseSelect.Group
Select.GroupLabel = SelectGroupLabel
Select.Separator = SelectSeparator

export { Select }
