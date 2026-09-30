'use client'

import { useEffect, useState } from 'react'

export function useActiveSection(ids: readonly string[], enabled = true): string {
  const [active, setActive] = useState('')
  const key = ids.join(',')

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      // active = the section crossing the upper third of the viewport
      { rootMargin: '-30% 0px -60% 0px' },
    )
    key.split(',').forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [key, enabled])

  return active
}
