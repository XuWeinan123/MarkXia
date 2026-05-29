This project was completed entirely through vibe coding.

# MarkXia

[简体中文](README_CN.md)

MarkXia is a Figma and FigJam widget for writing, editing, and rendering Markdown notes directly on the canvas.

The widget keeps its note content in Figma synced state and opens a lightweight editor panel for updates.

It supports light and dark themes from the widget property menu.

## Features

- Render headings, paragraphs, unordered lists, ordered lists, blockquotes, horizontal rules, code blocks, inline code, bold text, italic text, and simple tables.

- Edit Markdown in a Figma UI panel, then apply changes while keeping the editor open or save and close it.

- Store Markdown, title, and theme through `useSyncedState` so the widget state travels with the Figma file.

- Run without external network access; `manifest.json` sets allowed domains to `none`.

## Project Structure

- `widget-src/code.tsx`: the Figma widget source code and Markdown renderer.

- `ui.html`: the editor panel shown inside Figma.

- `manifest.json`: the Figma widget manifest.

- `package.json`: build, type-check, and lint scripts.

## Development

Install dependencies:

```bash
npm install
```

Build the widget bundle:

```bash
npm run build
```

Run TypeScript checks:

```bash
npm run tsc
```

Run lint checks:

```bash
npm run lint
```

Use watch mode while editing:

```bash
npm run watch
```

## Open Source Libraries And Licenses

The widget runtime code does not import third-party open source runtime libraries.

The project does use open source development dependencies for TypeScript, bundling, linting, and Figma widget typings.

The direct development dependencies listed in `package-lock.json` are:

| Package | Purpose | License | Source |
| --- | --- | --- | --- |
| `@eslint/js` | ESLint JavaScript rules package | MIT | [npm](https://www.npmjs.com/package/@eslint/js) |
| `@figma/eslint-plugin-figma-plugins` | Figma plugin/widget lint rules | MIT | [npm](https://www.npmjs.com/package/@figma/eslint-plugin-figma-plugins) |
| `@figma/widget-typings` | Figma widget TypeScript typings | MIT License | [npm](https://www.npmjs.com/package/@figma/widget-typings) |
| `@typescript-eslint/eslint-plugin` | TypeScript ESLint rules | MIT | [npm](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) |
| `@typescript-eslint/parser` | TypeScript parser for ESLint | BSD-2-Clause | [npm](https://www.npmjs.com/package/@typescript-eslint/parser) |
| `esbuild` | JavaScript and TypeScript bundler | MIT | [npm](https://www.npmjs.com/package/esbuild) |
| `eslint` | JavaScript and TypeScript linting tool | MIT | [npm](https://www.npmjs.com/package/eslint) |
| `typescript` | TypeScript language and compiler | Apache-2.0 | [npm](https://www.npmjs.com/package/typescript) |
| `typescript-eslint` | TypeScript ESLint tooling | MIT | [npm](https://www.npmjs.com/package/typescript-eslint) |

Figma widget APIs are provided by the Figma platform and are referenced through the widget typings package.

No separate project license file is currently declared in this repository.

## Figma Setup

Open Figma, import this folder as a development widget, and run the build script before loading the widget.

The compiled entry expected by the manifest is `dist/code.js`.
