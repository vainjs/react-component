import { defineConfig } from 'rolldown'

export default defineConfig([
  {
    input: 'src/index.ts',
    external: (id) => !id.startsWith('.') && !id.startsWith('/'),
    output: {
      format: 'cjs',
      dir: 'dist/cjs',
      entryFileNames: 'index.js',
    },
    platform: 'node',
  },
  {
    input: 'src/index.ts',
    external: (id) => !id.startsWith('.') && !id.startsWith('/'),
    output: {
      format: 'esm',
      dir: 'dist/esm',
      entryFileNames: 'index.js',
    },
    platform: 'node',
  },
])
