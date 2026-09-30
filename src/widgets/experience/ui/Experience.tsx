import { SectionHeader } from '@/shared/ui'
import { JobCard } from '@/entities/job'
import type { CvData } from '@/shared/types'

export function Experience({ cv }: { cv: CvData }) {
  return (
    <section id="experience" data-reveal className="border-t border-rule py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader index="02" title="Experience" note={`git log · ${cv.jobs.length} entries`} />

        {/* A commit graph: one vertical rail, one node per position */}
        <ol className="relative border-l border-rule sm:ml-[9.5rem]">
          {cv.jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </ol>
      </div>
    </section>
  )
}
