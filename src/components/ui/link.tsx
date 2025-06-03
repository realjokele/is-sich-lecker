// Source:
// https://tanstack.com/router/latest/docs/framework/react/guide/custom-link#react-aria-components-example

import type React from 'react'
import { createLink, type LinkComponent } from '@tanstack/react-router'
import { mergeProps, useFocusRing, useHover, useLink } from 'react-aria'
import type { AriaLinkOptions } from 'react-aria'

import { cn } from '~/utils/tw'
import { focusRing } from './primitive'

interface RACLinkProps extends Omit<AriaLinkOptions, 'href'> {
  children?: React.ReactNode
  className?: string
  ref: React.RefObject<HTMLAnchorElement>
}

const RACLinkComponent = ({ className, ref, ...props }: RACLinkProps) => {
  const { isPressed, linkProps } = useLink(props, ref)
  const { isHovered, hoverProps } = useHover(props)
  const { isFocusVisible, isFocused, focusProps } = useFocusRing(props)

  return (
    <a
      className={cn(
        'text-primary semibold ',
        'has-[[data-slot="icon"]]:flex has-[[data-slot="icon"]]:items-center',
        isFocusVisible && focusRing.variants.isFocusVisible.true,
        className,
      )}
      {...mergeProps(linkProps, hoverProps, focusProps, props)}
      ref={ref}
      data-hovered={isHovered || undefined}
      data-pressed={isPressed || undefined}
      data-focus-visible={isFocusVisible || undefined}
      data-focused={isFocused || undefined}
    />
  )
}

const CreatedLinkComponent = createLink(RACLinkComponent)

export const Link: LinkComponent<typeof RACLinkComponent> = (props) => {
  return <CreatedLinkComponent preload={'intent'} {...props} />
}
