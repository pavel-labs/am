import { cn } from '@/shared/lib/cn'
import { LABEL_CLASS } from '@/shared/ui/constants'
import type { Job } from '@/shared/types'
import { ProjectCard } from './ProjectCard'

export function JobCard({ job }: { job: Job }): React.ReactElement {
  return (
    <li className="relative pb-12 pl-6 last:pb-2 sm:pl-10">
      {/* Commit node on the rail */}
      <span
        aria-hidden
        className={cn(
          'absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full border',
          job.current
            ? 'border-accent bg-accent shadow-[0_0_0_4px_rgb(var(--accent)/0.15)]'
            : 'border-ink-ghost bg-paper',
        )}
      />

      {/* Dates hang in the left margin on wide screens, above the title on narrow ones */}
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 sm:absolute sm:-left-[9.5rem] sm:top-0 sm:mb-0 sm:w-32 sm:flex-col sm:items-start">
        <span className={cn(LABEL_CLASS, 'tnum text-ink')}>{job.period}</span>
        <span className={LABEL_CLASS}>{job.location}</span>
        {job.current && (
          <span className="border border-accent/50 px-1.5 py-0.5 font-mono text-[10px] text-accent">
            HEAD → current
          </span>
        )}
      </div>

      <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl">
        {job.title}
      </h3>
      <p className="mt-1 font-mono text-[13px] text-accent">@{job.company}</p>

      {job.summary && (
        <p className="mt-4 max-w-measure text-lg leading-snug text-ink-soft">{job.summary}</p>
      )}

      <ul className="mt-5 max-w-measure space-y-2.5">
        {job.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
            <span aria-hidden className="mt-[3px] font-mono text-xs text-ink-ghost">+</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {job.projects && (
        <div className="mt-7">
          <p className={cn(LABEL_CLASS, 'mb-3')}>./projects</p>
          <div className="space-y-3">
            {job.projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      )}
    </li>
  )
}
