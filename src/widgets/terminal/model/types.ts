// passed from a server component, so it must stay serializable
export interface ShellData {
  readonly name: string
  readonly title: string
  readonly location: string
  readonly years: number
  readonly email: string
  readonly githubUrl: string
  readonly linkedinUrl: string
  readonly cvPath: string
  readonly cvFileName: string
  readonly stack: readonly string[]
  readonly jobs: ReadonlyArray<{ readonly title: string; readonly company: string; readonly period: string }>
  readonly projects: ReadonlyArray<{ readonly name: string; readonly tagline: string; readonly url: string }>
  readonly posts: ReadonlyArray<{ readonly slug: string; readonly title: string }>
}

export interface ShellContext {
  readonly data: ShellData
  readonly history: readonly string[]
  scrollTo(id: string): void
  clear(): void
  navigate(href: string): void
}

export type CommandResult = React.ReactNode

export interface ShellCommand {
  readonly name: string
  readonly aliases?: readonly string[]
  readonly summary: string
  readonly hidden?: boolean
  readonly args?: (data: ShellData) => readonly string[]
  run(args: readonly string[], ctx: ShellContext): CommandResult | Promise<CommandResult>
}
