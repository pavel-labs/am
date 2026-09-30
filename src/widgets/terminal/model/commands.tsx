import Link from 'next/link'
import { getTheme, setTheme } from '@/shared/lib/theme'
import type { ShellCommand, ShellContext, ShellData } from './types'

const FILES: Record<string, { id: string; label: string }> = {
  'about.md': { id: 'about', label: 'About' },
  'experience.log': { id: 'experience', label: 'Work experience' },
  'stack.json': { id: 'skills', label: 'Skills & tech stack' },
  'education.txt': { id: 'education', label: 'Education & languages' },
  'contacts.vcf': { id: 'contact', label: 'Contact' },
}

const DIRS = ['projects/', 'side-projects/', 'blog/']

function Muted({ children }: { children: React.ReactNode }) {
  return <span className="text-ink-faint">{children}</span>
}

function Ok({ children }: { children: React.ReactNode }) {
  return (
    <p>
      <span className="text-accent">→</span> {children}
    </p>
  )
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
    >
      {children}
    </a>
  )
}

function jump(name: string, id: string, label: string, aliases: string[] = []): ShellCommand {
  return {
    name,
    aliases,
    summary: `show ${label.toLowerCase()}`,
    run: (_args, ctx) => {
      ctx.scrollTo(id)
      return (
        <Ok>
          {label} <Muted>(scrolled to ~/{id})</Muted>
        </Ok>
      )
    },
  }
}

function download(href: string, fileName: string) {
  const a = document.createElement('a')
  a.href = href
  a.download = fileName
  a.click()
}

