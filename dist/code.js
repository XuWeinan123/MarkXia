"use strict";
(() => {
  // widget-src/code.tsx
  var BUILD_ID = "markdown-canvas-widget-2026-05-29-widget-props-fix-1";
  console.log(`[Markdown Canvas] loaded ${BUILD_ID}`);
  var THEMES = {
    light: {
      bg: "#FFFFFF",
      stroke: "#E5E7EB",
      text: "#1F2937",
      muted: "#4B5563",
      accent: "#3B82F6",
      codeBg: "#F3F4F6",
      quoteBg: "#F9FAFB",
      tableHeaderBg: "#F3F4F6"
    },
    dark: {
      bg: "#0F121C",
      stroke: "#1E293B",
      text: "#D1D5DB",
      muted: "#94A3B8",
      accent: "#6366F1",
      codeBg: "#1E293B",
      quoteBg: "#161B2E",
      tableHeaderBg: "#1E293B"
    }
  };
  var WIDTH_OPTIONS = [360, 540, 720, 1080];
  var DEFAULT_FONT_FAMILY = "Noto Sans SC";
  var DEFAULT_MARKDOWN = `# Welcome to Markdown Canvas! \u{1F680}

This is a beautiful, light-default **Figma Markdown** widget.

### Features
- Support formatting like **bold**, *italics*, and \`inline code\`.
- Render indented **bullet points** dynamically.
- Display custom **tables** natively on the canvas:
- Use shortcuts in the editor: \`Cmd+S\` to save, \`Cmd+Shift+S\` to apply, \`Cmd+B/I/U\` for text styles, and \`Cmd+K\` for links.

| Package | Version | Status |
| --- | --- | --- |
| Marked | 4.3.0 | Embedded |
| Markdown Canvas | 1.1.0 | Active |

- Showcase blockquotes for highlights:
> "Design is not just what it looks like and feels like. Design is how it works." \u2014 Steve Jobs

---

*Select this note to open the edit panel and toggle themes from the bottom-left property menu!*`;
  function parseInlineSpans(str, isDark, defaultColor) {
    const { Span } = figma.widget;
    const tokens = [];
    let i = 0;
    let currentText = "";
    const pushText = () => {
      if (currentText) {
        tokens.push(currentText);
        currentText = "";
      }
    };
    while (i < str.length) {
      if (str[i] === "\\" && i + 1 < str.length && (str[i + 1] === "`" || str[i + 1] === "*" || str[i + 1] === "_")) {
        currentText += str[i + 1];
        i += 2;
        continue;
      }
      if (str[i] === "`") {
        pushText();
        const endIdx = str.indexOf("`", i + 1);
        if (endIdx !== -1) {
          const codeText = str.substring(i + 1, endIdx);
          tokens.push(
            /* @__PURE__ */ figma.widget.h(
              Span,
              {
                key: tokens.length,
                fontFamily: DEFAULT_FONT_FAMILY,
                fill: isDark ? "#818CF8" : "#2563EB"
              },
              " " + codeText + " "
            )
          );
          i = endIdx + 1;
        } else {
          currentText += "`";
          i++;
        }
        continue;
      }
      if (str[i] === "*" && str[i + 1] === "*" || str[i] === "_" && str[i + 1] === "_") {
        pushText();
        const delimiter = str.substring(i, i + 2);
        const endIdx = str.indexOf(delimiter, i + 2);
        if (endIdx !== -1) {
          const boldText = str.substring(i + 2, endIdx);
          tokens.push(
            /* @__PURE__ */ figma.widget.h(
              Span,
              {
                key: tokens.length,
                fontFamily: DEFAULT_FONT_FAMILY,
                fontWeight: "bold",
                fill: defaultColor
              },
              boldText
            )
          );
          i = endIdx + 2;
        } else {
          currentText += delimiter;
          i += 2;
        }
        continue;
      }
      if (str[i] === "*" || str[i] === "_") {
        pushText();
        const delimiter = str[i];
        const endIdx = str.indexOf(delimiter, i + 1);
        if (endIdx !== -1 && str[endIdx + 1] !== delimiter) {
          const italicText = str.substring(i + 1, endIdx);
          tokens.push(
            /* @__PURE__ */ figma.widget.h(
              Span,
              {
                key: tokens.length,
                fontFamily: DEFAULT_FONT_FAMILY,
                italic: true,
                fill: defaultColor
              },
              italicText
            )
          );
          i = endIdx + 1;
        } else {
          currentText += delimiter;
          i++;
        }
        continue;
      }
      currentText += str[i];
      i++;
    }
    pushText();
    return tokens;
  }
  function renderMarkdownToFigma(markdownText, theme) {
    const { AutoLayout, Text } = figma.widget;
    const isDark = theme === "dark";
    const styles = THEMES[theme];
    const blocks = [];
    const lines = markdownText.split("\n");
    let inCodeBlock = false;
    let codeBlockLines = [];
    let inTable = false;
    let tableRows = [];
    let listIndex = 1;
    const pushBlock = (block) => {
      blocks.push(block);
    };
    for (let idx = 0; idx < lines.length; idx++) {
      const origLine = lines[idx];
      const line = origLine.trim();
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const codeText = codeBlockLines.join("\n");
          pushBlock(
            /* @__PURE__ */ figma.widget.h(
              AutoLayout,
              {
                key: `code-${idx}`,
                direction: "vertical",
                width: "fill-parent",
                padding: 16,
                cornerRadius: 8,
                fill: styles.codeBg
              },
              /* @__PURE__ */ figma.widget.h(
                Text,
                {
                  width: "fill-parent",
                  fontFamily: DEFAULT_FONT_FAMILY,
                  fontSize: 13,
                  fill: isDark ? "#94A3B8" : "#4B5563"
                },
                codeText
              )
            )
          );
          codeBlockLines = [];
        } else {
          inCodeBlock = true;
        }
        continue;
      }
      if (inCodeBlock) {
        codeBlockLines.push(origLine);
        continue;
      }
      if (line.startsWith("|")) {
        inTable = true;
        const cells = line.split("|").map((c) => c.trim()).filter((_c, i, arr) => i > 0 && i < arr.length - 1);
        const isSeparator = cells.every((c) => c.startsWith("-") || c === "");
        if (!isSeparator) {
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        inTable = false;
        if (tableRows.length > 0) {
          const rowsToRender = [...tableRows];
          tableRows = [];
          pushBlock(
            /* @__PURE__ */ figma.widget.h(
              AutoLayout,
              {
                key: `table-${idx}`,
                direction: "vertical",
                width: "fill-parent",
                stroke: styles.stroke,
                strokeWidth: 1,
                cornerRadius: 8,
                padding: 0
              },
              rowsToRender.map((row, rIdx) => {
                const isHeader = rIdx === 0;
                return /* @__PURE__ */ figma.widget.h(
                  AutoLayout,
                  {
                    key: `row-${rIdx}`,
                    direction: "vertical",
                    width: "fill-parent",
                    fill: isHeader ? styles.tableHeaderBg : styles.bg,
                    padding: 0
                  },
                  /* @__PURE__ */ figma.widget.h(
                    AutoLayout,
                    {
                      direction: "horizontal",
                      width: "fill-parent",
                      padding: { top: 8, bottom: 8, left: 12, right: 12 }
                    },
                    row.map((cell, cIdx) => /* @__PURE__ */ figma.widget.h(
                      AutoLayout,
                      {
                        key: `cell-${cIdx}`,
                        width: "fill-parent",
                        padding: 0
                      },
                      /* @__PURE__ */ figma.widget.h(
                        Text,
                        {
                          width: "fill-parent",
                          fontFamily: DEFAULT_FONT_FAMILY,
                          fontSize: 13,
                          fontWeight: isHeader ? "bold" : "normal",
                          fill: isHeader ? styles.text : styles.muted
                        },
                        parseInlineSpans(cell, isDark, isHeader ? styles.text : styles.muted)
                      )
                    ))
                  ),
                  /* @__PURE__ */ figma.widget.h(
                    AutoLayout,
                    {
                      width: "fill-parent",
                      height: 1,
                      fill: styles.stroke
                    }
                  )
                );
              })
            )
          );
        }
      }
      if (line === "") {
        continue;
      }
      if (line.startsWith("# ")) {
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            Text,
            {
              key: `h1-${idx}`,
              width: "fill-parent",
              fontFamily: DEFAULT_FONT_FAMILY,
              fontSize: 24,
              fontWeight: "bold",
              lineHeight: "auto",
              fill: styles.text
            },
            parseInlineSpans(line.substring(2), isDark, styles.text)
          )
        );
      } else if (line.startsWith("## ")) {
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            Text,
            {
              key: `h2-${idx}`,
              width: "fill-parent",
              fontFamily: DEFAULT_FONT_FAMILY,
              fontSize: 22,
              fontWeight: "bold",
              lineHeight: "auto",
              fill: styles.text
            },
            parseInlineSpans(line.substring(3), isDark, styles.text)
          )
        );
      } else if (line.startsWith("### ")) {
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            Text,
            {
              key: `h3-${idx}`,
              width: "fill-parent",
              fontFamily: DEFAULT_FONT_FAMILY,
              fontSize: 20,
              fontWeight: "bold",
              lineHeight: "auto",
              fill: styles.text
            },
            parseInlineSpans(line.substring(4), isDark, styles.text)
          )
        );
      } else if (line.startsWith("#### ")) {
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            Text,
            {
              key: `h4-${idx}`,
              width: "fill-parent",
              fontFamily: DEFAULT_FONT_FAMILY,
              fontSize: 18,
              fontWeight: "bold",
              lineHeight: "auto",
              fill: styles.text
            },
            parseInlineSpans(line.substring(5), isDark, styles.text)
          )
        );
      } else if (line.startsWith("##### ")) {
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            Text,
            {
              key: `h5-${idx}`,
              width: "fill-parent",
              fontFamily: DEFAULT_FONT_FAMILY,
              fontSize: 16,
              fontWeight: "bold",
              lineHeight: "auto",
              fill: styles.text
            },
            parseInlineSpans(line.substring(6), isDark, styles.text)
          )
        );
      } else if (line.startsWith("###### ")) {
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            Text,
            {
              key: `h6-${idx}`,
              width: "fill-parent",
              fontFamily: DEFAULT_FONT_FAMILY,
              fontSize: 15,
              fontWeight: "bold",
              lineHeight: "auto",
              fill: styles.text
            },
            parseInlineSpans(line.substring(7), isDark, styles.text)
          )
        );
      } else if (line.startsWith(">")) {
        const quoteText = line.substring(1).trim();
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              key: `quote-${idx}`,
              direction: "horizontal",
              width: "fill-parent",
              fill: styles.quoteBg,
              padding: { left: 16, top: 4, bottom: 4, right: 12 }
            },
            /* @__PURE__ */ figma.widget.h(
              Text,
              {
                width: "fill-parent",
                fontFamily: DEFAULT_FONT_FAMILY,
                fontSize: 14,
                lineHeight: 20,
                italic: true,
                fill: styles.muted
              },
              parseInlineSpans(quoteText, isDark, styles.muted)
            )
          )
        );
      } else if (line.startsWith("- ") || line.startsWith("* ")) {
        const itemText = line.substring(2);
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              key: `ul-${idx}`,
              direction: "horizontal",
              width: "fill-parent",
              spacing: 8
            },
            /* @__PURE__ */ figma.widget.h(Text, { fontFamily: DEFAULT_FONT_FAMILY, fontSize: 14, lineHeight: 20, fill: styles.accent, fontWeight: "bold", width: 16 }, "\u2022"),
            /* @__PURE__ */ figma.widget.h(
              Text,
              {
                width: "fill-parent",
                fontFamily: DEFAULT_FONT_FAMILY,
                fontSize: 14,
                lineHeight: 20,
                fill: styles.muted
              },
              parseInlineSpans(itemText, isDark, styles.muted)
            )
          )
        );
      } else if (/^\d+\.\s+/.test(line)) {
        const dotIdx = line.indexOf(".");
        const itemText = line.substring(dotIdx + 1).trim();
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              key: `ol-${idx}`,
              direction: "horizontal",
              width: "fill-parent",
              spacing: 8
            },
            /* @__PURE__ */ figma.widget.h(Text, { fontFamily: DEFAULT_FONT_FAMILY, fontSize: 14, lineHeight: 20, fill: styles.accent, fontWeight: "bold", width: 16 }, listIndex++, "."),
            /* @__PURE__ */ figma.widget.h(
              Text,
              {
                width: "fill-parent",
                fontFamily: DEFAULT_FONT_FAMILY,
                fontSize: 14,
                lineHeight: 20,
                fill: styles.muted
              },
              parseInlineSpans(itemText, isDark, styles.muted)
            )
          )
        );
      } else if (line === "---") {
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              key: `hr-${idx}`,
              width: "fill-parent",
              height: 1,
              fill: styles.stroke,
              padding: { top: 8, bottom: 8 }
            }
          )
        );
      } else {
        listIndex = 1;
        pushBlock(
          /* @__PURE__ */ figma.widget.h(
            Text,
            {
              key: `p-${idx}`,
              width: "fill-parent",
              fontFamily: DEFAULT_FONT_FAMILY,
              fontSize: 14,
              lineHeight: 20,
              fill: styles.muted
            },
            parseInlineSpans(line, isDark, styles.muted)
          )
        );
      }
    }
    return blocks;
  }
  function Widget() {
    const { AutoLayout, useSyncedState, usePropertyMenu, waitForTask } = figma.widget;
    const [markdown, setMarkdown] = useSyncedState("markdown", DEFAULT_MARKDOWN);
    const [title, setTitle] = useSyncedState("title", "Markdown Canvas Note");
    const [theme, setTheme] = useSyncedState("theme", "light");
    const [widgetWidth, setWidgetWidth] = useSyncedState("widgetWidth", 540);
    const isDark = theme === "dark";
    const styles = THEMES[isDark ? "dark" : "light"];
    usePropertyMenu(
      [
        {
          itemType: "action",
          tooltip: "\u{1F4DD} Edit",
          propertyName: "edit",
          icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.146 1.854a.5.5 0 0 1 .708 0l1.292 1.292a.5.5 0 0 1 0 .708L13 5.003 10.998 3l1.148-1.146zM10.29 3.71L2 12v2h2l8.29-8.29-2-2z" fill="currentColor"/></svg>`
        },
        {
          itemType: "dropdown",
          tooltip: "Select Theme",
          propertyName: "theme",
          options: [
            { label: "\u2600\uFE0F Light", option: "light" },
            { label: "\u{1F319} Dark", option: "dark" }
          ],
          selectedOption: theme
        },
        {
          itemType: "dropdown",
          tooltip: "Widget Width",
          propertyName: "widgetWidth",
          options: WIDTH_OPTIONS.map((width) => ({
            label: `${width}px`,
            option: String(width)
          })),
          selectedOption: String(widgetWidth)
        }
      ],
      (event) => {
        if (event.propertyName === "edit") {
          figma.showUI(__html__, {
            width: 540,
            height: 600,
            title: "Edit " + title
          });
          waitForTask(new Promise((resolve) => {
            figma.ui.onmessage = (msg) => {
              if (msg.type === "save-markdown") {
                setMarkdown(msg.markdown);
                setTitle(msg.title);
                figma.notify("Markdown updated on canvas!");
                if (!msg.keepOpen) {
                  figma.ui.onmessage = void 0;
                  figma.closePlugin();
                  resolve();
                }
              }
            };
          }));
          figma.ui.postMessage({
            type: "init-state",
            title,
            markdown,
            theme
          });
        } else if (event.propertyName === "theme") {
          const val = event.propertyValue;
          if (val === "light" || val === "dark") {
            setTheme(val);
          }
        } else if (event.propertyName === "widgetWidth") {
          const nextWidth = Number(event.propertyValue);
          if (WIDTH_OPTIONS.includes(nextWidth)) {
            setWidgetWidth(nextWidth);
          }
        }
      }
    );
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "vertical",
        padding: 32,
        fill: styles.bg,
        stroke: styles.stroke,
        strokeWidth: 1,
        cornerRadius: 16,
        spacing: 16,
        width: widgetWidth
      },
      renderMarkdownToFigma(markdown, isDark ? "dark" : "light")
    );
  }
  figma.widget.register(Widget);
})();
