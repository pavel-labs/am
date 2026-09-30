import { BadgeVariant } from '@/shared/types'

/**
 * Tags stay monochrome - amber is reserved for state (active, current, hover)
 * and does not become a nine-colour taxonomy of technologies. The variant map
 * is kept so cv.ts keeps compiling without touching content.
 */
const TAG_STYLE =
  'border-rule bg-paper-card/60 text-ink-soft hover:border-accent/60 hover:text-accent'

export const BADGE_VARIANT_STYLES: Record<BadgeVariant, string> = {
  [BadgeVariant.Default]: TAG_STYLE,
  [BadgeVariant.Cyan]: TAG_STYLE,
  [BadgeVariant.Blue]: TAG_STYLE,
  [BadgeVariant.Purple]: TAG_STYLE,
  [BadgeVariant.Green]: TAG_STYLE,
  [BadgeVariant.Pink]: TAG_STYLE,
  [BadgeVariant.Orange]: TAG_STYLE,
  [BadgeVariant.Yellow]: TAG_STYLE,
  [BadgeVariant.Teal]: TAG_STYLE,
}

export const BUTTON_VARIANT_STYLES = {
  primary:
    'border border-accent bg-accent text-accent-on hover:bg-accent-soft hover:border-accent-soft',
  ghost:
    'border border-rule bg-paper-card/60 text-ink hover:border-accent/60 hover:text-accent',
} as const

export type ButtonVariant = keyof typeof BUTTON_VARIANT_STYLES

/** Small mono label used for every meta line on the page. */
export const LABEL_CLASS = 'font-mono text-[11px] tracking-label text-ink-faint'

/** Underlined inline link in mono, used for secondary links across widgets. */
export const INLINE_LINK_CLASS =
  'font-mono text-sm text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent'
