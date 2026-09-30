import { CommandBlock } from '@/shared/ui'
import { EducationCard, CertificationCard } from '@/entities/education'
import { LABEL_CLASS } from '@/shared/ui/constants'
import type { CvData } from '@/shared/types'

export function Education({ cv }: { cv: CvData }): React.ReactElement {
  const { educations, certifications, languages } = cv

  return (
    <CommandBlock id="education" command="cat education.txt" title="Education & languages">

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h3 className={`${LABEL_CLASS} mb-4`}>./degree</h3>
            <div className="border-t border-rule">
              {educations.map((edu) => (
                <EducationCard key={edu.degree} edu={edu} />
              ))}
            </div>
          </div>

          <div>
            <h3 className={`${LABEL_CLASS} mb-4`}>./certifications</h3>
            <div className="border-t border-rule">
              {certifications.map((cert) => (
                <CertificationCard key={cert.name} cert={cert} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <h3 className={`${LABEL_CLASS} mb-4`}>./languages</h3>
          <dl className="max-w-xl border-t border-rule">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-baseline justify-between gap-6 border-b border-rule py-3.5"
              >
                <dt className="text-lg font-medium">{lang.name}</dt>
                <dd className="font-mono text-[12px] text-ink-faint">{lang.level}</dd>
              </div>
            ))}
          </dl>
        </div>
    </CommandBlock>
  )
}
