import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import path from 'path'
import fs from 'fs'

const extensions = ['.tsx', '.ts', '.jsx', '.js']

function tryResolveFile(filePath: string): string | undefined {
  if (path.extname(filePath) && fs.existsSync(filePath)) return filePath
  for (const ext of extensions) {
    const fullPath = `${filePath}${ext}`
    if (fs.existsSync(fullPath)) return fullPath
    const indexPath = path.join(filePath, `index${ext}`)
    if (fs.existsSync(indexPath)) return indexPath
  }
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const cwd = path.resolve(process.cwd())
    const packagesPath = path.join(cwd, '../packages')

    return mergeConfig(config, {
      resolve: {
        extensions,
        alias: [
          {
            find: '@vainjs/rc',
            replacement: path.join(packagesPath, '/components/src'),
          },
          {
            find: /^@\/(utils)/,
            replacement: '$1',
            customResolver(id: string, importer: string) {
              const match = importer.match(/(.*?)\/src\//)
              const basePath = match?.[1]
              if (!basePath) return
              return tryResolveFile(path.join(basePath!, 'src', id))
            },
          },
        ],
      },
    })
  },
}

export default config
