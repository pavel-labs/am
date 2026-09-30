'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/shared/lib/cn'
import { OPEN_COMMAND_PALETTE_EVENT } from '@/shared/lib/commandPalette'
import { toggleTheme } from '@/shared/lib/theme'
import { buildCommands, filterCommands, type Command, type PalettePost } from '../model/commands'

const GROUP_LABELS: Record<Command['group'], string> = {
  navigate: 'navigate',
  blog: 'blog',
  actions: 'actions',
  links: 'links',
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

export function CommandPalette({ posts }: { posts: readonly PalettePost[] }): React.ReactElement | null {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const commands = useMemo(() => buildCommands(posts), [posts])
  const results = useMemo(() => filterCommands(commands, query), [commands, query])

  const show = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null
    setQuery('')
    setActive(0)
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    returnFocusRef.current?.focus?.()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (open) close()
        else show()
        return
      }
      if (!open && e.key === '/' && !isTypingTarget(e.target)) {
        e.preventDefault()
        show()
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, show)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, show)
    }
  }, [open, show, close])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(id)
  }, [toast])

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const run = useCallback(
    async (command: Command) => {
      const { action } = command
      close()

      switch (action.kind) {
        case 'navigate':
          router.push(action.href)
          break
        case 'external':
          window.open(action.href, action.href.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer')
          break
        case 'download': {
          const a = document.createElement('a')
          a.href = action.href
          a.download = action.fileName
          a.click()
          break
        }
        case 'copy':
          try {
            await navigator.clipboard.writeText(action.value)
            setToast(action.done)
          } catch {
            setToast('clipboard unavailable')
          }
          break
        case 'toggle-theme':
          toggleTheme()
          break
      }
    },
    [close, router],
  )

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const command = results[active]
      if (command) void run(command)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'Tab') {
      // The input is the only focus stop inside the dialog.
      e.preventDefault()
    }
  }

  return (
    <>
      {toast && (
        <div
          role="status"
          className="fixed bottom-12 left-1/2 z-[70] -translate-x-1/2 border border-accent/40 bg-paper-card px-4 py-2 font-mono text-xs text-ink shadow-lg"
        >
          <span className="text-accent">✓</span> {toast}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-paper/70 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="palette-in w-full max-w-xl overflow-hidden border border-rule bg-paper-card font-mono shadow-2xl shadow-black/40"
          >
            <div className="flex items-center gap-3 border-b border-rule px-4">
              <span aria-hidden className="text-accent">&gt;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onInputKey}
                placeholder="type a command or search…"
                aria-label="Search commands"
                aria-controls="command-palette-list"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                role="combobox"
                aria-expanded="true"
                spellCheck={false}
                autoComplete="off"
                className="h-12 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-ghost focus:outline-none focus-visible:outline-none"
              />
              <kbd className="border border-rule px-1.5 py-0.5 text-[10px] text-ink-faint">esc</kbd>
            </div>

            <ul
              ref={listRef}
              id="command-palette-list"
              role="listbox"
              className="max-h-[50vh] overflow-y-auto py-2"
            >
              {results.length === 0 && (
                <li className="px-4 py-6 text-sm text-ink-faint">
                  command not found: <span className="text-ink">{query}</span>
                </li>
              )}

              {results.map((command, i) => {
                const showGroup = results[i - 1]?.group !== command.group
                return (
                  <li key={command.id} role="presentation">
                    {showGroup && (
                      <p className="px-4 pb-1 pt-3 text-[10px] uppercase tracking-label text-ink-ghost">
                        {GROUP_LABELS[command.group]}
                      </p>
                    )}
                    <div
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={i === active}
                      data-index={i}
                      onMouseMove={() => setActive(i)}
                      onClick={() => void run(command)}
                      className={cn(
                        'mx-2 flex cursor-pointer items-center justify-between gap-4 px-3 py-2 text-sm',
                        i === active ? 'bg-accent/10 text-accent' : 'text-ink-soft',
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span aria-hidden className={cn('w-3', i === active ? 'text-accent' : 'text-transparent')}>
                          ›
                        </span>
                        <span className="truncate">{command.label}</span>
                      </span>
                      {command.hint && (
                        <span className="shrink-0 truncate text-[11px] text-ink-ghost">{command.hint}</span>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-rule px-4 py-2 text-[10px] text-ink-ghost">
              <span><kbd className="text-ink-faint">↑↓</kbd> move</span>
              <span><kbd className="text-ink-faint">↵</kbd> run</span>
              <span className="ml-auto"><kbd className="text-ink-faint">⌘K</kbd> toggle</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
