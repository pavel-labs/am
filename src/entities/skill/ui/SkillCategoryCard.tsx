import { Badge } from '@/shared/ui'
import { LABEL_CLASS } from '@/shared/ui/constants'
import { cn } from '@/shared/lib/cn'
import type { SkillCategory } from '@/shared/types'
import { SKILL_DOC_URLS } from '../constants'

export function SkillCategoryCard({ category }: { category: SkillCategory }) {
  return (
    <div className="grid gap-x-8 gap-y-3 border-b border-rule py-5 sm:grid-cols-[10rem_1fr]">
      <h3 className={cn(LABEL_CLASS, 'pt-1 text-ink-soft')}>
        <span className="text-accent">&quot;</span>
        {category.label.toLowerCase()}
        <span className="text-accent">&quot;</span>
        <span className="text-ink-ghost">:</span>
      </h3>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => {
          const docsUrl = SKILL_DOC_URLS[skill]

          if (!docsUrl) {
            return (
              <Badge key={skill} variant={category.color}>
                {skill}
              </Badge>
            )
          }

          return (
            <a
              key={skill}
              href={docsUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${skill} documentation`}
              title={`Open ${skill} documentation`}
            >
              <Badge variant={category.color} interactive>
                {skill}
              </Badge>
            </a>
          )
        })}
      </div>
    </div>
  )
}
