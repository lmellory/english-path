import { Fragment, ReactNode } from "react";

// Мини-рендер безопасного подмножества Markdown: абзацы, **жирный**, `код`,
// списки "- ", заголовки "### ". Без внешних зависимостей.

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    if (p.startsWith("`") && p.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]"
        >
          {p.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={i}>{p}</Fragment>;
  });
}

export function Markdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n{2,}/);

  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {blocks.map((block, i) => {
        const lines = block.split("\n");

        if (lines.length > 0 && lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }

        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="text-base font-semibold">
              {renderInline(block.slice(4))}
            </h3>
          );
        }

        return <p key={i}>{renderInline(block)}</p>;
      })}
    </div>
  );
}
