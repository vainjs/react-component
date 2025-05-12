# @vainjs/rc - React Component Library

一个基于 pnpm 的 monorepo 项目，用于开发常用的 React 组件。

## 安装

```bash
pnpm add @vainjs/rc
```

## 包含组件

- **Splitter** - 可调整大小的面板分割器
- **KeepAlive** - 组件状态保持工具
- **SortTable** - 可排序的表格组件
- **TreeTransfer** - 树形数据穿梭框
- **FlexBox** - 灵活的布局容器

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动 Storybook 开发服务器（端口 6007）
pnpm start
```

### 构建组件库

```bash
# 构建组件库到 dist/
pnpm run build:rc

# 构建 ESLint 配置包
pnpm run build:eslint
```

## 项目结构

```
react-component/
├── packages/                 # Monorepo 包目录
│   ├── components/           # 主要组件库 (@vainjs/rc)
│   │   ├── src/
│   │   │   ├── splitter/    # 分割器组件
│   │   │   ├── keep-alive/  # 状态保持组件
│   │   │   ├── sort-table/  # 排序表格
│   │   │   ├── tree-transfer/ # 树形穿梭框
│   │   │   └── flex-box/    # 弹性布局
│   │   └── rolldown.config.ts
│   └── eslint-config/        # ESLint 配置包 (@vainjs/eslint-config)
├── docs/                     # Storybook 文档站点
│   ├── stories/              # 组件故事
│   └── package.json
├── .husky/                   # Git hooks 配置
│   ├── commit-msg           # commitlint 钩子
│   └── pre-commit           # lint-staged 钩子
└── pnpm-workspace.yaml       # pnpm 工作空间配置
```

## 开发规范

### Git Commit 规范

项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范，提交消息格式如下：

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

示例：

- `feat(splitter): 添加可调整大小的分割器组件`
- `fix(keep-alive): 修复组件状态保持问题`
