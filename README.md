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
