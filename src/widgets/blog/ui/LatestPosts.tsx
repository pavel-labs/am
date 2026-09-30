import Link from 'next/link'
import { CommandBlock } from '@/shared/ui'
import { ArrowUpRightIcon } from '@/shared/ui/icons'
import type { BlogPost } from '@/shared/types'

export function LatestPosts({ posts }: { posts: readonly BlogPost[] }): React.ReactElement | null {
  if (posts.length === 0) return null

  return (
    <CommandBlock id="blog" command="ls -t ~/blog | head -3" title="Latest blog posts">
      <ul className="font-mono text-[13px]">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-rule/60 last:border-0">
            <Link
              href={`/blog/${post.slug}`}
              className="group grid gap-x-6 gap-y-1 py-4 transition-colors sm:grid-cols-[6.5rem_4.5rem_1fr_auto] sm:items-baseline"
            >
              <time dateTime={post.date} className="tnum text-ink-faint">{post.date}</time>
              <span className="hidden text-ink-ghost sm:inline">{post.readingTime.replace(' read', '')}</span>
              <span className="min-w-0">
                <span className="block font-sans text-base font-medium text-ink transition-colors group-hover:text-accent">
                  {post.title}
                </span>
                <span className="block truncate text-[11px] text-ink-ghost">{post.slug}.mdx</span>
              </span>
              <ArrowUpRightIcon className="hidden text-ink-ghost transition-colors group-hover:text-accent sm:block" />
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/blog"
        className="mt-4 inline-flex font-mono text-[13px] text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
      >
        cd /blog → all posts
      </Link>
    </CommandBlock>
  )
}
