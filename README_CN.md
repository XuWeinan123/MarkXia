本项目完全通过 vibe coding 完成。

# MarkXia

[English](README.md)

MarkXia 是一个 Figma 与 FigJam 小组件，可直接在画布上编写、编辑并渲染 Markdown 笔记。

该小组件使用 Figma 同步状态保存笔记内容，并通过轻量编辑面板进行更新。

它支持通过小组件属性菜单切换浅色与深色主题。

## 功能

- 可渲染标题、段落、无序列表、有序列表、引用、分隔线、代码块、行内代码、粗体、斜体和简单表格。

- 可在 Figma UI 面板中编辑 Markdown，并可选择应用后保持编辑器打开，或保存后关闭编辑器。

- 通过 `useSyncedState` 保存 Markdown、标题和主题，使小组件状态随 Figma 文件一起保存。

- 运行时不访问外部网络；`manifest.json` 将允许域名设置为 `none`。
