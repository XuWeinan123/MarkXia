This project was completed entirely through vibe coding.

# Markdown Canvas

[简体中文](README_CN.md)

Markdown Canvas is a Figma and FigJam widget for writing, editing, and rendering Markdown notes directly on the canvas.

The widget keeps its note content in Figma synced state and opens a lightweight editor panel for updates.

It supports light and dark themes from the widget property menu.

## Features

- Edit Markdown in a Figma UI panel, then apply changes while keeping the editor open or save and close it.

- Store Markdown, title, and theme through `useSyncedState` so the widget state travels with the Figma file.

- Run without external network access; `manifest.json` sets allowed domains to `none`.

## Supported Markdown Syntax

Markdown Canvas supports a subset of standard Markdown and GitHub Flavored Markdown (GFM) features natively rendered on the Figma canvas:

| Markdown Feature            | Syntax Example                                     | Support Status | Notes / Limitations                                                                            |
| :-------------------------- | :------------------------------------------------- | :------------: | :--------------------------------------------------------------------------------------------- |
| **H1-H6 Headings**          | `# H1`<br>`## H2`<br>`### H3`<br>`#### H4`<br>`##### H5`<br>`###### H6` |       ✅        | Headings render in bold with sizes 24, 22, 20, 18, 16, 15 and auto line height. |
| **Bold Text**               | `**bold**` or `__bold__`                           |       ✅        | Rendered in bold typeface.                                                                     |
| **Italic Text**             | `*italic*` or `_italic_`                           |       ✅        | Rendered in italic typeface.                                                                   |
| **Bold Italic Text**        | `***bold italic***`                                |       ❌        | Will not correctly parse both styles combined.                                                 |
| **Strikethrough**           | `~~strikethrough~~`                                |       ❌        | Renders as raw `~~` characters.                                                                |
| **Underline**               | `<u>underline</u>`                                 |       ❌        | Renders literal HTML tags.                                                                     |
| **Highlights**              | `==highlight==`                                    |       ❌        | Renders as raw `==` characters.                                                                |
| **Superscript & Subscript** | `x^2^`, `H~2~O`                                    |       ❌        | Renders as raw `^` or `~` characters.                                                          |
| **Plain Paragraphs**        | Standard text                                      |       ✅        | Styled in theme-based muted text color.                                                        |
| **Line Breaks**             | Trailing spaces or `<br>`                          |       ❌        | Renders as one line or literal HTML `<br>`. Dual carriage returns are required for paragraphs. |
| **Unordered Lists**         | `- item` or `* item`                               |       ✅        | Rendered with a custom bullet point `•`.                                                       |
| **Ordered Lists**           | `1. item`                                          |       ✅        | Rendered with auto-incrementing numbers.                                                       |
| **Nested Lists**            | Indented list items                                |       ❌        | All lines are trimmed, rendering flat list items.                                              |
| **GFM Task Lists**          | `- [ ] todo`                                       |       ❌        | Renders raw `• [ ] todo` text.                                                                 |
| **Definition Lists**        | `term`<br>`: definition`                           |       ❌        | Renders as standard plain paragraphs.                                                          |
| **Standard Blockquotes**    | `> quote`                                          |       ✅        | Styled with theme quoteBg and italicized text.                                                 |
| **Nested Blockquotes**      | `> > nested`                                       |       ❌        | Flat parsing. Renders as a single quote block with leading `>` characters inside.              |
| **GFM Alerts**              | `> [!NOTE]`                                        |       ❌        | Renders as a standard blockquote with literal `[!NOTE]` text.                                  |
| **Inline Code**             | `` `code` ``                                       |       ✅        | Styled with accent colors and padded spacing.                                                  |
| **Fenced Code Blocks**      | ` ```javascript `                                  |       ✅        | Rendered inside a stylized code block container.                                               |
| **Syntax Highlighting**     | ` ```python `                                      |       ❌        | Code is displayed as plain, uniform text.                                                      |
| **Hyperlinks**              | `[text](url)`                                      |       ❌        | Renders as literal text.                                                                       |
| **Images**                  | `![alt](url)`                                      |       ❌        | Renders as literal text.                                                                       |
| **LaTeX Equations**         | `$E=mc^2$` or `$$...$$`                            |       ❌        | Renders as raw LaTeX code.                                                                     |
| **Footnotes**               | `[^1]`                                             |       ❌        | Renders as literal text.                                                                       |
| **HTML Details**            | `<details>`                                        |       ❌        | Renders literal HTML.                                                                          |
| **Keyboard Tags**           | `<kbd>Ctrl</kbd>`                                  |       ❌        | Renders literal HTML tags.                                                                     |
| **GFM Emojis**              | `:rocket:`                                         |       ❌        | Raw shortcodes are not parsed, but direct Unicode emojis (e.g. `🚀`) are fully supported.       |
| **Mermaid Diagrams**        | ` ```mermaid `                                     |       ❌        | Renders as raw Mermaid text inside a code block.                                               |
