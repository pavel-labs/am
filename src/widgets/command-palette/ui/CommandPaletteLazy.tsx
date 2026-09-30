'use client'

import dynamic from 'next/dynamic'

export const CommandPalette = dynamic(
  () => import('./CommandPalette').then((m) => m.CommandPalette),
  { ssr: false },
)
