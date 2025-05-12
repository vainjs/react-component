# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a pnpm-based monorepo for the `@vainjs/rc` React component library. The project includes reusable React components (Splitter, KeepAlive, SortTable, TreeTransfer, FlexBox) and a shared ESLint configuration package.

## Common Commands

### Development
```bash
# Install dependencies
pnpm install

# Start Storybook development server (port 6007)
pnpm start

# Build component library
pnpm run build:rc

# Build ESLint config package  
pnpm run build:eslint
```

### Linting and Code Quality
```bash
# Run ESLint across the project
pnpm exec eslint .

# Run lint-staged (used by pre-commit hook)
pnpm lint-staged
```

### Testing
- No test framework is currently configured in the main packages
- Vitest is available in the docs package but no tests are written yet
- When adding tests, consider using Vitest as it's already configured

## Architecture

### Monorepo Structure
The project uses pnpm workspaces with the following packages:

- **`packages/components/`** (`@vainjs/rc`) - Main component library
- **`packages/eslint-config/`** (`@vainjs/eslint-config`) - Shared ESLint configuration
- **`docs/`** - Storybook documentation site

### Build System
- **Bundler**: Rolldown (Rust-based bundler) for both packages
- **Output**: Dual CJS/ESM builds with TypeScript declarations
- **Component Entry**: `packages/components/src/index.ts` (currently only exports Splitter)
- **External Dependencies**: React, ReactDOM, and @vainjs/hooks are peer dependencies

### Component Export Pattern
Components follow a compound component pattern:
```typescript
// Example from splitter/index.ts
export type { SplitterRef, PanelRef } from './type'
export { default as Splitter } from './Splitter'
export { default as Panel } from './Panel'
export { default as PanelResizeHandle } from './ResizeHandle'
```

### ESLint Configuration
The project provides two ESLint configurations via `@vainjs/eslint-config`:
- **`base`**: TypeScript + Prettier for general projects
- **`react`**: Extends base with React-specific rules, hooks, and refresh plugins

### Git Hooks & Quality
- **Pre-commit**: Runs `lint-staged` via Husky
- **Lint-staged**: Auto-fixes TypeScript/JavaScript files with ESLint
- **Commit Convention**: Uses Conventional Commits with commitlint

## Key Implementation Notes

### Adding New Components
1. Create component directory in `packages/components/src/`
2. Export from component's `index.ts` file
3. Add export to main `packages/components/src/index.ts`
4. Follow existing patterns (compound components, TypeScript types)

### Peer Dependencies
All components should work with:
- React >=16.8.0 (hooks support)
- @vainjs/hooks >=0.0.1 (utility hooks dependency)

### Build Process
- Rolldown builds both CJS and ESM formats with minification
- TypeScript declarations generated separately
- External dependencies excluded from bundle