import { type ComponentType, use } from 'react'

// Every lazy screen's loader, so they can all be fetched ahead of time (after the first screen shows, and in tests).
const loaders: (() => Promise<void>)[] = []

/**
 * A screen whose code is fetched the first time it's needed. Unlike React.lazy, once loaded it renders straight
 * away, with no suspended first render, so preloading (see preloadScreens) makes it behave like a normal import.
 */
export function lazyScreen<P extends object>(load: () => Promise<ComponentType<P>>) {
  let Loaded: ComponentType<P> | undefined
  let pending: Promise<void> | undefined
  const preload = () => (pending ??= load().then(
    (c) => { Loaded = c },
    // Let a later render try again (after a dropped connection, say) rather than keep the failure.
    (e: unknown) => { pending = undefined; throw e },
  ))
  loaders.push(preload)
  return function LazyScreen(props: P) {
    if (!Loaded) use(preload())
    const Screen = Loaded!
    return <Screen {...props} />
  }
}

/** Fetch every screen's code now. */
export function preloadScreens(): Promise<void> {
  return Promise.all(loaders.map((l) => l())).then(() => {})
}
