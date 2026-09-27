import { Component, type ReactNode } from 'react'

/** If a screen's code can't be fetched (offline before it was cached, or after a new version replaced it), say so. */
export class ScreenBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="load-failed">
        <p><strong>This screen couldn’t be loaded.</strong></p>
        <p className="muted">You may be offline, or the app has been updated since you opened it.</p>
        <button className="primary" onClick={() => window.location.reload()}>Reload</button>
      </div>
    )
  }
}
