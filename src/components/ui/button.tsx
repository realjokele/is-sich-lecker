import { mergeProps, useRender } from '@base-ui-components/react'
import { LoaderIcon } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

import { type VariantProps, tv } from 'tailwind-variants'

import { cn } from '~/utils/cn'

export const buttonVariants = tv({
  base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none hover:cursor-pointer focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
      destructive:
        'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs',
      outline:
        'bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
      ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
      link: 'text-primary underline-offset-4 hover:underline',
      icon: 'hover:text-primary',
    },
    size: {
      default: 'h-9 px-4 py-2 has-[>svg]:px-3',
      sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
      lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
      icon: 'size-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

type ButtonVariantProps = VariantProps<typeof buttonVariants>
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    className?: string
    render?: useRender.RenderProp
    /** Shows a loading spinner and disables the button */
    pending?: boolean
    preIcon?: React.ReactNode
  }

export function Button(props: ButtonProps) {
  const {
    className,
    children,
    variant,
    size,
    pending,
    preIcon,
    render = <button />,
    ...otherProps
  } = props

  const buttonClassName = cn(buttonVariants({ variant, size }), className)

  const buttonContent = (
    <span className="flex items-center gap-2">
      {pending && (
        <>
          <LoaderIcon className="animate-spin" />
          <span className="sr-only">Loading...</span>
        </>
      )}
      {preIcon && !pending && preIcon}
      {children}
    </span>
  )

  const defaultProps: useRender.ElementProps<'button'> = {
    className: buttonClassName,
    type: 'button',
    children: buttonContent,
    disabled: pending,
  }

  return useRender({
    render,
    props: mergeProps<'button'>(defaultProps, otherProps),
  })
}
