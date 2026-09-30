import { SectionHeader } from '@/shared/ui'
import { LABEL_CLASS } from '@/shared/ui/constants'
import type { CvData } from '@/shared/types'

export function About({ cv }: { cv: CvData }): React.ReactElement {
  const { personal, aboutTags } = cv

  return (
    <section id="about" data-reveal className="border-t border-rule py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader index="01" title="About" note={`${personal.yearsOfExperience}+ years`} />

        <div className="grid gap-10 lg:grid-cols-[1fr_16rem] lg:gap-16">
          <p className="max-w-measure text-xl leading-[1.55] text-ink sm:text-[1.4rem]">
            {personal.summary}
          </p>

          <div className="self-start">
            <p className={`${LABEL_CLASS} mb-3`}>principles.txt</p>
            <ul className="flex flex-col border-l border-rule font-mono text-[13px]">
              {aboutTags.map((tag) => (
                <li
                  key={tag}
                  className="group flex gap-3 py-1.5 pl-4 text-ink-soft transition-colors hover:text-ink"
                >
                  <span aria-hidden className="text-ink-ghost group-hover:text-accent">-</span>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
