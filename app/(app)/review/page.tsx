import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReviewSession } from "@/components/vocab/ReviewSession";

export default function ReviewPage() {
  return (
    <main className="mx-auto max-w-3xl p-4 sm:p-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> На главную
      </Link>

      <h1 className="mb-6 mt-3 text-2xl font-bold tracking-tight">
        Повторение
      </h1>

      <ReviewSession />
    </main>
  );
}
