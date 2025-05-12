import { defineConfig } from 'rolldown'
import { readFileSync } from 'fs'
import { join } from 'path'

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
const external = [...Object.keys(pkg.peerDependencies || {}), 'react/jsx-runtime']

export default defineConfig([
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      minify: true,
    },
  },
  {
    input: 'src/index.ts',
    external,
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      minify: true,
    },
  },
])
