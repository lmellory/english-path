import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export default async function GrammarPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const modules = await prisma.module.findMany({
    where: { type: "GRAMMAR" },
    include: {
      level: true,
      lessons: { orderBy: { order: "asc" } },
    },
  });
  modules.sort((a, b) => a.level.order - b.level.order);

  const progressRows = userId
    ? await prisma.lessonProgress.findMany({
        where: { userId },
        select: { lessonId: true, status: true },
      })
    : [];
  const completed = new Set(
    progressRows.filter((p) => p.status === "COMPLETED").map((p) => p.lessonId)
  );

  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> На главную
      </Link>

      <h1 className="mb-1 mt-3 text-2xl font-bold tracking-tight">Грамматика</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Теория с примерами и упражнения с проверкой.
      </p>

      <div className="space-y-6">
        {modules.map((m) => (
          <section key={m.id}>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {m.level.code} · {m.level.title}
            </h2>
            {m.lessons.length === 0 ? (
              <p className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                Уроки этого уровня скоро появятся.
              </p>
            ) : (
              <ul className="space-y-2">
                {m.lessons.map((l) => (
                  <li key={l.id}>
                    <Link
                      href={`/lessons/${l.id}`}
                      className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-muted"
                    >
                      <span className="font-medium">{l.title}</span>
                      {completed.has(l.id) ? (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </main>
  );
}
