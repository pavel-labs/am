/** Lets any widget open the palette without importing it (widgets stay independent). */
export const OPEN_COMMAND_PALETTE_EVENT = 'open-command-palette'

export function openCommandPalette(): void {
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT))
}
