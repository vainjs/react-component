# @vainjs/rc - React Component Library

A pnpm-based monorepo project for developing commonly used React components.

## Installation

```bash
pnpm add @vainjs/rc
```

## Included Components

- **Splitter** - Resizable panel splitter
- **KeepAlive** - Component state preservation utility
- **SortTable** - Sortable table component
- **TreeTransfer** - Tree data transfer component
- **FlexBox** - Flexible layout container

## Quick Start

### Install Dependencies

```bash
pnpm install
```

### Development Mode

```bash
# Start Storybook development server (port 6007)
pnpm start
```

### Build Component Library

```bash
# Build component library to dist/
pnpm run build:rc

# Build ESLint configuration package
pnpm run build:eslint
```

## Project Structure

```
react-component/
├── packages/                  # Monorepo packages directory
│   ├── components/            # Main component library (@vainjs/rc)
│   │   ├── src/
│   │   │   ├── splitter/      # Splitter component
│   │   │   ├── keep-alive/    # Keep-alive component
│   │   │   ├── sort-table/    # Sortable table component
│   │   │   ├── tree-transfer/ # Tree transfer component
│   │   │   └── flex-box/      # Flexbox layout component
│   │   └── rolldown.config.ts
│   └── eslint-config/         # ESLint configuration package (@vainjs/eslint-config)
├── docs/                      # Storybook documentation site
│   ├── stories/               # Component stories
│   └── package.json
```

## Development Standards

### Git Commit Standards

The project uses [Conventional Commits](https://www.conventionalcommits.org/) specification. Commit message format is as follows:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

Examples:

- `feat(splitter): add resizable splitter component`
- `fix(keep-alive): fix component state preservation issue`
