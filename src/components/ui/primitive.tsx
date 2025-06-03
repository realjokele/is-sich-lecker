import { composeRenderProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tailwind: string
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tailwind, className))
}

const focusRing = tv({
  variants: {
    isFocused: { true: 'ring-ring/70 ring-2 outline-hidden' },
    isFocusVisible: { true: 'ring-ring/70 ring-2 outline-hidden' },
    isInvalid: { true: 'ring-danger/30 ring-2' },
  },
})

const focusStyles = tv({
  extend: focusRing,
  variants: {
    isFocused: { true: 'border-ring/70' },
    isInvalid: { true: 'border-danger/70' },
  },
})

const focusButtonStyles = tv({
  base: 'outline-ring outline outline-offset-2',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2',
    },
  },
})

export { composeTailwindRenderProps, focusRing, focusStyles, focusButtonStyles }
