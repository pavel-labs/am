import { SectionHeader } from '@/shared/ui'
import { SkillCategoryCard } from '@/entities/skill'
import type { CvData } from '@/shared/types'

export function Skills({ cv }: { cv: CvData }): React.ReactElement {
  return (
    <section id="skills" data-reveal className="border-t border-rule bg-paper-deep/60 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader index="03" title="Skills" note="stack.json" />

        <div className="border-t border-rule">
          {cv.skillCategories.map((category) => (
            <SkillCategoryCard key={category.label} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
