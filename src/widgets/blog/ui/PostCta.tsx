import { Button } from '@/shared/ui'
import { ArrowUpRightIcon } from '@/shared/ui/icons'
import { PERSONAL } from '@/shared/config/cv'

export function PostCta(): React.ReactElement {
  return (
    <aside className="mt-16 border border-rule bg-paper-card/60 p-6 sm:mt-20 sm:p-8">
      <p className="font-mono text-[12px] text-ink-faint">
        <span className="text-accent">$</span> echo &quot;thanks for reading&quot;
      </p>
      <p className="mt-4 max-w-measure text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl">
        Enjoyed the post?
        <span className="font-normal text-ink-soft"> Tell me what you think or follow along on GitHub.</span>
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="primary"
          href={`mailto:${PERSONAL.email}`}
          className="justify-center sm:justify-start"
        >
          say hi
        </Button>
        <Button
          variant="ghost"
          href={PERSONAL.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="justify-center sm:justify-start"
        >
          <ArrowUpRightIcon />
          github
        </Button>
      </div>
    </aside>
  )
}
