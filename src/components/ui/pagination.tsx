// Changelog:
import type { ListBoxItemProps, ListBoxProps, ListBoxSectionProps } from 'react-aria-components'
import { ListBox, ListBoxItem, ListBoxSection, Separator } from 'react-aria-components'

import { composeTailwindRenderProps } from '~/components/ui/primitive'
import { twMerge } from 'tailwind-merge'
import { buttonStyles } from './button'
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react'

type PaginationProps = React.ComponentProps<'nav'>
const Pagination = ({ className, ref, ...props }: PaginationProps) => (
  <nav
    aria-label="pagination"
    ref={ref}
    className={twMerge('mx-auto flex w-full justify-center gap-[5px]', className)}
    {...props}
  />
)

interface PaginationSectionProps<T> extends ListBoxSectionProps<T> {
  ref?: React.RefObject<HTMLElement>
}
const PaginationSection = <T extends object>({ className, ref, ...props }: PaginationSectionProps<T>) => (
  <ListBoxSection ref={ref} {...props} className={twMerge('flex h-9 gap-[5px]', className)} />
)

interface PaginationListProps<T> extends ListBoxProps<T> {
  ref?: React.RefObject<HTMLDivElement>
}
const PaginationList = <T extends object>({ className, ref, ...props }: PaginationListProps<T>) => {
  return (
    <ListBox
      ref={ref}
      orientation="horizontal"
      aria-label={props['aria-label'] || 'Pagination'}
      layout="grid"
      className={composeTailwindRenderProps(className, 'flex flex-row items-center gap-[5px]')}
      {...props}
    />
  )
}

const renderListItem = (
  props: ListBoxItemProps & {
    textValue?: string
    'aria-current'?: string | undefined
    isDisabled?: boolean
    className?: string
  },
  children: React.ReactNode,
) => <ListBoxItem {...props}>{children}</ListBoxItem>

interface PaginationItemProps extends ListBoxItemProps {
  children?: React.ReactNode
  className?: string
  intent?: 'primary' | 'secondary' | 'outline' | 'plain'
  size?: 'medium' | 'large' | 'square-petite' | 'extra-small' | 'small'
  shape?: 'square' | 'circle'
  isCurrent?: boolean
  segment?: 'label' | 'separator' | 'ellipsis' | 'default' | 'last' | 'first' | 'previous' | 'next'
}

const PaginationItem = ({
  segment = 'default',
  size = 'small',
  intent = 'outline',
  className,
  isCurrent,
  children,
  ...props
}: PaginationItemProps) => {
  const textValue =
    typeof children === 'string' ? children : typeof children === 'number' ? children.toString() : undefined

  const renderPaginationIndicator = (indicator: React.ReactNode) =>
    renderListItem(
      {
        textValue: segment,
        'aria-current': isCurrent ? 'page' : undefined,
        isDisabled: isCurrent,
        className: buttonStyles({
          intent: 'outline',
          size: 'small',
          className: twMerge(
            'cursor-pointer font-normal text-fg focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:ring-4 focus-visible:ring-primary/20',
            className,
          ),
        }),
        ...props,
      },
      indicator,
    )

  switch (segment) {
    case 'label':
      return renderListItem(
        {
          textValue: textValue,
          className: twMerge('grid h-9 place-content-center px-3.5 tabular-nums', className),
          ...props,
        },
        children,
      )
    case 'separator':
      return renderListItem(
        {
          textValue: 'Separator',
          className: twMerge('grid h-9 place-content-center', className),
          ...props,
        },
        <Separator orientation="vertical" className="bg-secondary-fg/40 h-5 w-[1.5px] shrink-0 rotate-[14deg]" />,
      )
    case 'ellipsis':
      return renderListItem(
        {
          textValue: 'More pages',
          className: twMerge(
            'flex size-9 items-center justify-center rounded-lg border border-transparent focus:outline-hidden focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:ring-4 focus-visible:ring-primary/20',
            className,
          ),
          ...props,
        },
        <span aria-hidden className={twMerge('flex size-9 items-center justify-center', className)}>
          <EllipsisIcon />
        </span>,
      )
    case 'previous':
      return renderPaginationIndicator(<ChevronLeftIcon />)
    case 'next':
      return renderPaginationIndicator(<ChevronRightIcon />)
    case 'first':
      return renderPaginationIndicator(<ChevronFirstIcon />)
    case 'last':
      return renderPaginationIndicator(<ChevronLastIcon />)
    default:
      return renderListItem(
        {
          textValue: textValue,
          'aria-current': isCurrent ? 'page' : undefined,
          isDisabled: isCurrent,
          className: buttonStyles({
            intent: isCurrent ? 'primary' : intent,
            size,
            className: twMerge(
              'cursor-pointer font-normal tabular-nums disabled:cursor-default disabled:opacity-100 focus-visible:border-primary focus-visible:bg-primary/10 focus-visible:ring-4 focus-visible:ring-primary/20',
              className,
            ),
          }),
          ...props,
        },
        children,
      )
  }
}

Pagination.Item = PaginationItem
Pagination.List = PaginationList
Pagination.Section = PaginationSection

export type { PaginationProps, PaginationListProps, PaginationSectionProps, PaginationItemProps }
export { Pagination }
