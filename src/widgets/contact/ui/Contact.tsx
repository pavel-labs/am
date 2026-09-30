import { SectionHeader, Button } from '@/shared/ui'
import { ContactCard } from '@/entities/contact'
import { ContactForm } from './ContactForm'
import { getFeatures } from '@/shared/api/getFeatures'
import { LABEL_CLASS } from '@/shared/ui/constants'
import type { CvData } from '@/shared/types'

export async function Contact({ cv }: { cv: CvData }) {
  const { personal, contactItems } = cv
  const features = await getFeatures()

  return (
    <section id="contact" data-reveal className="border-t border-rule bg-paper-deep/60 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader index="06" title="Contact" note="ping me" />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="max-w-measure text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              Say hello<span className="text-accent">_</span>
            </p>
            <p className="mt-6 max-w-measure leading-relaxed text-ink-soft">
              Always happy to talk React, React Native, TypeScript, UI systems and side projects.
              Got a question about something I wrote, an idea to bounce around, or just want to
              connect — drop a line.
            </p>

            <div className="mt-8">
              {features.contactForm ? (
                <ContactForm />
              ) : (
                <Button variant="primary" href={`mailto:${personal.email}`}>
                  get in touch
                </Button>
              )}
            </div>
          </div>

          <div>
            <h3 className={`${LABEL_CLASS} mb-4`}>./elsewhere</h3>
            <div className="border-t border-rule">
              {contactItems.map((item) => (
                <ContactCard key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
