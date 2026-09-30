import { PERSONAL } from '@/shared/config/cv'
import { NAV_ITEMS } from '@/shared/config/nav'

export interface PalettePost {
  readonly slug: string
  readonly title: string
}

export type CommandAction =
  | { readonly kind: 'navigate'; readonly href: string }
  | { readonly kind: 'external'; readonly href: string }
  | { readonly kind: 'download'; readonly href: string; readonly fileName: string }
  | { readonly kind: 'copy'; readonly value: string; readonly done: string }
  | { readonly kind: 'toggle-theme' }

export interface Command {
  readonly id: string
  readonly group: 'navigate' | 'blog' | 'actions' | 'links'
  readonly label: string
  readonly hint?: string
  readonly action: CommandAction
}

export function buildCommands(posts: readonly PalettePost[]): Command[] {
  const navigate: Command[] = NAV_ITEMS.map((item) => ({
    id: `nav:${item.href}`,
    group: 'navigate',
    label: item.href.includes('#') ? `~/${item.label.toLowerCase()}` : `/${item.label.toLowerCase()}`,
    hint: 'cd',
    action: { kind: 'navigate', href: item.href },
  }))

  const blog: Command[] = posts.map((post) => ({
    id: `post:${post.slug}`,
    group: 'blog',
    label: post.title,
    hint: `${post.slug}.mdx`,
    action: { kind: 'navigate', href: `/blog/${post.slug}` },
  }))

  const actions: Command[] = [
    {
      id: 'cv:download',
      group: 'actions',
      label: 'Download CV',
      hint: 'pdf',
      action: { kind: 'download', href: '/api/cv-download', fileName: PERSONAL.cvFileName },
    },
    {
      id: 'cv:view',
      group: 'actions',
      label: 'Open CV in browser',
      hint: '⌘P',
      action: { kind: 'external', href: PERSONAL.cvPath },
    },
    {
      id: 'copy:email',
      group: 'actions',
      label: 'Copy email',
      hint: PERSONAL.email,
      action: { kind: 'copy', value: PERSONAL.email, done: 'email copied to clipboard' },
    },
    {
      id: 'theme:toggle',
      group: 'actions',
      label: 'Toggle theme',
      hint: 'dark / light',
      action: { kind: 'toggle-theme' },
    },
  ]

  const links: Command[] = [
    {
      id: 'link:github',
      group: 'links',
      label: 'GitHub',
      hint: `github.com/${PERSONAL.github}`,
      action: { kind: 'external', href: PERSONAL.githubUrl },
    },
    {
      id: 'link:linkedin',
      group: 'links',
      label: 'LinkedIn',
      hint: `in/${PERSONAL.linkedin}`,
      action: { kind: 'external', href: PERSONAL.linkedinUrl },
    },
    {
      id: 'link:email',
      group: 'links',
      label: 'Write an email',
      hint: 'mailto',
      action: { kind: 'external', href: `mailto:${PERSONAL.email}` },
    },
  ]

  return [...navigate, ...blog, ...actions, ...links]
}

export function filterCommands(commands: readonly Command[], query: string): Command[] {
  const q = query.trim().toLowerCase()
  if (!q) return [...commands]
  return commands.filter((c) =>
    `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q),
  )
}
