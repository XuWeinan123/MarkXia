/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../node_modules/@figma/widget-typings/index.d.ts" />
declare const figma: PluginAPI;
declare const __html__: string;

// Simplified MarkXia Markdown Note Widget for Figma & FigJam
const BUILD_ID = "markxia-widget-2026-05-29-widget-props-fix-1";
console.log(`[MarkXia] loaded ${BUILD_ID}`);

const THEMES = {
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

const DEFAULT_MARKDOWN = `# Welcome to MarkXia! 🚀

This is a beautiful, light-default **Figma Markdown** widget.

### Features
- Support formatting like **bold**, *italics*, and \`inline code\`.
- Render indented **bullet points** dynamically.
- Display custom **tables** natively on the canvas:

| Package | Version | Status |
| --- | --- | --- |
| Marked | 4.3.0 | Embedded |
| MarkXia | 1.1.0 | Active |

- Showcase blockquotes for highlights:
> "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs

---

*Select this note to open the edit panel and toggle themes from the bottom-left property menu!*`;

// 1. Inline span parser to support bold, italic, inline code
function parseInlineSpans(str: string, isDark: boolean, defaultColor: string) {
  const { Span } = figma.widget;
  const tokens: any[] = [];

  let i = 0;
  let currentText = '';

  const pushText = () => {
    if (currentText) {
      tokens.push(currentText);
      currentText = '';
    }
  };

  while (i < str.length) {
    // Escaped characters check
    if (str[i] === '\\' && i + 1 < str.length && (str[i + 1] === '`' || str[i + 1] === '*' || str[i + 1] === '_')) {
      currentText += str[i + 1];
      i += 2;
      continue;
    }

    // Inline code (fenced with ` )
    if (str[i] === '`') {
      pushText();
      const endIdx = str.indexOf('`', i + 1);
      if (endIdx !== -1) {
        const codeText = str.substring(i + 1, endIdx);
        tokens.push(
          <Span
            key={tokens.length}
            fontFamily="Inter"
            fill={isDark ? "#818CF8" : "#2563EB"}
          >
            {" " + codeText + " "}
          </Span>
        );
        i = endIdx + 1;
      } else {
        currentText += '`';
        i++;
      }
      continue;
    }

    // Bold (** or __)
    if ((str[i] === '*' && str[i + 1] === '*') || (str[i] === '_' && str[i + 1] === '_')) {
      pushText();
      const delimiter = str.substring(i, i + 2);
      const endIdx = str.indexOf(delimiter, i + 2);
      if (endIdx !== -1) {
        const boldText = str.substring(i + 2, endIdx);
        tokens.push(
          <Span
            key={tokens.length}
            fontWeight="bold"
            fill={defaultColor}
          >
            {boldText}
          </Span>
        );
        i = endIdx + 2;
      } else {
        currentText += delimiter;
        i += 2;
      }
      continue;
    }

    // Italic (* or _)
    if (str[i] === '*' || str[i] === '_') {
      pushText();
      const delimiter = str[i];
      const endIdx = str.indexOf(delimiter, i + 1);
      if (endIdx !== -1 && str[endIdx + 1] !== delimiter) {
        const italicText = str.substring(i + 1, endIdx);
        tokens.push(
          <Span
            key={tokens.length}
            italic={true}
            fill={defaultColor}
          >
            {italicText}
          </Span>
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

// Helper to chunk markdown lines into block structure
function renderMarkdownToFigma(markdownText: string, theme: "light" | "dark") {
  const { AutoLayout, Text } = figma.widget;
  const isDark = theme === "dark";
  const styles = THEMES[theme];

  const blocks: any[] = [];
  const lines = markdownText.split("\n");

  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  let inTable = false;
  let tableRows: string[][] = [];

  let listIndex = 1;

  const pushBlock = (block: any) => {
    blocks.push(block);
  };

  for (let idx = 0; idx < lines.length; idx++) {
    const origLine = lines[idx];
    const line = origLine.trim();

    // 1. Code Block Fence (``` )
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // Close code block
        inCodeBlock = false;
        const codeText = codeBlockLines.join("\n");
        pushBlock(
          <AutoLayout
            key={`code-${idx}`}
            direction="vertical"
            width="fill-parent"
            padding={16}
            cornerRadius={8}
            fill={styles.codeBg}
          >
            <Text
              width="fill-parent"
              fontFamily="Inter"
              fontSize={13}
              fill={isDark ? "#94A3B8" : "#4B5563"}
            >
              {codeText}
            </Text>
          </AutoLayout>
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

    // 2. Table Parsing
    if (line.startsWith("|")) {
      inTable = true;
      // Extract columns
      const cells = line.split("|")
        .map(c => c.trim())
        .filter((_c, i, arr) => i > 0 && i < arr.length - 1);

      // Skip separator rows (e.g. | --- | --- |)
      const isSeparator = cells.every(c => c.startsWith("-") || c === "");
      if (!isSeparator) {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      // Table ended, render it
      inTable = false;
      if (tableRows.length > 0) {
        const rowsToRender = [...tableRows];
        tableRows = [];

        pushBlock(
          <AutoLayout
            key={`table-${idx}`}
            direction="vertical"
            width="fill-parent"
            stroke={styles.stroke}
            strokeWidth={1}
            cornerRadius={8}
            padding={0}
          >
            {rowsToRender.map((row, rIdx) => {
              const isHeader = rIdx === 0;
              return (
                <AutoLayout
                  key={`row-${rIdx}`}
                  direction="vertical"
                  width="fill-parent"
                  fill={isHeader ? styles.tableHeaderBg : styles.bg}
                  padding={0}
                >
                  <AutoLayout
                    direction="horizontal"
                    width="fill-parent"
                    padding={{ top: 8, bottom: 8, left: 12, right: 12 }}
                  >
                    {row.map((cell, cIdx) => (
                      <AutoLayout
                        key={`cell-${cIdx}`}
                        width="fill-parent"
                        padding={0}
                      >
                        <Text
                          width="fill-parent"
                          fontSize={13}
                          fontWeight={isHeader ? "bold" : "normal"}
                          fill={isHeader ? styles.text : styles.muted}
                        >
                          {parseInlineSpans(cell, isDark, isHeader ? styles.text : styles.muted)}
                        </Text>
                      </AutoLayout>
                    ))}
                  </AutoLayout>
                  <AutoLayout
                    width="fill-parent"
                    height={1}
                    fill={styles.stroke}
                  />
                </AutoLayout>
              );
            })}
          </AutoLayout>
        );
      }
    }

    if (line === "") {
      // Empty line, add a spacer spacing
      continue;
    }

    // 3. Headings (# H1, ## H2, ### H3)
    if (line.startsWith("# ")) {
      pushBlock(
        <Text
          key={`h1-${idx}`}
          width="fill-parent"
          fontSize={24}
          fontWeight="bold"
          fill={styles.text}
        >
          {parseInlineSpans(line.substring(2), isDark, styles.text)}
        </Text>
      );
    } else if (line.startsWith("## ")) {
      pushBlock(
        <Text
          key={`h2-${idx}`}
          width="fill-parent"
          fontSize={18}
          fontWeight="bold"
          fill={styles.text}
        >
          {parseInlineSpans(line.substring(3), isDark, styles.text)}
        </Text>
      );
    } else if (line.startsWith("### ")) {
      pushBlock(
        <Text
          key={`h3-${idx}`}
          width="fill-parent"
          fontSize={15}
          fontWeight="bold"
          fill={styles.text}
        >
          {parseInlineSpans(line.substring(4), isDark, styles.text)}
        </Text>
      );
    }
    // 4. Blockquote (> )
    else if (line.startsWith(">")) {
      const quoteText = line.substring(1).trim();
      pushBlock(
        <AutoLayout
          key={`quote-${idx}`}
          direction="horizontal"
          width="fill-parent"
          fill={styles.quoteBg}
          stroke={styles.accent}
          strokeWidth={1}
          padding={{ left: 16, top: 4, bottom: 4, right: 12 }}
        >
          <Text
            width="fill-parent"
            fontSize={14}
            italic={true}
            fill={styles.muted}
          >
            {parseInlineSpans(quoteText, isDark, styles.muted)}
          </Text>
        </AutoLayout>
      );
    }
    // 5. Unordered List Items (- or * )
    else if (line.startsWith("- ") || line.startsWith("* ")) {
      const itemText = line.substring(2);
      pushBlock(
        <AutoLayout
          key={`ul-${idx}`}
          direction="horizontal"
          width="fill-parent"
          padding={{ left: 12 }}
          spacing={8}
        >
          <Text fontSize={14} fill={styles.accent} fontWeight="bold">•</Text>
          <Text
            width="fill-parent"
            fontSize={14}
            fill={styles.muted}
          >
            {parseInlineSpans(itemText, isDark, styles.muted)}
          </Text>
        </AutoLayout>
      );
    }
    // 6. Ordered List Items (1. )
    else if (/^\d+\.\s+/.test(line)) {
      const dotIdx = line.indexOf(".");
      const itemText = line.substring(dotIdx + 1).trim();
      pushBlock(
        <AutoLayout
          key={`ol-${idx}`}
          direction="horizontal"
          width="fill-parent"
          padding={{ left: 12 }}
          spacing={8}
        >
          <Text fontSize={14} fill={styles.accent} fontWeight="bold">{listIndex++}.</Text>
          <Text
            width="fill-parent"
            fontSize={14}
            fill={styles.muted}
          >
            {parseInlineSpans(itemText, isDark, styles.muted)}
          </Text>
        </AutoLayout>
      );
    }
    // 7. Horizontal Rule (---)
    else if (line === "---") {
      pushBlock(
        <AutoLayout
          key={`hr-${idx}`}
          width="fill-parent"
          height={1}
          fill={styles.stroke}
          padding={{ top: 8, bottom: 8 }}
        />
      );
    }
    // 8. Plain Paragraph
    else {
      listIndex = 1; // Reset ordered list count
      pushBlock(
        <Text
          key={`p-${idx}`}
          width="fill-parent"
          fontSize={14}
          fill={styles.muted}
        >
          {parseInlineSpans(line, isDark, styles.muted)}
        </Text>
      );
    }
  }

  return blocks;
}

// 2. Widget root component
function Widget() {
  const { AutoLayout, useSyncedState, usePropertyMenu, useEffect, waitForTask } = figma.widget;

  const [markdown, setMarkdown] = useSyncedState("markdown", DEFAULT_MARKDOWN);
  const [title, setTitle] = useSyncedState("title", "MarkXia Note");
  const [theme, setTheme] = useSyncedState("theme", "light");

  const isDark = theme === "dark";
  const styles = THEMES[isDark ? "dark" : "light"];

  // Set up property menu
  usePropertyMenu(
    [
      {
        itemType: "action",
        tooltip: "Edit",
        propertyName: "edit",
        icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.146 1.854a.5.5 0 0 1 .708 0l1.292 1.292a.5.5 0 0 1 0 .708L13 5.003 10.998 3l1.148-1.146zM10.29 3.71L2 12v2h2l8.29-8.29-2-2z" fill="currentColor"/></svg>`
      },
      {
        itemType: "dropdown",
        tooltip: "Select Theme",
        propertyName: "theme",
        options: [
          { label: "☀️ Light", option: "light" },
          { label: "🌙 Dark", option: "dark" }
        ],
        selectedOption: theme
      }
    ],
    (event: any) => {
      if (event.propertyName === "edit") {
        // Open floating edit panel
        (figma as any).showUI(__html__, {
          width: 540,
          height: 600,
          title: "Edit " + title
        });

        // Send current title & markdown state to Iframe
        (figma as any).ui.postMessage({
          type: "init-state",
          title: title,
          markdown: markdown,
          theme: theme
        });
      } else if (event.propertyName === "theme") {
        const val = event.propertyValue;
        if (val === "light" || val === "dark") {
          setTheme(val);
        }
      }
    }
  );

  useEffect(() => {
    waitForTask(new Promise<void>((resolve) => {
      (figma as any).ui.onmessage = (msg: any) => {
        if (msg.type === "save-markdown") {
          setMarkdown(msg.markdown);
          setTitle(msg.title);

          // Notify update success
          (figma as any).notify("Markdown updated on canvas!");

          // If not marked to keepOpen, close UI
          if (!msg.keepOpen) {
            (figma as any).closePlugin();
          }

          resolve();
        }
      };
    }));

    return () => {
      (figma as any).ui.onmessage = undefined;
    };
  });

  return (
    <AutoLayout
      direction="vertical"
      padding={32}
      fill={styles.bg}
      stroke={styles.stroke}
      strokeWidth={1}
      cornerRadius={16}
      spacing={16}
      width={480}
    >
      {renderMarkdownToFigma(markdown, isDark ? "dark" : "light")}
    </AutoLayout>
  );
}

(figma as any).widget.register(Widget);
