import { cn } from '@/shared/lib/cn'

export function Prompt({ path = '~', className }: { path?: string; className?: string }) {
  return (
    <span className={cn('shrink-0 select-none font-mono', className)}>
      <span className="text-accent">pavel</span>
      <span className="text-ink-ghost">@</span>
      <span className="text-ink-soft">portfolio</span>
      <span className="text-ink-ghost">:</span>
      <span className="text-ink-soft">{path}</span>
      <span className="text-ink-ghost">$</span>
    </span>
  )
}
