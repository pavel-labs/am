export const BOOT_STORAGE_KEY = 'booted'

// inline in <head>: decided before first paint, so neither the page nor the overlay flashes
export const BOOT_INIT_SCRIPT = `!function(){try{if(location.pathname!=='/')return;if(sessionStorage.getItem('${BOOT_STORAGE_KEY}'))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;document.documentElement.dataset.boot='1'}catch(e){}}();`

export const BOOT_LINES: readonly string[] = [
  'Booting pavel-os 26.04 LTS…',
  '[  OK  ] Started React 19 runtime',
  '[  OK  ] Mounted /home/pavel/experience (7+ years)',
  '[  OK  ] Loaded TypeScript strict mode',
  '[  OK  ] Started React Native bridge',
  '[  OK  ] Reached target Clean Architecture',
  '[  OK  ] Started Playwright test daemon',
  '[  OK  ] Listening on :443 for recruiters',
  'pavel-portfolio login: guest (automatic)',
]
