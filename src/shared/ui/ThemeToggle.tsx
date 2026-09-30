'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/cn'
import { getTheme, toggleTheme, THEME_CHANGE_EVENT, type Theme } from '@/shared/lib/theme'

export function ThemeToggle({ className }: { className?: string }): React.ReactElement {
  // Rendered as "dark" on the server; corrected after mount from <html data-theme>.
  const [theme, setThemeState] = useState<Theme>('dark')

  useEffect(() => {
    setThemeState(getTheme())
    const onChange = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail)
    window.addEventListener(THEME_CHANGE_EVENT, onChange)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange)
  }, [])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={cn(
        'font-mono text-[11px] text-ink-faint transition-colors hover:text-accent',
        className,
      )}
    >
      <span aria-hidden className="text-ink-ghost">[</span>
      {theme === 'dark' ? '◐ dark' : '◑ light'}
      <span aria-hidden className="text-ink-ghost">]</span>
    </button>
  )
}
