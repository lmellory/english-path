import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { VocabBrowser } from "@/components/vocab/VocabBrowser";

export default function VocabularyPage() {
  return (
    <main className="mx-auto max-w-3xl p-4 sm:p-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> На главную
      </Link>

      <h1 className="mb-1 mt-3 text-2xl font-bold tracking-tight">Словарь</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Слушайте произношение и добавляйте слова в повторение.
      </p>

      <VocabBrowser />
    </main>
  );
}
