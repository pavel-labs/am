'use client'

import dynamic from 'next/dynamic'

/** The palette is keyboard-only chrome - it has nothing to server-render. */
export const CommandPalette = dynamic(
  () => import('./CommandPalette').then((m) => m.CommandPalette),
  { ssr: false },
)
