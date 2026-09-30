import type { Certification } from '@/shared/types'

export function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <div className="border-b border-rule py-5">
      <p className="text-lg font-medium leading-snug">{cert.name}</p>
      <p className="mt-1 font-mono text-[13px] text-accent">{cert.issuer}</p>
      <p className="tnum mt-2 font-mono text-[11px] text-ink-faint">{cert.period}</p>
    </div>
  )
}
