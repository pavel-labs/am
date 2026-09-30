import type { Project } from '@/shared/types'

export function ProjectCard({ project }: { project: Project }): React.ReactElement {
  return (
    <div className="border border-rule bg-paper-card/50 px-4 py-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
        <h4 className="text-base font-medium">{project.name}</h4>
        <span className="font-mono text-[11px] text-ink-faint">{project.tech}</span>
      </div>
      <ul className="mt-3 space-y-1.5 font-mono text-[12.5px] leading-relaxed text-ink-faint">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden className="shrink-0 text-ink-ghost">
              {i === project.highlights.length - 1 ? '└─' : '├─'}
            </span>
            <span className="font-sans text-sm">{h}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
