import { PERSONAL } from '@/shared/config/cv'

/** Styled after an editor status bar: branch, owner, stack, shortcut. */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-rule bg-paper-deep/80 font-mono text-[11px] text-ink-faint">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-4 sm:flex-row">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-ink-soft">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            main
          </span>
          <span className="tnum">
            © {year} {PERSONAL.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>next.js · typescript · utf-8</span>
          <span className="hidden sm:inline">
            <kbd className="text-ink-soft">⌘K</kbd> navigate
          </span>
        </div>
      </div>
    </footer>
  )
}
