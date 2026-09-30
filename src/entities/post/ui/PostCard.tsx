import Link from 'next/link'
import { ArrowUpRightIcon } from '@/shared/ui/icons'
import { LABEL_CLASS } from '@/shared/ui/constants'
import type { BlogPost } from '@/shared/types'

export function PostCard({ post }: { post: BlogPost }): React.ReactElement {
  return (
    <article className="group grid gap-x-8 gap-y-3 border-b border-rule py-7 sm:grid-cols-[9rem_1fr] sm:py-9">
      <div className="flex gap-3 sm:flex-col sm:gap-1">
        <time dateTime={post.date} className={`${LABEL_CLASS} tnum text-ink-soft`}>
          {post.date}
        </time>
        <span className={LABEL_CLASS}>{post.readingTime}</span>
      </div>

      <div>
        <p className="font-mono text-[11px] text-ink-ghost">{post.slug}.mdx</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-1 inline-flex items-baseline gap-2 transition-colors hover:text-accent"
        >
          <h2 className="text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-3xl">
            {post.title}
          </h2>
          <ArrowUpRightIcon className="shrink-0 text-ink-ghost transition-colors group-hover:text-accent" />
        </Link>

        <p className="mt-3 max-w-measure leading-relaxed text-ink-soft">{post.dek}</p>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
          {post.tags.map((tag) => (
            <span key={tag} className={LABEL_CLASS}>
              #{tag.toLowerCase().replace(/\s+/g, '-')}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
