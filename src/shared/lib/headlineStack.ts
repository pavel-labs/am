import type { CvData } from '@/shared/types'

export function headlineStack(cv: CvData, limit = 4): string[] {
  const clean = (s: string) => s.replace(/\s*\(.*?\)\s*/g, '').trim()
  const frameworks = cv.skillCategories.find((c) => /framework/i.test(c.label))?.skills ?? []
  const languages = cv.skillCategories.find((c) => /language/i.test(c.label))?.skills ?? []
  return [...new Set([...frameworks.slice(0, limit - 1), ...languages.slice(0, 1)].map(clean))].slice(0, limit)
}
