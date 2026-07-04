"use client";

import { useEffect, useState } from "react";
import { Mic, Loader2 } from "lucide-react";
import {
  recognizeOnce,
  pronunciationScore,
  isSpeechRecognitionSupported,
  type Accent,
} from "@/lib/speech";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "listening" | "done" | "error";

export function PronunciationTrainer({
  target,
  accent = "UK",
}: {
  target: string;
  accent?: Accent;
}) {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [heard, setHeard] = useState("");
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => setSupported(isSpeechRecognitionSupported()), []);

  const start = async () => {
    setStatus("listening");
    setHeard("");
    setScore(null);
    try {
      const transcript = await recognizeOnce(accent);
      setHeard(transcript);
      setScore(pronunciationScore(target, transcript));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (!supported) {
    return (
      <p className="text-xs text-muted-foreground">
        Тренажёр произношения работает в Chrome и Edge. В этом браузере
        распознавание речи недоступно.
      </p>
    );
  }

  const scoreColor =
    score === null
      ? ""
      : score >= 80
        ? "text-success"
        : score >= 50
          ? "text-warning"
          : "text-destructive";

  return (
    <div className="space-y-2">
      <Button
        size="sm"
        variant="outline"
        onClick={start}
        disabled={status === "listening"}
      >
        {status === "listening" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
        {status === "listening" ? "Слушаю…" : "Произнести"}
      </Button>

      {status === "done" && (
        <p className="text-sm">
          Вы сказали: <span className="font-medium">{heard || "—"}</span> ·{" "}
          <span className={cn("font-semibold", scoreColor)}>{score}%</span>
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-muted-foreground">
          Не расслышал. Разрешите доступ к микрофону и попробуйте ещё раз.
        </p>
      )}
    </div>
  );
}
