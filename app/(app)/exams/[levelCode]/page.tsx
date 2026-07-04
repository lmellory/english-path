import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ExamPlayer } from "@/components/exam/ExamPlayer";

export default async function ExamPage({
  params,
}: {
  params: Promise<{ levelCode: string }>;
}) {
  const { levelCode } = await params;
  const code = levelCode.toUpperCase();

  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> На главную
      </Link>

      <h1 className="mb-1 mt-3 text-2xl font-bold tracking-tight">
        Итоговый тест {code}
      </h1>
      <p className="mb-6 text-sm text-muted-foreground">
        10 вопросов из пройденных тем уровня. Порог для перехода дальше — 80%.
      </p>

      <ExamPlayer levelCode={code} />
    </main>
  );
}
