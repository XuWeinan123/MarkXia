This project was completed entirely through vibe coding.

# MarkXia

[简体中文](README_CN.md)

MarkXia is a Figma and FigJam widget for writing, editing, and rendering Markdown notes directly on the canvas.

The widget keeps its note content in Figma synced state and opens a lightweight editor panel for updates.

It supports light and dark themes from the widget property menu.

## Features

- Edit Markdown in a Figma UI panel, then apply changes while keeping the editor open or save and close it.

- Store Markdown, title, and theme through `useSyncedState` so the widget state travels with the Figma file.

- Run without external network access; `manifest.json` sets allowed domains to `none`.

## Supported Markdown Syntax

MarkXia supports a subset of standard Markdown and GitHub Flavored Markdown (GFM) features natively rendered on the Figma canvas:

| Markdown Feature | Syntax Example | Support Status | Notes / Limitations |
| :--- | :--- | :---: | :--- |
| **H1, H2, H3 Headings** | `# Heading 1`<br>`## Heading 2`<br>`### Heading 3` | **Supported** | Main headings render as large, bold text. |
| **H4, H5, H6 Headings** | `#### Heading 4` | **Not Supported** | Fall back to standard paragraphs. |
| **Bold Text** | `**bold**` or `__bold__` | **Supported** | Rendered in bold typeface. |
| **Italic Text** | `*italic*` or `_italic_` | **Supported** | Rendered in italic typeface. |
| **Bold Italic Text** | `***bold italic***` | **Not Supported** | Will not correctly parse both styles combined. |
| **Strikethrough** | `~~strikethrough~~` | **Not Supported** | Renders as raw `~~` characters. |
| **Underline** | `<u>underline</u>` | **Not Supported** | Renders literal HTML tags. |
| **Highlights** | `==highlight==` | **Not Supported** | Renders as raw `==` characters. |
| **Superscript & Subscript** | `x^2^`, `H~2~O` | **Not Supported** | Renders as raw `^` or `~` characters. |
| **Plain Paragraphs** | Standard text | **Supported** | Styled in theme-based muted text color. |
| **Line Breaks** | Trailing spaces or `<br>` | **Not Supported** | Renders as one line or literal HTML `<br>`. Dual carriage returns are required for paragraphs. |
| **Unordered Lists** | `- item` or `* item` | **Supported** | Rendered with a custom bullet point `•`. |
| **Ordered Lists** | `1. item` | **Supported** | Rendered with auto-incrementing numbers. |
| **Nested Lists** | Indented list items | **Not Supported** | All lines are trimmed, rendering flat list items. |
| **GFM Task Lists** | `- [ ] todo` | **Not Supported** | Renders raw `• [ ] todo` text. |
| **Definition Lists** | `term`<br>`: definition` | **Not Supported** | Renders as standard plain paragraphs. |
| **Standard Blockquotes** | `> quote` | **Supported** | Styled with theme quoteBg and italicized text. |
| **Nested Blockquotes** | `> > nested` | **Not Supported** | Flat parsing. Renders as a single quote block with leading `>` characters inside. |
| **GFM Alerts** | `> [!NOTE]` | **Not Supported** | Renders as a standard blockquote with literal `[!NOTE]` text. |
| **Inline Code** | `` `code` `` | **Supported** | Styled with accent colors and padded spacing. |
| **Fenced Code Blocks** | ` ```javascript ` | **Supported** | Rendered inside a stylized code block container. |
| **Syntax Highlighting** | ` ```python ` | **Not Supported** | Code is displayed as plain, uniform text. |
| **Hyperlinks** | `[text](url)` | **Not Supported** | Renders as literal text. |
| **Images** | `![alt](url)` | **Not Supported** | Renders as literal text. |
| **Simple Tables** | `| Header |` | **Supported** | AutoLayout-based grid rendering natively in Figma. |
| **Table Alignment** | `| :--- | ---: |` | **Not Supported** | Alignment syntax is ignored; cells are left-aligned. |
| **LaTeX Equations** | `$E=mc^2$` or `$$...$$` | **Not Supported** | Renders as raw LaTeX code. |
| **Footnotes** | `[^1]` | **Not Supported** | Renders as literal text. |
| **HTML Details** | `<details>` | **Not Supported** | Renders literal HTML. |
| **Keyboard Tags** | `<kbd>Ctrl</kbd>` | **Not Supported** | Renders literal HTML tags. |
| **GFM Emojis** | `:rocket:` | **Not Supported** | Raw shortcodes are not parsed, but direct Unicode emojis (e.g. `🚀`) are fully supported. |
| **Mermaid Diagrams** | ` ```mermaid ` | **Not Supported** | Renders as raw Mermaid text inside a code block. |
