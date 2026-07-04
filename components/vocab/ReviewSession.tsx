"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { SpeakButton } from "@/components/speech/SpeakButton";
import { PronunciationTrainer } from "@/components/speech/PronunciationTrainer";
import { Button } from "@/components/ui/Button";

interface ReviewCard {
  id: string;
  vocabItem: {
    id: string;
    headword: string;
    ipaUk: string | null;
    ipaUs: string | null;
    pos: string | null;
    translationRu: string;
    exampleEn: string | null;
    exampleRu: string | null;
  };
}

const GRADES = [
  { key: "again", quality: 1, label: "Не помню", variant: "destructive" as const },
  { key: "hard", quality: 3, label: "Трудно", variant: "outline" as const },
  { key: "good", quality: 4, label: "Помню", variant: "primary" as const },
  { key: "easy", quality: 5, label: "Легко", variant: "success" as const },
];

export function ReviewSession() {
  const [cards, setCards] = useState<ReviewCard[] | null>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/srs?limit=50")
      .then((r) => r.json())
      .then((d) => setCards(d.cards ?? []))
      .catch(() => setCards([]));
  }, []);

  if (cards === null) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h2 className="text-xl font-semibold">На сегодня всё! 🎉</h2>
        <p className="mt-2 text-muted-foreground">
          Карточек к повторению нет. Добавьте слова в словаре — и они появятся
          здесь.
        </p>
        <Link href="/vocabulary" className="mt-4 inline-block">
          <Button>Открыть словарь</Button>
        </Link>
      </div>
    );
  }

  if (index >= cards.length) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h2 className="text-xl font-semibold">Повторение завершено 🎉</h2>
        <p className="mt-2 text-muted-foreground">
          Повторено карточек: {reviewed}. Интервалы пересчитаны — возвращайтесь
          завтра.
        </p>
        <Link href="/dashboard" className="mt-4 inline-block">
          <Button variant="secondary">На главную</Button>
        </Link>
      </div>
    );
  }

  const card = cards[index];
  const item = card.vocabItem;

  const grade = async (quality: number) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/srs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vocabItemId: item.id, quality }),
      });
      setReviewed((n) => n + 1);
      setRevealed(false);
      setIndex((i) => i + 1);
    } finally {
      setSubmitting(false);
    }
  };

  const progress = Math.round((index / cards.length) * 100);

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mb-6 text-center text-xs text-muted-foreground">
        {index + 1} из {cards.length}
      </p>

      <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
        <h2 className="text-3xl font-bold">{item.headword}</h2>
        {(item.ipaUk || item.ipaUs) && (
          <p className="mt-2 text-sm text-muted-foreground">
            {item.ipaUk && <>UK [{item.ipaUk}] </>}
            {item.ipaUs && <>US [{item.ipaUs}]</>}
          </p>
        )}
        <div className="mt-3 flex justify-center gap-2">
          <SpeakButton text={item.headword} accent="UK" />
          <SpeakButton text={item.headword} accent="US" />
        </div>

        {revealed ? (
          <div className="mt-6 border-t pt-6">
            <p className="text-xl">{item.translationRu}</p>
            {item.exampleEn && (
              <div className="mt-3 text-sm">
                <p className="italic">{item.exampleEn}</p>
                {item.exampleRu && (
                  <p className="text-muted-foreground">{item.exampleRu}</p>
                )}
              </div>
            )}
            <div className="mt-4 flex justify-center">
              <PronunciationTrainer target={item.headword} />
            </div>
          </div>
        ) : (
          <Button
            className="mt-6"
            variant="secondary"
            onClick={() => setRevealed(true)}
          >
            Показать перевод
          </Button>
        )}
      </div>

      {revealed && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {GRADES.map((g) => (
            <Button
              key={g.key}
              variant={g.variant}
              disabled={submitting}
              onClick={() => grade(g.quality)}
            >
              {g.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
