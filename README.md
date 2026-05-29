This project was completed entirely through vibe coding.
本项目完全通过 vibe coding 完成。

# MarkXia
# MarkXia

MarkXia is a Figma and FigJam widget for writing, editing, and rendering Markdown notes directly on the canvas.
MarkXia 是一个 Figma 与 FigJam 小组件，可直接在画布上编写、编辑并渲染 Markdown 笔记。

The widget keeps its note content in Figma synced state and opens a lightweight editor panel for updates.
该小组件使用 Figma 同步状态保存笔记内容，并通过轻量编辑面板进行更新。

It supports light and dark themes from the widget property menu.
它支持通过小组件属性菜单切换浅色与深色主题。

## Features
## 功能

- Render headings, paragraphs, unordered lists, ordered lists, blockquotes, horizontal rules, code blocks, inline code, bold text, italic text, and simple tables.
- 可渲染标题、段落、无序列表、有序列表、引用、分隔线、代码块、行内代码、粗体、斜体和简单表格。

- Edit Markdown in a Figma UI panel, then apply changes while keeping the editor open or save and close it.
- 可在 Figma UI 面板中编辑 Markdown，并可选择应用后保持编辑器打开，或保存后关闭编辑器。

- Store Markdown, title, and theme through `useSyncedState` so the widget state travels with the Figma file.
- 通过 `useSyncedState` 保存 Markdown、标题和主题，使小组件状态随 Figma 文件一起保存。

- Run without external network access; `manifest.json` sets allowed domains to `none`.
- 运行时不访问外部网络；`manifest.json` 将允许域名设置为 `none`。

## Project Structure
## 项目结构

- `widget-src/code.tsx`: the Figma widget source code and Markdown renderer.
- `widget-src/code.tsx`：Figma 小组件源码与 Markdown 渲染器。

- `ui.html`: the editor panel shown inside Figma.
- `ui.html`：在 Figma 中显示的编辑面板。

- `manifest.json`: the Figma widget manifest.
- `manifest.json`：Figma 小组件清单文件。

- `package.json`: build, type-check, and lint scripts.
- `package.json`：构建、类型检查和代码检查脚本。

## Development
## 开发

Install dependencies:
安装依赖：

```bash
npm install
```

Build the widget bundle:
构建小组件产物：

```bash
npm run build
```

Run TypeScript checks:
运行 TypeScript 类型检查：

```bash
npm run tsc
```

Run lint checks:
运行代码检查：

```bash
npm run lint
```

Use watch mode while editing:
编辑时可使用监听模式：

```bash
npm run watch
```

## Open Source Libraries And Licenses
## 开源库与开源协议

The widget runtime code does not import third-party open source runtime libraries.
小组件运行时代码没有导入第三方开源运行时库。

The project does use open source development dependencies for TypeScript, bundling, linting, and Figma widget typings.
本项目使用了用于 TypeScript、打包、代码检查和 Figma 小组件类型定义的开源开发依赖。

The direct development dependencies listed in `package-lock.json` are:
`package-lock.json` 中列出的直接开发依赖如下：

| Package | Purpose | License | Source |
| --- | --- | --- | --- |
| `@eslint/js` | ESLint JavaScript rules package | MIT | [npm](https://www.npmjs.com/package/@eslint/js) |
| `@eslint/js` | ESLint JavaScript 规则包 | MIT | [npm](https://www.npmjs.com/package/@eslint/js) |
| `@figma/eslint-plugin-figma-plugins` | Figma plugin/widget lint rules | MIT | [npm](https://www.npmjs.com/package/@figma/eslint-plugin-figma-plugins) |
| `@figma/eslint-plugin-figma-plugins` | Figma 插件/小组件代码检查规则 | MIT | [npm](https://www.npmjs.com/package/@figma/eslint-plugin-figma-plugins) |
| `@figma/widget-typings` | Figma widget TypeScript typings | MIT License | [npm](https://www.npmjs.com/package/@figma/widget-typings) |
| `@figma/widget-typings` | Figma 小组件 TypeScript 类型定义 | MIT License | [npm](https://www.npmjs.com/package/@figma/widget-typings) |
| `@typescript-eslint/eslint-plugin` | TypeScript ESLint rules | MIT | [npm](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) |
| `@typescript-eslint/eslint-plugin` | TypeScript ESLint 规则 | MIT | [npm](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) |
| `@typescript-eslint/parser` | TypeScript parser for ESLint | BSD-2-Clause | [npm](https://www.npmjs.com/package/@typescript-eslint/parser) |
| `@typescript-eslint/parser` | ESLint 使用的 TypeScript 解析器 | BSD-2-Clause | [npm](https://www.npmjs.com/package/@typescript-eslint/parser) |
| `esbuild` | JavaScript and TypeScript bundler | MIT | [npm](https://www.npmjs.com/package/esbuild) |
| `esbuild` | JavaScript 与 TypeScript 打包工具 | MIT | [npm](https://www.npmjs.com/package/esbuild) |
| `eslint` | JavaScript and TypeScript linting tool | MIT | [npm](https://www.npmjs.com/package/eslint) |
| `eslint` | JavaScript 与 TypeScript 代码检查工具 | MIT | [npm](https://www.npmjs.com/package/eslint) |
| `typescript` | TypeScript language and compiler | Apache-2.0 | [npm](https://www.npmjs.com/package/typescript) |
| `typescript` | TypeScript 语言与编译器 | Apache-2.0 | [npm](https://www.npmjs.com/package/typescript) |
| `typescript-eslint` | TypeScript ESLint tooling | MIT | [npm](https://www.npmjs.com/package/typescript-eslint) |
| `typescript-eslint` | TypeScript ESLint 工具集 | MIT | [npm](https://www.npmjs.com/package/typescript-eslint) |

Figma widget APIs are provided by the Figma platform and are referenced through the widget typings package.
Figma 小组件 API 由 Figma 平台提供，并通过 widget typings 包进行类型引用。

No separate project license file is currently declared in this repository.
当前仓库尚未声明单独的项目许可证文件。

## Figma Setup
## Figma 设置

Open Figma, import this folder as a development widget, and run the build script before loading the widget.
打开 Figma，将此文件夹作为开发小组件导入，并在加载小组件前运行构建脚本。

The compiled entry expected by the manifest is `dist/code.js`.
清单文件期望的编译入口是 `dist/code.js`。