export const COMMANDS: readonly ShellCommand[] = [
  {
    name: 'help',
    aliases: ['?', 'man'],
    summary: 'list available commands',
    run: () => (
      <div>
        <p className="mb-2 text-ink-soft">
          Available commands <Muted>— or just scroll, the full CV is printed below.</Muted>
        </p>
        <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {COMMANDS.filter((c) => !c.hidden).map((c) => (
            <li key={c.name} className="flex gap-3">
              <span className="w-24 shrink-0 text-accent">{c.name}</span>
              <Muted>{c.summary}</Muted>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  jump('whoami', 'whoami', 'Who I am'),
  jump('about', 'about', 'About'),
  jump('experience', 'experience', 'Work experience', ['work', 'jobs']),
  jump('skills', 'skills', 'Skills & tech stack', ['stack']),
  jump('projects', 'projects', 'Personal projects'),
  jump('education', 'education', 'Education & languages'),
  jump('contact', 'contact', 'Contact'),
  {
    name: 'blog',
    summary: 'list posts (blog <n> opens one)',
    args: (data) => data.posts.map((_, i) => String(i + 1)),
    run: (args, ctx) => {
      const n = Number(args[0])
      const post = Number.isInteger(n) ? ctx.data.posts[n - 1] : undefined
      if (post) {
        ctx.navigate(`/blog/${post.slug}`)
        return <Ok>less {post.slug}.mdx</Ok>
      }
      return (
        <div>
          {ctx.data.posts.map((p, i) => (
            <p key={p.slug}>
              <Muted>{i + 1}.</Muted>{' '}
              <Link href={`/blog/${p.slug}`} className="text-ink hover:text-accent">
                {p.title}
              </Link>
            </p>
          ))}
          <p className="mt-1">
            <Muted>type </Muted>
            <span className="text-accent">blog 1</span>
            <Muted> to open one, or visit </Muted>
            <Link href="/blog" className="text-accent underline underline-offset-4">
              /blog
            </Link>
          </p>
        </div>
      )
    },
  },
  {
    name: 'cv',
    aliases: ['resume'],
    summary: 'download my CV (PDF)',
    run: (_args, ctx) => {
      download('/api/cv-download', ctx.data.cvFileName)
      return (
        <Ok>
          downloading {ctx.data.cvFileName}{' '}
          <Muted>
            — or <ExtLink href={ctx.data.cvPath}>read it online</ExtLink>
          </Muted>
        </Ok>
      )
    },
  },
  {
    name: 'email',
    summary: 'copy my email to clipboard',
    run: async (_args, ctx) => {
      try {
        await navigator.clipboard.writeText(ctx.data.email)
        return <Ok>{ctx.data.email} copied to clipboard</Ok>
      } catch {
        return (
          <Ok>
            <ExtLink href={`mailto:${ctx.data.email}`}>{ctx.data.email}</ExtLink>
          </Ok>
        )
      }
    },
  },
  {
    name: 'open',
    summary: 'open github | linkedin | cv | email',
    args: () => ['github', 'linkedin', 'cv', 'email'],
    run: (args, ctx) => {
      const targets: Record<string, string> = {
        github: ctx.data.githubUrl,
        linkedin: ctx.data.linkedinUrl,
        cv: ctx.data.cvPath,
        email: `mailto:${ctx.data.email}`,
      }
      const target = args[0] ? targets[args[0]] : undefined
      if (!target) {
        return (
          <p>
            usage: open <Muted>github | linkedin | cv | email</Muted>
          </p>
        )
      }
      window.open(target, target.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer')
      return <Ok>opening {args[0]}…</Ok>
    },
  },
  {
    name: 'neofetch',
    aliases: ['fetch'],
    summary: 'short summary card',
    run: (_args, { data }) => <Neofetch data={data} />,
  },
  {
    name: 'ls',
    summary: 'list files',
    run: () => (
      <p className="flex flex-wrap gap-x-6">
        {DIRS.map((d) => (
          <span key={d} className="text-accent">
            {d}
          </span>
        ))}
        {Object.keys(FILES).map((f) => (
          <span key={f} className="text-ink">
            {f}
          </span>
        ))}
      </p>
    ),
  },
  {
    name: 'cat',
    summary: 'print a file, e.g. cat about.md',
    args: () => Object.keys(FILES),
    run: (args, ctx) => {
      const name = args[0]
      if (!name) {
        return (
          <p>
            usage: cat <Muted>{'<file>'} — try </Muted>
            <span className="text-accent">ls</span>
          </p>
        )
      }
      const file = FILES[name]
      if (!file) {
        if (DIRS.includes(`${name.replace(/\/$/, '')}/`)) return <p>cat: {name}: Is a directory</p>
        return <p>cat: {name}: No such file or directory</p>
      }
      ctx.scrollTo(file.id)
      return (
        <Ok>
          {file.label} <Muted>(scrolled to ~/{file.id})</Muted>
        </Ok>
      )
    },
  },
  {
    name: 'theme',
    summary: 'switch colours: theme dark | light',
    args: () => ['dark', 'light'],
    run: (args) => {
      const next =
        args[0] === 'dark' || args[0] === 'light' ? args[0] : getTheme() === 'dark' ? 'light' : 'dark'
      setTheme(next)
      return <Ok>theme set to {next}</Ok>
    },
  },
  {
    name: 'history',
    summary: 'show command history',
    run: (_args, ctx) =>
      ctx.history.length === 0 ? (
        <Muted>history is empty</Muted>
      ) : (
        <ol>
          {ctx.history.map((h, i) => (
            <li key={i}>
              <span className="tnum inline-block w-8 text-ink-ghost">{i + 1}</span>
              {h}
            </li>
          ))}
        </ol>
      ),
  },
  {
    name: 'date',
    summary: 'print the current date',
    run: () => <p>{new Date().toString()}</p>,
  },
  {
    name: 'echo',
    hidden: true,
    summary: 'print text',
    run: (args) => <p>{args.join(' ')}</p>,
  },
  {
    name: 'clear',
    aliases: ['cls'],
    summary: 'clear the terminal output',
    run: (_args, ctx) => {
      ctx.clear()
      return null
    },
  },
  {
    name: 'exit',
    aliases: ['logout', 'top'],
    summary: 'back to the top',
    run: (_args, ctx) => {
      ctx.scrollTo('top')
      return (
        <Ok>
          logout <Muted>— just kidding, back to the top</Muted>
        </Ok>
      )
    },
  },
  {
    name: 'sudo',
    hidden: true,
    summary: '',
    run: (_args, ctx) => (
      <p>
        <span className="text-accent">[sudo]</span> permission denied. <Muted>But you can always </Muted>
        <ExtLink href={`mailto:${ctx.data.email}`}>email me</ExtLink>.
      </p>
    ),
  },
  {
    name: 'rm',
    hidden: true,
    summary: '',
    run: () => <p>rm: nice try. This portfolio is read-only.</p>,
  },
]

const BY_NAME = new Map<string, ShellCommand>()
for (const c of COMMANDS) {
  BY_NAME.set(c.name, c)
  c.aliases?.forEach((a) => BY_NAME.set(a, c))
}

export function findCommand(name: string): ShellCommand | undefined {
  return BY_NAME.get(name.toLowerCase())
}

export function complete(input: string, data: ShellData): { value: string; options: string[] } {
  const parts = input.replace(/^\s+/, '').split(/\s+/)
  const word = parts[parts.length - 1] ?? ''

  const pool =
    parts.length <= 1
      ? COMMANDS.filter((c) => !c.hidden).map((c) => c.name)
      : [...(findCommand(parts[0] ?? '')?.args?.(data) ?? [])]

  const options = pool.filter((p) => p.startsWith(word.toLowerCase()))
  if (options.length === 0) return { value: input, options: [] }

  const prefix = options.reduce((acc, o) => {
    let i = 0
    while (i < acc.length && acc[i] === o[i]) i++
    return acc.slice(0, i)
  })
  const completed = options.length === 1 ? `${options[0]} ` : prefix
  const head = parts.slice(0, -1).join(' ')
  return {
    value: head ? `${head} ${completed}` : completed,
    options: options.length > 1 ? options : [],
  }
}

export function runCommand(input: string, ctx: ShellContext) {
  const [name = '', ...args] = input.trim().split(/\s+/)
  const command = findCommand(name)
  if (!command) {
    return (
      <p>
        <span className="text-accent">command not found:</span> {name} <Muted>— try </Muted>
        <span className="text-accent">help</span>
      </p>
    )
  }
  return command.run(args, ctx)
}

function Neofetch({ data }: { data: ShellData }) {
  const current = data.jobs[0]
  const rows: Array<[string, string]> = [
    ['role', data.title],
    ['location', data.location],
    ['uptime', `${data.years}+ years in frontend`],
    ['stack', data.stack.join(', ')],
    ['latest', current ? `${current.title} @ ${current.company}` : '—'],
    ['projects', data.projects.map((p) => p.name).join(', ')],
    ['contact', data.email],
  ]
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
      <pre aria-hidden className="hidden leading-tight text-accent sm:block">
        {['┌──────┐', '│ >_   │', '│      │', '└──┬┬──┘', '  ─┴┴─'].join('\n')}
      </pre>
      <div>
        <p>
          <span className="text-accent">pavel</span>@<span className="text-accent">portfolio</span>
        </p>
        <p className="text-ink-ghost">-----------------</p>
        {rows.map(([k, v]) => (
          <p key={k}>
            <span className="text-accent">{k}</span>: <span className="text-ink-soft">{v}</span>
          </p>
        ))}
      </div>
    </div>
  )
}
