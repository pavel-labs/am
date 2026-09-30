import type { Metadata } from 'next'
import { BlogList } from '@/widgets/blog'
import { getAllPosts } from '@/shared/lib/posts'
import { LABEL_CLASS } from '@/shared/ui/constants'
import { SITE_URL } from '../constants'

export const metadata: Metadata = {
  title: 'Blog - Pavel Piatrovich',
  description: 'Notes on React, TypeScript, and frontend engineering from Pavel Piatrovich.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog - Pavel Piatrovich',
    description: 'Notes on React, TypeScript, and frontend engineering from Pavel Piatrovich.',
    type: 'website',
    url: `${SITE_URL}/blog`,
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex items-center gap-5 sm:mb-14">
        <span className={LABEL_CLASS}>
          <span className="text-accent">~</span> <span className="text-ink-ghost">$</span>{' '}
          <span className="text-ink-soft">ls ./blog</span>
        </span>
        <span className="h-px flex-1 bg-rule" />
        <span className={LABEL_CLASS}>{posts.length} files</span>
      </div>

      <h1 className="text-[2.75rem] font-semibold leading-[0.9] tracking-[-0.045em] sm:text-7xl">
        Blog<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-soft">
        Notes on React, TypeScript, and shipping frontend systems - written between client work.
      </p>

      <div className="mt-14 sm:mt-16">
        <BlogList posts={posts} />
      </div>
    </div>
  )
}
