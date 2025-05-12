import { defineConfig } from 'rolldown'

export default defineConfig([
  // CJS build
  {
    input: 'src/index.ts',
    external: (id) => {
      // Keep all imports external for bundleless build
      return !id.startsWith('.') && !id.startsWith('/')
    },
    output: {
      format: 'cjs',
      dir: 'dist/cjs',
      entryFileNames: 'index.js',
    },
    platform: 'node',
  },
  // MJS build
  {
    input: 'src/index.ts',
    external: (id) => {
      // Keep all imports external for bundleless build
      return !id.startsWith('.') && !id.startsWith('/')
    },
    output: {
      format: 'esm',
      dir: 'dist/esm',
      entryFileNames: 'index.js',
    },
    platform: 'node',
  },
])
