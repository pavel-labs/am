export type Theme = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'theme'
export const THEME_CHANGE_EVENT = 'theme-change'

/**
 * Runs in <head> before first paint so the stored theme applies without a
 * flash. Kept as a string because it must not wait for the JS bundle.
 */
export const THEME_INIT_SCRIPT = `!function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}}();`

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }))
}

export function toggleTheme(): void {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}
