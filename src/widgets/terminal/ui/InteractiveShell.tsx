'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Prompt } from '@/shared/ui/Prompt'
import { complete, runCommand } from '../model/commands'
import type { ShellContext, ShellData } from '../model/types'

interface Entry {
  readonly id: number
  readonly input: string
  readonly output: React.ReactNode
}

const CHIPS = ['help', 'experience', 'projects', 'skills', 'cv', 'contact', 'neofetch'] as const

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
}

function flash(el: HTMLElement) {
  el.classList.remove('block-highlight')
  // reflow restarts the animation when the same block is hit twice
  void el.offsetWidth
  el.classList.add('block-highlight')
}

export function InteractiveShell({ data }: { data: ShellData }): React.ReactElement {
  const router = useRouter()
  const [entries, setEntries] = useState<Entry[]>([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const [hint, setHint] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !isTypingTarget(e.target)) {
        e.preventDefault()
        inputRef.current?.focus({ preventScroll: false })
        inputRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [entries])

  const ctx = useMemo<Omit<ShellContext, 'history'>>(
    () => ({
      data,
      navigate: (href) => router.push(href),
      clear: () => setEntries([]),
      scrollTo: (id) => {
        if (id === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return
        }
        const el = document.getElementById(id)
        if (!el) return
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        flash(el)
      },
    }),
    [data, router],
  )

  const execute = useCallback(
    async (raw: string) => {
      const input = raw.trim()
      setValue('')
      setHint([])
      setCursor(null)
      if (!input) {
        setEntries((e) => [...e, { id: nextId.current++, input: '', output: null }])
        return
      }

      const nextHistory = [...history, input]
      setHistory(nextHistory)
      const output = await runCommand(input, { ...ctx, history: nextHistory })
      if (input.split(/\s+/)[0] === 'clear' || input.split(/\s+/)[0] === 'cls') return
      setEntries((e) => [...e, { id: nextId.current++, input, output }])
    },
    [ctx, history],
  )

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      void execute(value)
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const result = complete(value, data)
      setValue(result.value)
      setHint(result.options)
    } else if (e.key === 'ArrowUp') {
      if (history.length === 0) return
      e.preventDefault()
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setValue(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      if (cursor === null) return
      e.preventDefault()
      const next = cursor + 1
      if (next >= history.length) {
        setCursor(null)
        setValue('')
      } else {
        setCursor(next)
        setValue(history[next] ?? '')
      }
    } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
      e.preventDefault()
      setEntries([])
    } else if (e.key.toLowerCase() === 'c' && e.ctrlKey && !window.getSelection()?.toString()) {
      e.preventDefault()
      setEntries((list) => [...list, { id: nextId.current++, input: `${value}^C`, output: null }])
      setValue('')
    }
  }

  return (
    <section
      id="shell"
      aria-label="Interactive terminal"
      className="border border-rule bg-paper-card/80 font-mono text-[13px] shadow-2xl shadow-black/20 sm:text-sm"
      onClick={(e) => {
        // not on touch: focusing would open the keyboard on every tap
        const target = e.target as HTMLElement
        if (
          window.matchMedia('(pointer: fine)').matches &&
          !window.getSelection()?.toString() &&
          !target.closest('a, button')
        ) {
          inputRef.current?.focus({ preventScroll: true })
        }
      }}
    >
      <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5 text-[11px] text-ink-faint">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-ghost/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-ghost/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="ml-2 truncate">guest@pavel-portfolio: ~</span>
        <span className="ml-auto hidden shrink-0 sm:inline">interactive · try it</span>
      </div>

      <div className="px-4 py-4 sm:px-5">
        <p className="mb-3 text-ink-faint">
          <span className="text-ink-ghost"># </span>
          Type a command or tap one. Or just scroll, the full CV is below.
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => void execute(chip)}
              className="border border-rule bg-paper/60 px-2.5 py-1 text-[12px] text-ink-soft transition-colors hover:border-accent/60 hover:text-accent"
            >
              {chip}
            </button>
          ))}
        </div>

        <div ref={logRef} role="log" aria-live="polite" className="max-h-[45vh] space-y-3 overflow-y-auto overscroll-contain">
          {entries.map((entry) => (
            <div key={entry.id}>
              <p className="flex flex-wrap gap-x-2">
                <Prompt />
                <span className="break-all text-ink">{entry.input}</span>
              </p>
              {entry.output && <div className="mt-1.5 text-ink-soft">{entry.output}</div>}
            </div>
          ))}
        </div>

        <label className={entries.length ? 'mt-3 flex items-center gap-2' : 'flex items-center gap-2'}>
          <Prompt />
          <span className="sr-only">Command</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setHint([])
            }}
            onKeyDown={onKeyDown}
            placeholder="type 'help'"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            enterKeyHint="go"
            className="min-w-0 flex-1 bg-transparent text-ink caret-accent placeholder:text-ink-ghost focus:outline-none focus-visible:outline-none"
          />
        </label>

        {hint.length > 0 && (
          <p className="mt-1.5 flex flex-wrap gap-x-4 text-ink-faint">
            {hint.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </p>
        )}
      </div>
    </section>
  )
}
