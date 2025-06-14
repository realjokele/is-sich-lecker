// Changelog:
// - 2025-03-29: Initial implementation

import { Separator as Divider, type SeparatorProps as DividerProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

interface SeparatorProps extends DividerProps {
  className?: string
}

const Separator = ({ className, ...props }: SeparatorProps) => {
  return (
    <Divider
      {...props}
      className={twMerge(
        'bg-border shrink-0 forced-colors:bg-[ButtonBorder]',
        props.orientation === 'horizontal' ? 'h-px w-full' : 'w-px',
        className
      )}
    />
  )
}

export type { SeparatorProps }
export { Separator }
