'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PERSONAL } from '@/shared/config/cv'
import { NAV_ITEMS } from '@/shared/config/nav'
import { cn } from '@/shared/lib/cn'
import { openCommandPalette } from '@/shared/lib/commandPalette'
import { useActiveSection } from '@/shared/lib/useActiveSection'
import { ThemeToggle } from '@/shared/ui/ThemeToggle'

function sectionId(href: string): string | null {
  const [, hash] = href.split('#')
  return hash ?? null
}

function isNavItemActive(href: string, pathname: string, activeSection: string): boolean {
  const id = sectionId(href)
  if (id) return pathname === '/' && activeSection === id
  return pathname === href || pathname.startsWith(`${href}/`)
}

function navPath(label: string, href: string): string {
  const name = label.toLowerCase()
  return href.includes('#') ? `~/${name}` : `/${name}`
}

const SECTION_ITEMS = NAV_ITEMS.filter((item) => item.href.includes('#'))
const PAGE_ITEMS = NAV_ITEMS.filter((item) => !item.href.includes('#'))
const SECTION_IDS = SECTION_ITEMS.map((item) => sectionId(item.href)).filter((id): id is string => id !== null)

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS, pathname === '/')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
          scrolled || mobileOpen
            ? 'border-rule bg-paper/80 backdrop-blur-md'
            : 'border-transparent',
        )}
      >
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-6 px-6 font-mono text-[12px]">
          <Link
            href="/"
            onClick={closeMobile}
            className="group flex shrink-0 items-center gap-1 text-ink transition-colors"
          >
            <span className="text-accent">pavel</span>
            <span className="text-ink-ghost">@</span>
            <span className="group-hover:text-accent">portfolio</span>
            <span className="text-ink-ghost">:~$</span>
          </Link>

          {pathname === '/' && (
            <p className="hidden min-w-0 flex-1 items-center justify-center gap-3 truncate text-[11px] text-ink-faint lg:flex">
              <span>ssh guest@pavel-portfolio</span>
              <span className="text-ink-ghost">—</span>
              <span>zsh</span>
              <span className="text-ink-ghost">—</span>
              <span className="text-ink-soft">best dev on this server</span>
              <span className="text-ink-ghost">·</span>
              <Link href="/blog" className="text-ink transition-colors hover:text-accent">
                /blog
              </Link>
            </p>
          )}

          <nav className={cn('hidden items-center gap-5', pathname !== '/' && 'lg:flex')}>
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(item.href, pathname, activeSection)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative py-1 transition-colors duration-150',
                    isActive
                      ? 'text-accent'
                      : item.href.includes('#')
                        ? 'text-ink-faint hover:text-ink'
                        : 'text-ink hover:text-accent',
                  )}
                >
                  {navPath(item.label, item.href)}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-x-0 -bottom-[17px] h-px bg-accent transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="hidden items-center gap-2 border border-rule bg-paper-card/60 px-2 py-1 text-[11px] text-ink-faint transition-colors hover:border-accent/60 hover:text-accent sm:flex"
            >
              <span>search</span>
              <kbd className="text-ink-soft">⌘K</kbd>
            </button>

            <ThemeToggle className="hidden sm:inline" />

            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="flex h-8 w-8 shrink-0 flex-col items-end justify-center gap-[6px] lg:hidden"
            >
              <span
                className={cn(
                  'block h-px w-6 bg-ink transition-transform duration-300',
                  mobileOpen && 'translate-y-[3.5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-px w-4 bg-accent transition-all duration-300',
                  mobileOpen && 'w-6 -translate-y-[3.5px] -rotate-45',
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          // dvh: Safari's toolbar must not cover the bottom links on short screens
          'fixed inset-x-0 top-0 z-40 flex h-dvh flex-col overflow-y-auto overscroll-contain bg-paper px-6 pt-20 font-mono lg:hidden',
          'pb-[max(2rem,env(safe-area-inset-bottom))] [@media(max-height:700px)]:pt-16',
          'transition-opacity duration-300',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <p className="text-[12px] text-ink-faint">
          <span className="text-accent">$</span> ls -la ~/
        </p>

        <nav className="mt-4 flex flex-col [@media(max-height:700px)]:mt-2">
          {[...SECTION_ITEMS, ...PAGE_ITEMS].map((item, i) => {
            const isActive = isNavItemActive(item.href, pathname, activeSection)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={cn(
                  'flex items-baseline gap-4 border-b border-rule py-3.5 text-2xl transition-colors [@media(max-height:700px)]:py-2.5 [@media(max-height:700px)]:text-xl',
                  isActive ? 'text-accent' : 'text-ink',
                )}
              >
                <span className="tnum w-6 text-[11px] text-ink-ghost">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {navPath(item.label, item.href)}
              </Link>
            )
          })}
        </nav>

        <div className="mt-6 flex items-center gap-4 [@media(max-height:700px)]:mt-4">
          <button
            type="button"
            onClick={() => {
              closeMobile()
              openCommandPalette()
            }}
            className="border border-rule px-3 py-1.5 text-[12px] text-ink-soft"
          >
            &gt; run command
          </button>
          <ThemeToggle />
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-8 text-[13px] text-ink-soft">
          <a href={`mailto:${PERSONAL.email}`} className="transition-colors hover:text-accent">
            {PERSONAL.email}
          </a>
          <a
            href={PERSONAL.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            github.com/{PERSONAL.github}
          </a>
          <a
            href={PERSONAL.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            linkedin.com/in/{PERSONAL.linkedin}
          </a>
        </div>
      </div>
    </>
  )
}
