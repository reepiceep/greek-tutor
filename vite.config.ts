/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // All chapter data is bundled in one file (~510 kB, ~140 kB gzipped); fine for a local study app.
  build: { chunkSizeWarningLimit: 800 },
  test: {
    setupFiles: ['src/test-setup.ts'],
  },
})
