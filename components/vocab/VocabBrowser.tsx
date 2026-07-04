"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Flashcard, type VocabItemView } from "@/components/vocab/Flashcard";
import { cn } from "@/lib/utils";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const KINDS = [
  { value: "", label: "Все" },
  { value: "WORD", label: "Слова" },
  { value: "IDIOM", label: "Идиомы" },
  { value: "PHRASAL_VERB", label: "Фразовые" },
  { value: "ABBREVIATION", label: "Сокращения" },
];

export function VocabBrowser() {
  const [level, setLevel] = useState("A1");
  const [kind, setKind] = useState("");
  const [q, setQ] = useState("");
  const [items, setItems] = useState<VocabItemView[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ levelCode: level });
    if (kind) params.set("kind", kind);
    if (q.trim()) params.set("q", q.trim());
    try {
      const res = await fetch(`/api/vocab?${params.toString()}`);
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [level, kind, q]);

  useEffect(() => {
    const t = setTimeout(load, 250); // антидребезг для поиска
    return () => clearTimeout(t);
  }, [load]);

  const addToReview = async (id: string) => {
    await fetch("/api/vocab/learn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vocabItemIds: [id] }),
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                level === l
                  ? "bg-primary text-primary-foreground"
                  : "border bg-card hover:bg-muted"
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {KINDS.map((k) => (
            <button
              key={k.value}
              onClick={() => setKind(k.value)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm transition-colors",
                kind === k.value
                  ? "bg-secondary text-secondary-foreground"
                  : "border bg-card hover:bg-muted"
              )}
            >
              {k.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск слова или перевода…"
            className="w-full rounded-lg border bg-card py-2 pl-9 pr-3 text-sm outline-none ring-ring focus:ring-2"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          Слов пока нет. Скоро здесь появится словарь этого уровня.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((it) => (
            <Flashcard key={it.id} item={it} onAdd={addToReview} />
          ))}
        </div>
      )}
    </div>
  );
}
