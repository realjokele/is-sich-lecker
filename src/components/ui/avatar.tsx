// Changelog
// 2025-03-29: Imported from justd

import { twMerge } from 'tailwind-merge'

interface AvatarProps {
  src?: string | null
  initials?: string
  alt?: string
  className?: string
  shape?: 'square' | 'circle'
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large'
}

const Avatar = ({
  src = null,
  shape = 'circle',
  size = 'medium',
  initials,
  alt = '',
  className,
  ...props
}: AvatarProps & React.ComponentPropsWithoutRef<'span'>) => {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={twMerge(
        'outline-fg/(--ring-opacity) inline-grid shrink-0 align-middle outline-1 -outline-offset-1 [--avatar-radius:20%] [--ring-opacity:20%] *:col-start-1 *:row-start-1',
        size === 'extra-small' && 'size-5 *:size-5',
        size === 'small' && 'size-6 *:size-6',
        size === 'medium' && 'size-8 *:size-8',
        size === 'large' && 'size-10 *:size-10',
        size === 'extra-large' && 'size-12 *:size-12',
        shape === 'square' && 'rounded-(--avatar-radius) *:rounded-(--avatar-radius)',
        shape === 'circle' && 'rounded-full *:rounded-full',
        className
      )}
    >
      {initials && (
        <svg
          className="size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : 'true'}
          aria-label="avatar"
          role="img"
        >
          {alt && <title>{alt}</title>}
          <text x="50%" y="50%" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" dy=".125em">
            {initials}
          </text>
        </svg>
      )}
      {src && <img className="size-full" src={src} alt={alt} />}
    </span>
  )
}

export type { AvatarProps }
export { Avatar }
