"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  ExerciseRenderer,
  isAnswerReady,
} from "@/components/exercises/renderers";

export interface ExerciseView {
  id: string;
  type: string;
  prompt: any;
}

interface CheckResult {
  isCorrect: boolean;
  correctAnswer: any;
  explanation: string | null;
}

function formatAnswer(a: any): string {
  if (Array.isArray(a)) return a.join(" ");
  if (a && typeof a === "object") {
    return Object.entries(a)
      .map(([k, v]) => `${k} → ${v}`)
      .join(", ");
  }
  return String(a);
}

export function ExercisePlayer({
  lessonId,
  exercises,
  backHref = "/dashboard",
  backLabel = "На главную",
}: {
  lessonId: string;
  exercises: ExerciseView[];
  backHref?: string;
  backLabel?: string;
}) {
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState<any>(null);
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  // Урок без упражнений — сразу отмечаем пройденным
  useEffect(() => {
    if (exercises.length === 0) {
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, status: "COMPLETED", score: 100 }),
      }).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (exercises.length === 0) {
    return <FinishBlock correct={0} total={0} backHref={backHref} backLabel={backLabel} />;
  }

  if (done) {
    return (
      <FinishBlock
        correct={correct}
        total={exercises.length}
        backHref={backHref}
        backLabel={backLabel}
      />
    );
  }

  const ex = exercises[i];

  const check = async () => {
    if (busy || !isAnswerReady(ex.type, ex.prompt, answer)) return;
    setBusy(true);
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseId: ex.id, userAnswer: answer }),
      });
      const data: CheckResult = await res.json();
      setResult(data);
      setChecked(true);
      if (data.isCorrect) setCorrect((c) => c + 1);
    } finally {
      setBusy(false);
    }
  };

  const next = async () => {
    if (i + 1 >= exercises.length) {
      setBusy(true);
      const score = Math.round((correct / exercises.length) * 100);
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lessonId, status: "COMPLETED", score }),
        });
      } finally {
        setBusy(false);
        setDone(true);
      }
    } else {
      setI(i + 1);
      setAnswer(null);
      setChecked(false);
      setResult(null);
    }
  };

  const progress = Math.round((i / exercises.length) * 100);

  return (
    <div>
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Задание {i + 1} из {exercises.length}
      </p>

      <div className="rounded-2xl border bg-card p-5">
        {ex.prompt?.question && (
          <p className="mb-4 font-medium">{ex.prompt.question}</p>
        )}
        <ExerciseRenderer
          type={ex.type}
          prompt={ex.prompt}
          value={answer}
          onChange={setAnswer}
          disabled={checked}
        />

        {checked && result && (
          <div
            className={cn(
              "mt-4 rounded-lg p-3 text-sm",
              result.isCorrect
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            <p className="flex items-center gap-1.5 font-medium">
              {result.isCorrect ? (
                <>
                  <Check className="h-4 w-4" /> Верно!
                </>
              ) : (
                <>
                  <X className="h-4 w-4" /> Неверно
                </>
              )}
            </p>
            {!result.isCorrect && (
              <p className="mt-1 text-foreground">
                Правильный ответ:{" "}
                <span className="font-medium">
                  {formatAnswer(result.correctAnswer)}
                </span>
              </p>
            )}
            {result.explanation && (
              <p className="mt-1 text-muted-foreground">{result.explanation}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        {!checked ? (
          <Button
            onClick={check}
            disabled={busy || !isAnswerReady(ex.type, ex.prompt, answer)}
          >
            Проверить
          </Button>
        ) : (
          <Button onClick={next} disabled={busy}>
            {i + 1 >= exercises.length ? "Завершить" : "Дальше"}
          </Button>
        )}
      </div>
    </div>
  );
}

function FinishBlock({
  correct,
  total,
  backHref,
  backLabel,
}: {
  correct: number;
  total: number;
  backHref: string;
  backLabel: string;
}) {
  const score = total > 0 ? Math.round((correct / total) * 100) : 100;
  return (
    <div className="rounded-2xl border bg-card p-8 text-center">
      <h2 className="text-xl font-semibold">Урок пройден 🎉</h2>
      {total > 0 && (
        <p className="mt-2 text-muted-foreground">
          Результат: {correct} из {total} ({score}%)
        </p>
      )}
      <div className="mt-4 flex justify-center gap-2">
        <Link href={backHref}>
          <Button variant="secondary">{backLabel}</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost">На главную</Button>
        </Link>
      </div>
    </div>
  );
}
