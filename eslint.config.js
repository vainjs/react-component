import { react } from '@vainjs/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['eslint.config.js', '**/dist/**', '**/node_modules/**'],
  },
  react,
])
