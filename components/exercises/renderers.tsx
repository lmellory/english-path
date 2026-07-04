"use client";

import { cn } from "@/lib/utils";

export interface RendererProps {
  prompt: any;
  value: any;
  onChange: (v: any) => void;
  disabled?: boolean;
}

export function MultipleChoice({
  prompt,
  value,
  onChange,
  disabled,
}: RendererProps) {
  const options: string[] = prompt?.options ?? [];
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          disabled={disabled}
          onClick={() => onChange(opt)}
          className={cn(
            "w-full rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
            value === opt
              ? "border-primary bg-primary/10 font-medium"
              : "bg-card hover:bg-muted",
            disabled && "cursor-default"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function FillBlank({ value, onChange, disabled }: RendererProps) {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder="Введите ответ"
      className="w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
    />
  );
}

export function WritingInput({ value, onChange, disabled }: RendererProps) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      rows={4}
      placeholder="Ваш ответ…"
      className="w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
    />
  );
}

export function WordOrder({ prompt, value, onChange, disabled }: RendererProps) {
  const words: string[] = prompt?.words ?? [];
  const chosen: string[] = Array.isArray(value) ? value : [];

  const remaining = [...words];
  for (const w of chosen) {
    const idx = remaining.indexOf(w);
    if (idx >= 0) remaining.splice(idx, 1);
  }

  return (
    <div className="space-y-3">
      <div className="flex min-h-[3rem] flex-wrap gap-2 rounded-lg border border-dashed bg-muted/30 p-3">
        {chosen.length === 0 && (
          <span className="text-sm text-muted-foreground">
            Нажимайте слова ниже, чтобы собрать предложение
          </span>
        )}
        {chosen.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            disabled={disabled}
            onClick={() => onChange(chosen.filter((_, idx) => idx !== i))}
            className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground"
          >
            {w}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {remaining.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            disabled={disabled}
            onClick={() => onChange([...chosen, w])}
            className="rounded-md border bg-card px-3 py-1 text-sm hover:bg-muted"
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Matching({ prompt, value, onChange, disabled }: RendererProps) {
  const left: string[] = prompt?.left ?? [];
  const right: string[] = prompt?.right ?? [];
  const map: Record<string, string> = value ?? {};

  return (
    <div className="space-y-2">
      {left.map((l) => (
        <div key={l} className="flex items-center gap-3">
          <span className="min-w-[6rem] text-sm font-medium">{l}</span>
          <select
            value={map[l] ?? ""}
            disabled={disabled}
            onChange={(e) => onChange({ ...map, [l]: e.target.value })}
            className="flex-1 rounded-lg border bg-card px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
          >
            <option value="">— выберите —</option>
            {right.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

// Общий выбор рендерера по типу упражнения (используется и в уроках, и в тесте).
export function ExerciseRenderer({
  type,
  ...props
}: RendererProps & { type: string }) {
  switch (type) {
    case "MCQ":
      return <MultipleChoice {...props} />;
    case "FILL_BLANK":
      return <FillBlank {...props} />;
    case "WORD_ORDER":
      return <WordOrder {...props} />;
    case "MATCHING":
      return <Matching {...props} />;
    default:
      return <WritingInput {...props} />;
  }
}

// Готов ли ответ к отправке (для активации кнопки «Проверить»).
export function isAnswerReady(
  type: string,
  prompt: any,
  answer: any
): boolean {
  switch (type) {
    case "MCQ":
      return typeof answer === "string" && answer.length > 0;
    case "FILL_BLANK":
    case "WRITING":
      return typeof answer === "string" && answer.trim().length > 0;
    case "WORD_ORDER":
      return (
        Array.isArray(answer) && answer.length === (prompt?.words?.length ?? 0)
      );
    case "MATCHING":
      return (
        answer &&
        typeof answer === "object" &&
        Object.keys(answer).length === (prompt?.left?.length ?? 0) &&
        Object.values(answer).every((v) => v)
      );
    default:
      return answer != null && String(answer).trim().length > 0;
  }
}
