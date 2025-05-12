# Development Guide

React 组件库 monorepo 开发指南。

## 项目结构

```
components/src/
├── splitter/      # 可调整面板分割器
├── keep-alive/    # 组件状态保持
├── sort-table/    # 排序表格
├── tree-transfer/ # 树形穿梭框
└── flex-box/      # 弹性布局
```

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发环境 (Storybook)
pnpm run dev

# 构建组件库
pnpm run build:rc

# 进入组件包构建
cd components && pnpm run build

# 文档相关
cd docs && pnpm run lint
cd docs && pnpm run storybook
```

## 技术栈

- **构建工具**: Rolldown (Rust-based)
- **包管理**: pnpm workspaces + catalog
- **类型检查**: TypeScript 5.8 (strict mode)
- **代码规范**: ESLint + Prettier
- **文档**: Storybook (端口 6007)

## 构建配置

- **入口**: `components/src/index.ts`
- **输出**: CJS + ESM + TypeScript declarations
- **外部依赖**: React, React-DOM, @vainjs/hooks

## 开发流程

1. 在 `components/src/` 开发组件
2. 在 `docs/stories/` 添加文档
3. 使用 `pnpm run dev` 预览
4. 使用 `pnpm run build:rc` 构建

## 注意事项

- 仅导出 splitter 组件 (需更新 index.ts)
- 使用 workspace 协议管理内部依赖
- React 19+ 兼容，向下支持 16.8+