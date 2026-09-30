import Link from 'next/link'
import { formatPostDate } from '@/entities/post'
import { LABEL_CLASS } from '@/shared/ui/constants'
import { cn } from '@/shared/lib/cn'
import type { BlogPost } from '@/shared/types'

export function PostHeader({ post }: { post: BlogPost }): React.ReactElement {
  return (
    <header className="mb-12 sm:mb-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-[12px] text-ink-faint transition-colors hover:text-accent"
      >
        <span aria-hidden>cd</span> ../blog
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <span className={cn(LABEL_CLASS, 'text-ink-soft')}>{post.slug}.mdx</span>
        <span className="h-px flex-1 bg-rule" />
        <time dateTime={post.date} className={LABEL_CLASS}>
          {formatPostDate(post.date)}
        </time>
        <span className={LABEL_CLASS}>· {post.readingTime}</span>
      </div>

      <h1 className="mt-6 max-w-[22ch] text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl">
        {post.title}
      </h1>

      <p className="mt-6 max-w-measure text-xl leading-snug text-ink-soft sm:text-2xl">{post.dek}</p>

      <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 border-t border-rule pt-5">
        {post.tags.map((tag) => (
          <span key={tag} className={LABEL_CLASS}>
            #{tag.toLowerCase().replace(/\s+/g, '-')}
          </span>
        ))}
      </div>
    </header>
  )
}
