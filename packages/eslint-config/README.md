# @vainjs/eslint-config

Modern ESLint configuration for TypeScript and React projects with Prettier integration.

## Features

- ✅ **TypeScript Support**: Full TypeScript ESLint configuration with recommended rules
- ✅ **React Support**: Comprehensive React configuration including JSX, Hooks, and Refresh
- ✅ **Prettier Integration**: Seamless Prettier formatting integration
- ✅ **Modern ESLint**: Uses ESLint's new flat config format (ESLint v9+)
- ✅ **Browser Globals**: Pre-configured browser environment globals
- ✅ **Consistent Imports**: Enforces consistent type imports

## Installation

```bash
# Using npm
npm install -D @vainjs/eslint-config

# Using pnpm
pnpm add -D @vainjs/eslint-config

# Using yarn
yarn add -D @vainjs/eslint-config
```

## Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install -D @eslint/js eslint prettier
```

## Usage

### Basic Configuration (TypeScript + Prettier)

```javascript
// eslint.config.js
import { base } from '@vainjs/eslint-config'

export default base
```

### React Configuration

```javascript
// eslint.config.js
import { react } from '@vainjs/eslint-config'

export default react
```

### Custom Configuration

You can extend the base configuration with your own rules:

```javascript
// eslint.config.js
import { base } from '@vainjs/eslint-config'

export default [
  ...base,
  {
    rules: {
      // Your custom rules here
      'no-console': 'warn',
    },
  },
]
```

## Configuration Options

### `base`

The base configuration includes:

- TypeScript ESLint recommended rules
- Prettier integration
- Browser globals
- Consistent type imports enforcement

### `react`

The React configuration includes everything from `base` plus:

- React JSX runtime configuration
- React Hooks rules
- React Refresh rules
- React-specific settings

## License

MIT © [VainJS](https://github.com/vainjs)
