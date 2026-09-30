import { cn } from '@/shared/lib/cn'
import type { AnchorHTMLAttributes } from 'react'
import { BUTTON_VARIANT_STYLES, type ButtonVariant } from './constants'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  children: React.ReactNode
}

export function Button({ variant = 'primary', children, className, ...props }: ButtonProps) {
  return (
    <a
      className={cn(
        'group/btn inline-flex items-center gap-2.5 px-4 py-2.5',
        'font-mono text-[13px]',
        'transition-colors duration-150 cursor-pointer select-none',
        BUTTON_VARIANT_STYLES[variant],
        className,
      )}
      {...props}
    >
      <span aria-hidden className="opacity-50">[</span>
      {children}
      <span aria-hidden className="opacity-50">]</span>
    </a>
  )
}
