'use client'

import { useEffect, useState } from 'react'
import { BOOT_LINES, BOOT_STORAGE_KEY } from '../model/boot'

const STEP_MS = 140
const HOLD_MS = 700

function finish() {
  delete document.documentElement.dataset.boot
  try {
    sessionStorage.setItem(BOOT_STORAGE_KEY, '1')
  } catch {
    // storage blocked: the boot may replay, which is harmless
  }
}

export function BootSequence(): React.ReactElement {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!document.documentElement.dataset.boot) return

    const timers = BOOT_LINES.map((_, i) => window.setTimeout(() => setShown(i + 1), i * STEP_MS))
    const done = window.setTimeout(finish, BOOT_LINES.length * STEP_MS + HOLD_MS)
    const skip = () => finish()
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('pointerdown', skip, { once: true })

    return () => {
      timers.forEach(window.clearTimeout)
      window.clearTimeout(done)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [])

  return (
    <div aria-hidden className="boot-overlay fixed inset-0 z-[80] flex-col bg-paper px-6 py-10 font-mono text-[13px] sm:px-10">
      <div className="mx-auto w-full max-w-5xl">
        {BOOT_LINES.slice(0, shown).map((line) => (
          <p key={line} className="whitespace-pre-wrap leading-7 text-ink-soft">
            {line.startsWith('[  OK  ]') ? (
              <>
                [<span className="text-accent">  OK  </span>]{line.slice(8)}
              </>
            ) : (
              line
            )}
          </p>
        ))}
        <span className="caret" />
        <p className="mt-8 text-[11px] text-ink-ghost">press any key to skip</p>
      </div>
    </div>
  )
}
