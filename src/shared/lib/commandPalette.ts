// an event instead of an import: widgets must not depend on each other (FSD)
export const OPEN_COMMAND_PALETTE_EVENT = 'open-command-palette'

export function openCommandPalette(): void {
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT))
}
