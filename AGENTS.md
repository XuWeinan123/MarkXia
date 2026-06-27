# Repository Guidelines

## Project Structure & Module Organization

Markdown Canvas is a Figma/FigJam widget. The primary source lives in `widget-src/code.tsx`, which bundles to `dist/code.js` and is referenced by `manifest.json`. The editor UI is embedded from `ui.html`. Root-level images such as `LOGO.png`, `thumbnail.png`, and `carousel1.png` support README and marketplace presentation. `README.md`, `README_CN.md`, and `Markdown Formats.md` document behavior and supported Markdown syntax.

## Build, Test, and Development Commands

- `npm install` installs the local TypeScript, ESLint, Figma typings, and esbuild toolchain.
- `npm run build` bundles `widget-src/code.tsx` into `dist/code.js` for Figma.
- `npm run watch` rebuilds the widget bundle while developing.
- `npm run tsc` runs TypeScript validation with `widget-src/tsconfig.json`.
- `npm run lint` runs ESLint against `widget-src`.

After building, load this repository through Figma's development widget flow using `manifest.json`.

## Coding Style & Naming Conventions

Use TypeScript with strict checks and Figma widget JSX (`figma.widget.h`). Keep widget logic in `widget-src/code.tsx` unless a clear module split is needed. Prefer `const` for fixed values, `camelCase` for functions and variables, and `PascalCase` for widget components or type-like constructs. Existing code uses two-space indentation in config files and semicolons in TypeScript; match nearby style when editing. Prefix intentionally unused variables or catch bindings with `_` to satisfy ESLint.

## Testing Guidelines

There is no automated test suite in this repository yet. Before submitting changes, run `npm run tsc`, `npm run lint`, and `npm run build`. For behavior changes, manually test the widget in both Figma and FigJam when relevant, including Markdown rendering, editor shortcuts, synced state, theme toggles, and link/image handling.

## Commit & Pull Request Guidelines

Recent history uses short, imperative messages with prefixes such as `feat:`, `fix:`, and `docs:`. Follow that style, for example `fix: handle empty markdown links`. Pull requests should include a concise change summary, manual verification steps, screenshots or GIFs for visual widget changes, and linked issues when available. Note any limitations, unsupported Markdown cases, or Figma-specific testing gaps.

## Security & Configuration Tips

Keep `manifest.json` network access restricted unless a feature truly requires external domains. Do not commit secrets, personal Figma data, or generated dependency folders. Treat `dist/code.js` as build output that must match the current source before release.
