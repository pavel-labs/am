import { Button } from '@/shared/ui'
import { ArrowDownIcon, ArrowUpRightIcon } from '@/shared/ui/icons'
import { INLINE_LINK_CLASS, LABEL_CLASS } from '@/shared/ui/constants'
import { cn } from '@/shared/lib/cn'
import type { CvData } from '@/shared/types'

function toKey(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

export function Hero({ cv }: { cv: CvData }) {
  const { personal, heroStats } = cv

  // The profile panel reads like a config file: facts as key/value pairs.
  const profile: ReadonlyArray<readonly [string, string]> = [
    ['role', personal.title],
    ['location', personal.location],
    ...heroStats.map((stat) => [toKey(stat.label), stat.value] as const),
  ]

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-start pt-14 sm:justify-center">
      <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <p className={cn(LABEL_CLASS, 'mb-8 flex items-center gap-2 sm:mb-10')}>
          <span className="text-accent">~</span>
          <span className="text-ink-ghost">$</span>
          <span className="text-ink-soft">whoami</span>
        </p>

        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:items-end lg:gap-16">
          <div>
            <h1 className="font-semibold leading-[0.88] tracking-[-0.055em]">
              <span className="block text-[clamp(3rem,12vw,6.25rem)]">{personal.firstName}</span>
              <span className="caret block whitespace-nowrap text-[clamp(3rem,12vw,6.25rem)] text-accent">
                {personal.lastName}
              </span>
            </h1>

            <p className="mt-8 max-w-measure text-lg leading-snug text-ink-soft sm:text-xl">
              <span className="font-mono text-base text-ink-ghost">{'// '}</span>
              {personal.subtitle}
            </p>
          </div>

          <figure className="border border-rule bg-paper-card/70 font-mono text-[13px] backdrop-blur-sm">
            <figcaption className="flex items-center gap-2 border-b border-rule px-4 py-2.5 text-[11px] text-ink-faint">
              <span aria-hidden className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-ink-ghost/60" />
                <span className="h-2 w-2 rounded-full bg-ink-ghost/60" />
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="ml-2">profile.ts</span>
            </figcaption>
            <div className="px-4 py-4 leading-7">
              <p>
                <span className="text-ink-faint">export const </span>
                <span className="text-ink">me</span>
                <span className="text-ink-faint"> = {'{'}</span>
              </p>
              <dl>
                {profile.map(([key, value]) => (
                  <div key={key} className="flex gap-2 pl-4">
                    <dt className="text-ink-soft">{key}:</dt>
                    <dd className="tnum truncate text-accent">&apos;{value}&apos;,</dd>
                  </div>
                ))}
              </dl>
              <p className="text-ink-faint">{'}'}</p>
            </div>
          </figure>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-rule pt-8 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="primary"
              href="/api/cv-download"
              download={personal.cvFileName}
              className="justify-center sm:justify-start"
            >
              <ArrowDownIcon />
              cv.pdf
            </Button>
            <Button
              variant="ghost"
              href={personal.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-center sm:justify-start"
            >
              <ArrowUpRightIcon />
              read online
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className={INLINE_LINK_CLASS}>
              github
            </a>
            <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" className={INLINE_LINK_CLASS}>
              linkedin
            </a>
            <a href={`mailto:${personal.email}`} className={INLINE_LINK_CLASS}>
              email
            </a>
            <span className={cn(LABEL_CLASS, 'hidden text-ink-ghost md:inline')}>
              press <kbd className="text-ink-soft">/</kbd> to search
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
