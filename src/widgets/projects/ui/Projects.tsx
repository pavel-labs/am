import { CommandBlock, Prompt } from '@/shared/ui'
import { PersonalProjectCard } from '@/entities/personal-project'
import type { CvData } from '@/shared/types'

export function Projects({ cv }: { cv: CvData }) {
  return (
    <CommandBlock id="projects" command="ls -la ~/projects" title="Personal projects">
      <div className="grid gap-6">
        {cv.personalProjects.map((project) => (
          <PersonalProjectCard key={project.name} project={project} />
        ))}
      </div>

      {cv.sideProjects && cv.sideProjects.length > 0 && (
        <div className="mt-12">
          <h3 className="flex flex-wrap items-baseline gap-x-2 font-mono text-[13px] sm:text-sm">
            <Prompt />
            <span data-typewriter className="text-ink">ls ~/side-projects</span>
            <span className="text-ink-ghost">
              {'# '}
              <span className="text-ink-faint">Experiments & learning</span>
            </span>
          </h3>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {cv.sideProjects.map((project) => (
              <PersonalProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      )}
    </CommandBlock>
  )
}
