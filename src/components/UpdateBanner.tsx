import { applyUpdate, useUpdateReady } from '../lib/pwa'

/** Offers the new version once it has downloaded; progress is kept either way. */
export function UpdateBanner() {
  const ready = useUpdateReady()
  if (!ready) return null
  return (
    <div className="update-banner" role="status">
      <span>A new version is ready.</span>
      <button className="primary" onClick={applyUpdate}>Reload</button>
    </div>
  )
}
