import { afterEach, describe, expect, it, vi } from 'vitest'

// progress.ts reads storage when it loads, so each case sets storage and then imports a fresh copy.
async function loadWith(settings: object) {
  vi.resetModules()
  const store = new Map([['greek-tutor:v1', JSON.stringify({ items: {}, settings })]])
  vi.stubGlobal('localStorage', { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => store.set(k, v) })
  return import('./progress')
}

afterEach(() => vi.unstubAllGlobals())

describe('autoplay default', () => {
  it('turns autoplay on for someone who never chose', async () => {
    const p = await loadWith({ requireAccents: false, pronunciation: 'mounce', autoplay: false })
    expect(p.exportProgress()).toContain('"autoplay": true')
  })

  it('keeps an explicit choice to turn it off', async () => {
    const p = await loadWith({ requireAccents: false, pronunciation: 'mounce', autoplay: false, autoplayChosen: true })
    expect(p.exportProgress()).toContain('"autoplay": false')
  })
})
