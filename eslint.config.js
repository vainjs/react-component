import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactHooks from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['dist'],
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser,
      ecmaVersion: 2020,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.recommended,
  prettierRecommended,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
])
