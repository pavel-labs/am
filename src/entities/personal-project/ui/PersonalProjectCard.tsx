import { Badge } from '@/shared/ui'
import { ArrowUpRightIcon } from '@/shared/ui/icons'
import { INLINE_LINK_CLASS, LABEL_CLASS } from '@/shared/ui/constants'
import { cn } from '@/shared/lib/cn'
import { BadgeVariant, ProjectStatus, type PersonalProject } from '@/shared/types'
import { GitHubStats } from './GitHubStats'

export function PersonalProjectCard({ project }: { project: PersonalProject }) {
  const inProgress = project.status === ProjectStatus.InProgress

  return (
    <article className="group border border-rule bg-paper-card/60 transition-colors hover:border-ink-ghost">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
        <span
          className={cn(
            'inline-flex items-center gap-2 font-mono text-[11px]',
            inProgress ? 'text-accent' : 'text-ink-soft',
          )}
        >
          <span
            aria-hidden
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              inProgress ? 'animate-pulse bg-accent motion-reduce:animate-none' : 'bg-ink-soft',
            )}
          />
          {inProgress ? (project.statusLabel ?? 'in progress') : 'live'}
        </span>
        {project.githubRepo && <GitHubStats repo={project.githubRepo} />}
      </div>

      <div className="px-5 py-6 sm:px-6 sm:py-8">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-2 transition-colors hover:text-accent"
        >
          <h3 className="text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
            {project.name}
          </h3>
          <ArrowUpRightIcon className="shrink-0 text-ink-ghost transition-colors group-hover:text-accent" />
        </a>
        <p className="mt-1 font-mono text-[13px] text-ink-faint">{'// '}{project.tagline}</p>

        <p className="mt-4 max-w-measure leading-relaxed text-ink-soft">{project.description}</p>

        {project.arch && (
          <dl className="mt-6 border-t border-rule font-mono text-[12.5px]">
            {project.arch.map((layer) => (
              <div
                key={layer.label}
                className="flex flex-col gap-1 border-b border-rule py-2.5 sm:flex-row sm:gap-4"
              >
                <dt className={cn(LABEL_CLASS, 'w-24 shrink-0 text-ink-soft')}>{layer.label.toLowerCase()}</dt>
                <dd className="leading-relaxed text-ink-faint">{layer.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant={BadgeVariant.Default}>
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className={INLINE_LINK_CLASS}>
            {project.url.replace(/^https?:\/\//, '')}
          </a>

          {project.relatedLinks?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={INLINE_LINK_CLASS}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}
