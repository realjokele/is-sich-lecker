// Changelog:
// - 2025-03-29: Initial implementation

import { Keyboard as KeyboardPrimitive } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

interface KeyboardProps extends React.HTMLAttributes<HTMLElement> {
  keys: string | string[]
  classNames?: {
    base?: string
    kbd?: string
  }
}

const Keyboard = ({ keys, classNames, className, ...props }: KeyboardProps) => {
  return (
    <KeyboardPrimitive
      className={twMerge(
        'group-hover:text-fg group-focus:text-fg hidden text-current/70 group-focus:opacity-90 group-disabled:opacity-50 lg:inline-flex',
        classNames?.base
      )}
      {...props}
    >
      {(Array.isArray(keys) ? keys : keys.split('')).map((char, index) => (
        <kbd
          key={index}
          className={twMerge(
            'group-hover:text-fg group-focus:text-fg hidden text-current/70 group-focus:opacity-90 group-disabled:opacity-50 lg:inline-flex',
            index > 0 && char.length > 1 && 'pl-1',
            classNames?.kbd
          )}
        >
          {char}
        </kbd>
      ))}
    </KeyboardPrimitive>
  )
}

export type { KeyboardProps }
export { Keyboard }
