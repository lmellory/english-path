"use client";

import { SpeakButton } from "@/components/speech/SpeakButton";

interface Line {
  speaker?: string;
  en: string;
  ru?: string;
}

export function DialoguePlayer({
  title,
  lines,
}: {
  title?: string | null;
  lines: Line[];
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      {title && <h3 className="mb-3 font-semibold">{title}</h3>}
      <div className="space-y-3">
        {lines.map((l, i) => (
          <div key={i} className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {l.speaker && (
                <span className="mr-1 text-xs font-semibold text-muted-foreground">
                  {l.speaker}:
                </span>
              )}
              <span>{l.en}</span>
              {l.ru && (
                <p className="mt-0.5 text-sm text-muted-foreground">{l.ru}</p>
              )}
            </div>
            <SpeakButton text={l.en} accent="UK" className="shrink-0" />
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Нажимайте на динамик, чтобы прослушать реплику, и повторяйте вслух.
      </p>
    </div>
  );
}
