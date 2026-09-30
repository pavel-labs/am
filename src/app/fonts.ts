import { Geist, JetBrains_Mono } from 'next/font/google'

export const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
