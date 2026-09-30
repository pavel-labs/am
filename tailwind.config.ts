import type { Config } from 'tailwindcss'

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: [
    './src/*.{ts,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.mdx',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        paper: {
          DEFAULT: token('paper'),
          deep: token('paper-deep'),
          card: token('paper-card'),
        },
        ink: {
          DEFAULT: token('ink'),
          soft: token('ink-soft'),
          faint: token('ink-faint'),
          ghost: token('ink-ghost'),
        },
        rule: {
          DEFAULT: token('rule'),
          soft: token('rule-soft'),
        },
        accent: {
          DEFAULT: token('accent'),
          soft: token('accent-soft'),
          on: token('on-accent'),
        },
      },
      letterSpacing: {
        label: '0.08em',
      },
      maxWidth: {
        measure: '64ch',
      },
    },
  },
  plugins: [],
}

export default config
