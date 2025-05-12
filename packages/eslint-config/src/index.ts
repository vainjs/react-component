import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactHooks from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import js from '@eslint/js'
import type { Linter } from 'eslint'

const baseLanguageConfig: Linter.Config = {
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  ignores: ['**/dist/**', '**/node_modules/**'],
  languageOptions: {
    parser: tseslint.parser,
    globals: globals.browser,
    ecmaVersion: 2020,
  },
}

const rules: Linter.Config = {
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
  },
}

// Base configs - TypeScript + Prettier
export const base: Linter.Config[] = [
  baseLanguageConfig,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  rules,
]

// React configs - Base + React specific
export const react: Linter.Config[] = [
  baseLanguageConfig,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...reactPlugin.configs.flat['jsx-runtime'],
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.recommended,
  prettierRecommended,
  rules,
]
