import { CommandBlock } from '@/shared/ui'
import { JobCard } from '@/entities/job'
import type { CvData } from '@/shared/types'

export function Experience({ cv }: { cv: CvData }) {
  return (
    <CommandBlock
      id="experience"
      command="git log --experience"
      title="Work experience"
      note={`${cv.jobs.length} entries`}
    >
      <ol className="relative border-l border-rule sm:ml-[9.5rem]">
        {cv.jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ol>
    </CommandBlock>
  )
}
