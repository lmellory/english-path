"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { SpeakButton } from "@/components/speech/SpeakButton";
import { Button } from "@/components/ui/Button";

export interface VocabItemView {
  id: string;
  headword: string;
  ipaUk: string | null;
  ipaUs: string | null;
  pos: string | null;
  translationRu: string;
  exampleEn: string | null;
  exampleRu: string | null;
  register: string;
  kind: string;
  inReview?: boolean;
}

export function Flashcard({
  item,
  onAdd,
}: {
  item: VocabItemView;
  onAdd?: (id: string) => Promise<void> | void;
}) {
  const [added, setAdded] = useState(!!item.inReview);
  const [busy, setBusy] = useState(false);

  const handleAdd = async () => {
    if (added || busy) return;
    setBusy(true);
    try {
      await onAdd?.(item.id);
      setAdded(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-semibold">{item.headword}</h3>
            {item.pos && (
              <span className="text-xs italic text-muted-foreground">
                {item.pos}
              </span>
            )}
          </div>
          {(item.ipaUk || item.ipaUs) && (
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              {item.ipaUk && <span>UK [{item.ipaUk}]</span>}
              {item.ipaUs && <span>US [{item.ipaUs}]</span>}
            </div>
          )}
        </div>
        <div className="flex shrink-0 gap-1.5">
          <SpeakButton text={item.headword} accent="UK" />
          <SpeakButton text={item.headword} accent="US" />
        </div>
      </div>

      <p className="mt-3 text-base">{item.translationRu}</p>

      {item.exampleEn && (
        <div className="mt-3 rounded-lg bg-muted/50 p-3 text-sm">
          <p className="italic">{item.exampleEn}</p>
          {item.exampleRu && (
            <p className="mt-1 text-muted-foreground">{item.exampleRu}</p>
          )}
        </div>
      )}

      {onAdd && (
        <div className="mt-3">
          {added ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-success">
              <Check className="h-4 w-4" /> В повторении
            </span>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={handleAdd}
              disabled={busy}
            >
              <Plus className="h-4 w-4" /> В повторение
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
