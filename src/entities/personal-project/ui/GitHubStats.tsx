import { getGitHubStats } from '@/shared/api/getGitHubStats'

export async function GitHubStats({ repo }: { repo: string }) {
  const stats = await getGitHubStats(repo)
  if (!stats) return null

  return (
    <dl className="flex items-baseline gap-4 font-mono text-[11px] text-ink-faint">
      <div className="flex items-baseline gap-1.5">
        <dt aria-label="Stars">★</dt>
        <dd className="tnum text-ink">{stats.stars}</dd>
      </div>
      <div className="flex items-baseline gap-1.5">
        <dt aria-label="Forks">⑂</dt>
        <dd className="tnum text-ink">{stats.forks}</dd>
      </div>
    </dl>
  )
}
