"use client";

import { useState } from "react";
import { Play, Eye, EyeOff } from "lucide-react";
import { speak, type Accent } from "@/lib/speech";
import { Button } from "@/components/ui/Button";

export function ListeningPlayer({
  script,
  accent = "UK",
}: {
  script: string;
  accent?: Accent;
}) {
  const [showScript, setShowScript] = useState(false);

  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={() => speak(script, accent, 0.95)}>
          <Play className="h-4 w-4" /> Прослушать
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowScript((s) => !s)}
        >
          {showScript ? (
            <>
              <EyeOff className="h-4 w-4" /> Скрыть текст
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" /> Показать текст
            </>
          )}
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Сначала послушайте и ответьте на вопросы. Текст можно открыть для
        проверки.
      </p>
      {showScript && (
        <p className="mt-3 whitespace-pre-line rounded-lg bg-muted/50 p-3 text-sm italic">
          {script}
        </p>
      )}
    </div>
  );
}
