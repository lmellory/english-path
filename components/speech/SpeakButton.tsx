"use client";

import { Volume2 } from "lucide-react";
import { speak, type Accent } from "@/lib/speech";
import { cn } from "@/lib/utils";

export function SpeakButton({
  text,
  accent = "UK",
  label,
  className,
}: {
  text: string;
  accent?: Accent;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => speak(text, accent)}
      aria-label={`Прослушать (${
        accent === "UK" ? "британский" : "американский"
      }): ${text}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border bg-card px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <Volume2 className="h-3.5 w-3.5" />
      {label ?? accent}
    </button>
  );
}
