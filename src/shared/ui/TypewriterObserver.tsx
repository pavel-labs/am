'use client'

import { useEffect } from 'react'

const CHAR_MS = 28

export function TypewriterObserver(): null {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timers = new Set<number>()
    const pending = [...document.querySelectorAll<HTMLElement>('[data-typewriter]')].filter(
      // already on screen at load: nothing to animate
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    )

    pending.forEach((el) => {
      const text = el.textContent ?? ''
      el.dataset.text = text
      el.setAttribute('aria-label', text)
      el.textContent = ''
    })

    const type = (el: HTMLElement) => {
      const text = el.dataset.text ?? ''
      let i = 0
      el.dataset.typing = ''
      const tick = () => {
        i += 1
        el.textContent = text.slice(0, i)
        if (i < text.length) {
          timers.add(window.setTimeout(tick, CHAR_MS))
        } else {
          delete el.dataset.typing
        }
      }
      tick()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          type(entry.target as HTMLElement)
        })
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    pending.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      timers.forEach(window.clearTimeout)
      pending.forEach((el) => {
        el.textContent = el.dataset.text ?? el.textContent
        delete el.dataset.typing
      })
    }
  }, [])

  return null
}
