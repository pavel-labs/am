import Link from 'next/link'

export default function PostNotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <p className="font-mono text-[12px] text-accent">error 404: ENOENT</p>
      <h1 className="mt-4 text-5xl font-semibold leading-none tracking-[-0.04em] sm:text-6xl">
        Post not found
      </h1>
      <p className="mt-5 max-w-measure text-ink-soft">
        This one either moved or never existed. Back to the index.
      </p>
      <Link
        href="/blog"
        className="mt-8 inline-block font-mono text-sm text-ink-soft underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
      >
        cd ../blog
      </Link>
    </div>
  )
}
