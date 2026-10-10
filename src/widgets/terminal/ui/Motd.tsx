import { Button } from '@/shared/ui'
import { ArrowDownIcon, ArrowUpRightIcon } from '@/shared/ui/icons'
import { INLINE_LINK_CLASS } from '@/shared/ui/constants'
import { headlineStack } from '@/shared/lib/headlineStack'
import type { CvData } from '@/shared/types'

function loginStamp(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Warsaw',
  })
}

const DT = 'w-[8.5rem] shrink-0 text-ink-faint sm:w-36'

export function Motd({ cv }: { cv: CvData }): React.ReactElement {
  const { personal, heroStats } = cv
  const english = heroStats.find((s) => /english/i.test(s.label))?.value

  const facts: Array<[string, string]> = [
    ['Experience', `${personal.yearsOfExperience}+ years building web & mobile apps`],
    ['Primary stack', headlineStack(cv).join(', ')],
    ['Location', personal.location],
    ...(english ? [['English', english] as [string, string]] : []),
  ]

  return (
    <header id="top" className="pb-6 pt-20 font-mono text-[12px] sm:pt-28 sm:text-sm">
      <p className="text-ink-faint">
        <span className="text-ink-ghost">$</span> ssh guest@pavel-portfolio
      </p>
      <p className="mt-2 text-ink sm:mt-3">
        Welcome to <span className="text-accent">pavel-os 26.04 LTS</span>{' '}
        <span className="hidden text-ink-faint sm:inline">(GNU/Linux · Next.js · x86_64)</span>
      </p>

      <dl className="mt-4 space-y-1 sm:mt-5">
        <div className="flex gap-3">
          <dt className={DT}>
            <span className="text-accent">*</span> Who:
          </dt>
          <dd className="min-w-0">
            <h1 className="font-medium text-ink">{personal.name}</h1>
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className={DT}>
            <span className="text-accent">*</span> Role:
          </dt>
          <dd className="min-w-0 font-medium text-accent">{personal.title}</dd>
        </div>
        {facts.map(([label, value]) => (
          <div key={label} className="flex gap-3">
            <dt className={DT}>
              <span className="text-accent">*</span> {label}:
            </dt>
            <dd className="min-w-0 text-ink-soft">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:flex sm:gap-3">
        <Button
          variant="primary"
          href="/api/cv-download"
          download={personal.cvFileName}
          className="justify-center gap-2 whitespace-nowrap px-3 sm:justify-start sm:gap-2.5 sm:px-4"
        >
          <ArrowDownIcon />
          download CV
        </Button>
        <Button
          variant="ghost"
          href={personal.cvPath}
          target="_blank"
          rel="noopener noreferrer"
          className="justify-center gap-2 whitespace-nowrap px-3 sm:justify-start sm:gap-2.5 sm:px-4"
        >
          <ArrowUpRightIcon />
          read online
        </Button>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className={INLINE_LINK_CLASS}>
          github
        </a>
        <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" className={INLINE_LINK_CLASS}>
          linkedin
        </a>
        <a href={`mailto:${personal.email}`} className={INLINE_LINK_CLASS}>
          email
        </a>
      </p>

      <p className="mt-4 text-ink-ghost sm:mt-6">
        Last login: {loginStamp(new Date())}
        <span className="hidden sm:inline"> from your-browser</span>
      </p>
    </header>
  )
}
