import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonStyles = tv({
  base: [
    'font-medium outline-0 outline-offset-2 focus-visible:outline-2',
    // Colors and backgrounds
    'inset-ring-(--inset-ring) inset-ring-1 pressed:bg-(--btn-overlay) bg-(--btn-bg) text-(--btn-fg)',
    'transition-all duration-200',
    // Flex layout
    'relative isolate inline-flex items-center justify-center gap-x-2',
    // Dark mode
    'dark:inset-ring-fg/15 dark:shadow-none',
    // Icon styles
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60 *:data-[slot=icon]:transition hovered:*:data-[slot=icon]:text-current/90 pressed:*:data-[slot=icon]:text-current',
    // Avatar styles
    '*:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:my-1 *:data-[slot=avatar]:*:size-4 *:data-[slot=avatar]:size-4 *:data-[slot=avatar]:shrink-0',
  ],
  variants: {
    intent: {
      primary: [
        'outline-primary [--btn-bg:theme(--color-primary)] inset-ring-0 [--btn-fg:var(--color-primary-fg)] [--btn-overlay:theme(--color-primary/92%)]',
      ],
      secondary: [
        'outline-primary [--btn-bg:theme(--color-button-secondary)] [--btn-fg:var(--color-button-secondary-fg)] [--btn-overlay:theme(--color-button-secondary/90%)]',
        '[--inset-ring:theme(--color-button-secondary)] [--btn-hovered-bg:theme(--color-button-secondary-fg/4%)]',
      ],
      warning: [
        'outline-warning [--btn-bg:theme(--color-warning)] [--btn-fg:var(--color-warning-fg)] [--btn-overlay:theme(--color-warning/85%)]',
      ],
      'secondary-warning': [
        'outline-primary [--btn-bg:theme(--color-button-warning-secondary)] [--btn-fg:var(--color-button-warning-secondary-fg)] [--btn-overlay:theme(--color-button-warning-secondary/90%)]',
        '[--inset-ring:theme(--color-button-warning-secondary-fg)] [--btn-hovered-bg:theme(--color-button-warning-secondary-fg/4%)]',
      ],
      danger: [
        'outline-danger [--btn-bg:theme(--color-danger)] [--btn-fg:var(--color-danger-fg)] [--btn-overlay:theme(--color-danger/80%)]',
      ],
      'secondary-danger': [
        'outline-primary [--btn-bg:theme(--color-button-danger-secondary)] [--btn-fg:var(--color-button-danger-secondary-fg)] [--btn-overlay:theme(--color-button-danger-secondary/90%)]',
        '[--inset-ring:theme(--color-button-danger-secondary)] [--btn-hovered-bg:theme(--color-button-danger-secondary/70%)]',
      ],
      outline: [
        'outline-primary hovered:ring-primary/20 shadow-none [--btn-fg:var(--color-fg)] [--inset-ring:theme(--color-fg/20%)] ',
      ],
      plain: [
        'outline-primary [--btn-overlay:theme(--color-secondary/90%)] shadow-none inset-ring-transparent [--btn-fg:var(--color-fg)] dark:inset-ring-transparent',
      ],
    },
    size: {
      'extra-small':
        'h-8 px-[calc(var(--spacing)*2.7)] text-xs/4 **:data-[slot=avatar]:size-3.5 **:data-[slot=avatar]:*:size-3.5 **:data-[slot=icon]:size-3 lg:text-[0.800rem]/4',
      small: 'h-9 px-3.5 text-sm/5 sm:text-sm/5',
      medium: 'h-10 px-4 text-base sm:text-sm/6',
      large: 'h-11 px-4.5 text-base *:data-[slot=icon]:mx-[-1.5px] sm:*:data-[slot=icon]:size-5 lg:text-base/7',
      'square-petite': 'size-9 shrink-0',
    },
    shape: {
      square: 'rounded-lg',
      circle: 'rounded-full',
    },
    isDisabled: {
      false: 'cursor-pointer',
      true: 'cursor-default border-0 opacity-50 ring-0 inset-shadow-none dark:inset-ring-0',
    },
    isPending: {
      true: 'cursor-default opacity-50',
    },
    isHovered: {
      false: '',
      true: 'hover:no-underline',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    shape: 'square',
  },
  compoundVariants: [
    {
      intent: ['primary', 'warning', 'danger'],
      isHovered: true,
      className: 'bg-(--btn-overlay)',
    },
    {
      intent: 'secondary',
      isHovered: true,
      className: 'inset-ring-(--color-button-secondary-fg)/85  bg-(--btn-hovered-bg)',
    },
    {
      intent: ['secondary-warning', 'secondary-danger'],
      isHovered: true,
      className: 'inset-ring-(--color-button-warning-secondary-fg)/75  bg-(--btn-hovered-bg)',
    },
  ],
})

interface ButtonProps extends ButtonPrimitiveProps, VariantProps<typeof buttonStyles> {
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({ className, intent, size, shape, ref, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          size,
          shape,
          className,
        }),
      )}
    >
      {/* @ts-ignore  We intentionally want to keep the flexibility of allowing any component as children */}
      {(values) => <>{typeof props.children === 'function' ? props.children(values) : props.children}</>}
    </ButtonPrimitive>
  )
}

export type { ButtonProps }
export { Button, buttonStyles }
