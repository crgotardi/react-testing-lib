/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
    globals: true,
    coverage: {
      reporter: ['text', 'json'],
      provider: 'v8'
    },
    reporters: [
      ['default', { summary: false }]
    ]
  }
})
