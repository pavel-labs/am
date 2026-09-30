import type { Education } from '@/shared/types'

export function EducationCard({ edu }: { edu: Education }) {
  return (
    <div className="border-b border-rule py-5">
      <p className="text-lg font-medium leading-snug">{edu.degree}</p>
      <p className="mt-1 font-mono text-[13px] text-accent">{edu.institution}</p>
      <p className="mt-2 font-mono text-[11px] text-ink-faint">
        <span className="tnum">{edu.year}</span>
        <span aria-hidden className="mx-2 text-ink-ghost">/</span>
        {edu.location}
      </p>
    </div>
  )
}
