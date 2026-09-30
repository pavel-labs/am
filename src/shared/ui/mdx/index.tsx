import type { MDXComponents } from 'mdx/types'
import { cn } from '@/shared/lib/cn'

const BODY_TEXT = 'text-[17px] leading-relaxed text-ink-soft'

/** Article typography - one entry per element the markdown can produce. */
const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 className="max-w-measure pt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl" {...props}>
      <span aria-hidden className="mr-3 font-mono text-[0.6em] font-normal text-accent">##</span>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="max-w-measure pt-2 text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-[1.65rem]" {...props}>
      <span aria-hidden className="mr-3 font-mono text-[0.6em] font-normal text-ink-ghost">###</span>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className={cn('max-w-measure', BODY_TEXT)} {...props}>
      {children}
    </p>
  ),
  // `[&>li>p]:inline` keeps the hanging indent when a list is authored loose.
  ul: ({ children, ...props }) => (
    <ul className="max-w-measure space-y-2.5 [&>li>p]:inline" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="max-w-measure list-inside list-decimal space-y-2.5 [&>li>p]:inline" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className={cn('pl-5 -indent-5', BODY_TEXT)} {...props}>
      <span aria-hidden className="mr-2 font-mono text-accent/70">
        -
      </span>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="max-w-measure border-l-2 border-accent bg-accent/5 py-3 pl-6 pr-4 [&>p]:max-w-none [&>p]:text-xl [&>p]:leading-snug [&>p]:text-ink sm:[&>p]:text-[1.35rem]"
      {...props}
    >
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }) => (
    <pre className="overflow-x-auto border border-rule border-t-accent/60 bg-paper-card p-5 [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[13px] [&>code]:text-ink-soft" {...props}>
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = typeof className === 'string' && className.startsWith('language-')
    return (
      <code
        className={cn(
          className,
          'font-mono leading-relaxed text-ink-soft',
          isBlock ? 'text-[13px]' : 'border border-rule bg-paper-card px-1.5 py-0.5 text-[0.85em] text-accent',
        )}
        {...props}
      >
        {/* A fenced block keeps its closing newline, which shows as a blank last line. */}
        {isBlock && typeof children === 'string' ? children.replace(/\n+$/, '') : children}
      </code>
    )
  },
  a: ({ children, ...props }) => (
    <a className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent" {...props}>
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-ink" {...props}>
      {children}
    </em>
  ),
  hr: (props) => <hr className="max-w-measure border-0 border-t border-rule" {...props} />,
}

export function useMDXComponents(inherited?: MDXComponents): MDXComponents {
  return { ...inherited, ...components }
}
