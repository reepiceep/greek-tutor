/// <reference types="vitest/config" />
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import react from '@vitejs/plugin-react'
import { type Plugin, defineConfig } from 'vite'

/** Every file under a folder, as paths relative to it with forward slashes. */
function filesIn(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => relative(dir, join(e.parentPath, e.name)).split('\\').join('/'))
}

/**
 * Emits sw.js from pwa/sw.js with the list of files to cache for offline use (every built file plus public/) and a
 * version that changes whenever any of them does, so a new deploy installs a new cache.
 */
function serviceWorker(): Plugin {
  let publicDir = ''
  return {
    name: 'theophilus-service-worker',
    apply: 'build',
    configResolved(config) {
      publicDir = config.publicDir
    },
    generateBundle(_, bundle) {
      const built = Object.keys(bundle).filter((f) => !f.endsWith('.html'))
      const files = ['index.html', ...built, ...filesIn(publicDir)].sort()
      const hash = createHash('sha256')
      for (const f of filesIn(publicDir)) hash.update(f).update(readFileSync(join(publicDir, f)))
      hash.update(built.join('\n'))
      const source = readFileSync('pwa/sw.js', 'utf8')
        .replace("/* VERSION */ 'dev'", JSON.stringify(hash.digest('hex').slice(0, 12)))
        .replace('/* PRECACHE */ []', JSON.stringify(files.map((f) => `/${f}`)))
      this.emitFile({ type: 'asset', fileName: 'sw.js', source })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serviceWorker()],
  build: {
    rolldownOptions: {
      output: {
        // Home needs every chapter's data and question builders (for the review and the chapter map), so those load
        // up front, in a few long-lived files; each screen is its own small file, fetched when first opened. The
        // reader's passages and code are left out of the groups so they load only with the Read screen.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'data', test: /src[\\/]data[\\/](?!readings)/ },
            { name: 'drills', test: /src[\\/]lib[\\/](?!reader)/ },
          ],
        },
      },
    },
  },
  test: {
    setupFiles: ['src/test-setup.ts'],
  },
})
