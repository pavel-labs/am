import { SectionHeader } from '@/shared/ui'
import { PersonalProjectCard } from '@/entities/personal-project'
import type { CvData } from '@/shared/types'

export function Projects({ cv }: { cv: CvData }) {
  return (
    <section id="projects" data-reveal className="border-t border-rule py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader index="04" title="Projects" note="personal work" />

        <div className="grid gap-6">
          {cv.personalProjects.map((project) => (
            <PersonalProjectCard key={project.name} project={project} />
          ))}
        </div>

        {cv.sideProjects && cv.sideProjects.length > 0 && (
          <div className="mt-20">
            <SectionHeader index="04.1" title="Side projects" note="experiments & learning" />

            <div className="grid gap-6 md:grid-cols-2">
              {cv.sideProjects.map((project) => (
                <PersonalProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
