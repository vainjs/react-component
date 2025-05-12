# @vainjs/rc - React Component Library

一个基于 pnpm 的 monorepo 项目，用于开发常用的 React 组件。

## 🚀 特性

- 🎯 **现代化技术栈**: React 19 + TypeScript 5.8 + Rolldown
- 📦 **Monorepo 架构**: 基于 pnpm workspaces，统一管理依赖
- 🔧 **开箱即用**: 完整的构建、测试、文档配置
- 📖 **Storybook 文档**: 交互式组件文档和演示
- ⚡ **快速构建**: 使用 Rolldown (Rust) 构建，比传统工具更快

## 📦 包含组件

- **Splitter** - 可调整大小的面板分割器
- **KeepAlive** - 组件状态保持工具
- **SortTable** - 可排序的表格组件
- **TreeTransfer** - 树形数据穿梭框
- **FlexBox** - 灵活的布局容器

## 🛠 技术栈

- **包管理器**: pnpm 10.4.1
- **构建工具**: Rolldown (基于 Rust 的现代打包工具)
- **前端框架**: React 19.1.0
- **类型系统**: TypeScript 5.8.3
- **文档工具**: Storybook 9.1.3
- **代码规范**: ESLint + Prettier
- **测试工具**: Vitest

## 🎯 快速开始

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
# 启动 Storybook 开发服务器
pnpm run dev
```

### 构建组件库
```bash
# 构建组件库到 dist/
pnpm run build:rc
```

## 📁 项目结构

```
react-component/
├── components/          # 主要组件库 (@vainjs/rc)
│   ├── src/
│   │   ├── splitter/   # 分割器组件
│   │   ├── keep-alive/ # 状态保持组件
│   │   ├── sort-table/ # 排序表格
│   │   ├── tree-transfer/ # 树形穿梭框
│   │   └── flex-box/   # 弹性布局
│   └── rolldown.config.ts
├── docs/               # Storybook 文档站点
│   ├── stories/        # 组件故事
│   └── package.json
└── pnpm-workspace.yaml # 工作空间配置
```

## 🔗 使用方式

### 安装
```bash
npm install @vainjs/rc
# 或
pnpm add @vainjs/rc
```

### 引入组件
```tsx
import { Splitter } from '@vainjs/rc'

function App() {
  return (
    <Splitter>
      <div>Panel 1</div>
      <div>Panel 2</div>
    </Splitter>
  )
}
```

### Peer Dependencies
确保项目中已安装以下依赖：
- `react` >= 16.8.0
- `react-dom` >= 16.8.0
- `@vainjs/hooks` >= 0.01

## 🧪 开发命令

### 根目录命令
```bash
pnpm run dev          # 启动 Storybook
pnpm run build:rc     # 构建组件库
```

### 组件库 (components/)
```bash
pnpm run build        # 构建到 dist/
```

### 文档站点 (docs/)
```bash
pnpm run storybook    # 启动 Storybook (端口 6007)
pnpm run lint         # 代码检查
pnpm run build-storybook # 构建文档
```

## 📋 构建输出

组件库支持多种模块格式：
- **CommonJS**: `dist/index.cjs`
- **ES Modules**: `dist/index.esm.js`
- **TypeScript 声明**: `dist/index.d.ts`

## 🏗 开发工作流

1. 在 `components/src/` 中开发组件
2. 在 `docs/stories/` 中创建组件文档
3. 使用 `pnpm run dev` 预览效果
4. 使用 `pnpm run build:rc` 构建发布

## 📄 许可证

MIT License