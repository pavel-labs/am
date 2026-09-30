import { Button } from '@/shared/ui'
import { ArrowDownIcon, ArrowUpRightIcon } from '@/shared/ui/icons'
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

export function Motd({ cv }: { cv: CvData }): React.ReactElement {
  const { personal } = cv
  const stack = headlineStack(cv).join(', ')

  const facts: Array<[string, string, string?]> = [
    ['Who', personal.name, 'text-ink'],
    ['Role', personal.title, 'font-medium text-accent'],
    ['Experience', `${personal.yearsOfExperience}+ years building web & mobile apps`],
    ['Stack', stack],
    ['Location', personal.location],
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
        {facts.map(([label, value, tone = 'text-ink-soft']) => (
          <div key={label} className="flex gap-3">
            <dt className="w-24 shrink-0 text-ink-faint sm:w-28">
              <span className="text-accent">*</span> {label}:
            </dt>
            <dd className={`min-w-0 ${tone}`}>{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-6 sm:flex sm:gap-3">
        <Button
          variant="primary"
          href="/api/cv-download"
          download={personal.cvFileName}
          className="col-span-2 justify-center sm:justify-start"
        >
          <ArrowDownIcon />
          download CV
        </Button>
        <Button variant="ghost" href={`mailto:${personal.email}`} className="justify-center sm:justify-start">
          email me
        </Button>
        <Button
          variant="ghost"
          href={personal.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="justify-center sm:justify-start"
        >
          <ArrowUpRightIcon />
          linkedin
        </Button>
      </div>

      <p className="mt-4 text-ink-ghost sm:mt-6">Last login: {loginStamp(new Date())}<span className="hidden sm:inline"> from your-browser</span></p>
    </header>
  )
}
