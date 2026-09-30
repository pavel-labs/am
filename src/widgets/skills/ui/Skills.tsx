import { CommandBlock } from '@/shared/ui'
import { SkillCategoryCard } from '@/entities/skill'
import type { CvData } from '@/shared/types'

export function Skills({ cv }: { cv: CvData }): React.ReactElement {
  return (
    <CommandBlock id="skills" command="cat stack.json" title="Skills & tech stack">
      <p className="font-mono text-[13px] text-ink-faint">{'{'}</p>
      <div className="pl-4">
        {cv.skillCategories.map((category) => (
          <SkillCategoryCard key={category.label} category={category} />
        ))}
      </div>
      <p className="font-mono text-[13px] text-ink-faint">{'}'}</p>
    </CommandBlock>
  )
}
