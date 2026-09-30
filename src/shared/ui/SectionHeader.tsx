import { LABEL_CLASS } from './constants'
import { cn } from '@/shared/lib/cn'

interface SectionHeaderProps {
  title: string
  /** Two-digit section number, e.g. "01". */
  index: string
  /** Optional right-hand note, printed as a code comment. */
  note?: string
}

export function SectionHeader({ title, index, note }: SectionHeaderProps): React.ReactElement {
  const path = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <header className="mb-10 sm:mb-14">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className={cn(LABEL_CLASS, 'tnum text-accent')}>{index}</span>
        <span className={cn(LABEL_CLASS, 'text-ink-soft')}>~/{path}</span>
        <span className="h-px flex-1 bg-rule" />
        {note && <span className={cn(LABEL_CLASS, 'hidden sm:inline')}>{'// '}{note}</span>}
      </div>

      <h2 className="mt-5 text-[2.5rem] font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
        {title}
        <span className="text-accent">.</span>
      </h2>
    </header>
  )
}
