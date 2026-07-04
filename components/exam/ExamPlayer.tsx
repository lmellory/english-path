"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  ExerciseRenderer,
  isAnswerReady,
} from "@/components/exercises/renderers";

interface Question {
  id: string;
  type: string;
  prompt: any;
}

interface ExamResult {
  passed: boolean;
  score: number;
  correct: number;
}

export function ExamPlayer({ levelCode }: { levelCode: string }) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState<any>(null);
  const [correct, setCorrect] = useState(0);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    fetch(`/api/exams?level=${levelCode}&count=10`)
      .then((r) => r.json())
      .then((d) => setQuestions(d.questions ?? []))
      .catch(() => setQuestions([]));
  }, [levelCode]);

  if (questions === null) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          Для этого уровня пока недостаточно заданий для теста. Пройдите уроки
          грамматики и возвращайтесь.
        </p>
        <Link href="/dashboard" className="mt-4 inline-block">
          <Button variant="secondary">На главную</Button>
        </Link>
      </div>
    );
  }

  if (result) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center">
        <h2 className="text-2xl font-bold">
          {result.passed ? "Тест сдан! 🎉" : "Почти получилось"}
        </h2>
        <p className="mt-2 text-muted-foreground">
          Результат: {result.correct} из {questions.length} ({result.score}%).{" "}
          {result.passed
            ? "Порог 80% пройден — можно двигаться дальше."
            : "Нужно 80%. Повторите слабые темы и попробуйте снова."}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href="/grammar">
            <Button variant="secondary">К урокам</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">На главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  const q = questions[i];

  const submit = async () => {
    if (busy || !isAnswerReady(q.type, q.prompt, answer)) return;
    setBusy(true);
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseId: q.id, userAnswer: answer }),
      });
      const data = await res.json();
      const newCorrect = correct + (data.isCorrect ? 1 : 0);
      setCorrect(newCorrect);

      if (i + 1 >= questions.length) {
        const score = Math.round((newCorrect / questions.length) * 100);
        const passed = score >= 80;
        await fetch("/api/exams", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            levelCode,
            correct: newCorrect,
            total: questions.length,
          }),
        });
        setResult({ passed, score, correct: newCorrect });
      } else {
        setI(i + 1);
        setAnswer(null);
      }
    } finally {
      setBusy(false);
    }
  };

  const progress = Math.round((i / questions.length) * 100);

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mb-4 text-center text-xs text-muted-foreground">
        Вопрос {i + 1} из {questions.length}
      </p>

      <div className="rounded-2xl border bg-card p-5">
        {q.prompt?.question && (
          <p className="mb-4 font-medium">{q.prompt.question}</p>
        )}
        <ExerciseRenderer
          type={q.type}
          prompt={q.prompt}
          value={answer}
          onChange={setAnswer}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          onClick={submit}
          disabled={busy || !isAnswerReady(q.type, q.prompt, answer)}
        >
          {i + 1 >= questions.length ? "Завершить тест" : "Ответить"}
        </Button>
      </div>
    </div>
  );
}
