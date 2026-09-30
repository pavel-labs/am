import { cn } from '@/shared/lib/cn'
import { Prompt } from './Prompt'

interface CommandBlockProps {
  id?: string
  command: string
  title: string
  note?: string
  className?: string
  children: React.ReactNode
}

export function CommandBlock({ id, command, title, note, className, children }: CommandBlockProps) {
  return (
    <section id={id} className={cn('py-8 sm:py-10', className)}>
      <h2 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[13px] sm:text-sm">
        <Prompt />
        <span data-typewriter className="text-ink">{command}</span>
        <span className="text-ink-ghost">
          {'# '}
          <span className="text-ink-faint">{title}</span>
        </span>
        {note && <span className="ml-auto hidden text-[11px] text-ink-ghost sm:inline">{`// ${note}`}</span>}
      </h2>

      <div className="mt-6 border-l border-rule pl-4 sm:mt-8 sm:pl-8">{children}</div>
    </section>
  )
}
