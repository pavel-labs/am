'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/shared/lib/cn'
import { useActiveSection } from '@/shared/lib/useActiveSection'

const WINDOWS = [
  { id: 'shell', label: 'shell' },
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'work' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'education', label: 'edu' },
  { id: 'blog', label: 'blog' },
  { id: 'contact', label: 'contact' },
] as const

const IDS = WINDOWS.map((w) => w.id)

function useClock(): string {
  // empty until mount to avoid a hydration mismatch
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

export function StatusBar({ years }: { years: number }): React.ReactElement {
  const active = useActiveSection(IDS)
  const time = useClock()

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper-deep/95 font-mono text-[11px] backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex h-8 max-w-5xl items-stretch">
        <span className="flex shrink-0 items-center bg-accent px-3 font-medium text-accent-on">[pavel]</span>

        <ol className="flex min-w-0 flex-1 items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {WINDOWS.map((w, i) => {
            const isActive = active === w.id
            return (
              <li key={w.id} className="flex">
                <a
                  href={`#${w.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex items-center whitespace-nowrap px-2.5 transition-colors',
                    isActive ? 'bg-rule text-accent' : 'text-ink-faint hover:text-ink',
                  )}
                >
                  <span className="tnum">{i}</span>
                  <span className="max-[400px]:hidden">:{w.label}</span>
                  {isActive && <span aria-hidden>*</span>}
                </a>
              </li>
            )
          })}
        </ol>

        <span className="hidden shrink-0 items-center gap-3 border-l border-rule px-3 text-ink-faint sm:flex">
          <span>uptime {years}y+</span>
          <span className="tnum min-w-[2.5rem] text-ink-soft">{time}</span>
        </span>
      </div>
    </nav>
  )
}
