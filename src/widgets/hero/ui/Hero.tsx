import { CommandBlock } from '@/shared/ui'
import type { CvData } from '@/shared/types'

function toKey(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
}

export function Hero({ cv }: { cv: CvData }) {
  const { personal, heroStats } = cv

  const profile: ReadonlyArray<readonly [string, string]> = [
    ['role', personal.title],
    ['location', personal.location],
    ...heroStats.map((stat) => [toKey(stat.label), stat.value] as const),
  ]

  return (
    <CommandBlock id="whoami" command="whoami" title="Who I am">
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end lg:gap-14">
        <div>
          <h1 className="font-semibold leading-[0.88] tracking-[-0.055em]">
            <span className="block text-[clamp(2.75rem,11vw,5.75rem)]">{personal.firstName}</span>
            <span className="caret block whitespace-nowrap text-[clamp(2.75rem,11vw,5.75rem)] text-accent">
              {personal.lastName}
            </span>
          </h1>

          <p className="mt-6 inline-flex items-center gap-3 border border-accent/50 bg-accent/10 px-3 py-1.5 font-mono text-base text-accent sm:text-xl">
            <span aria-hidden className="text-accent/60">&gt;</span>
            {personal.title}
          </p>

          <p className="mt-4 max-w-measure text-lg leading-snug text-ink-soft">{personal.subtitle}</p>
        </div>

        <figure className="border border-rule bg-paper-card/70 font-mono text-[13px]">
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
                  <dd className="tnum min-w-0 text-accent">&apos;{value}&apos;,</dd>
                </div>
              ))}
            </dl>
            <p className="text-ink-faint">{'}'}</p>
          </div>
        </figure>
      </div>
    </CommandBlock>
  )
}
