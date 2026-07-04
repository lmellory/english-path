import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { Markdown } from "@/components/ui/Markdown";
import {
  ExercisePlayer,
  type ExerciseView,
} from "@/components/exercises/ExercisePlayer";
import { ListeningPlayer } from "@/components/lessons/ListeningPlayer";
import { DialoguePlayer } from "@/components/lessons/DialoguePlayer";

const MODULE_BACK: Record<string, { href: string; label: string }> = {
  VOCAB: { href: "/vocabulary", label: "К словарю" },
  GRAMMAR: { href: "/grammar", label: "К урокам" },
  READING: { href: "/reading", label: "К текстам" },
  LISTENING: { href: "/listening", label: "К аудированию" },
  WRITING: { href: "/writing", label: "К письму" },
  SPEAKING: { href: "/speaking", label: "К диалогам" },
  SLANG_IDIOMS: { href: "/vocabulary", label: "К словарю" },
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: { include: { level: true } },
      grammarPoints: true,
      exercises: { orderBy: { order: "asc" } },
      readingTexts: true,
      listeningTasks: true,
      dialogues: true,
    },
  });

  if (!lesson) notFound();

  const back = MODULE_BACK[lesson.module.type] ?? {
    href: "/dashboard",
    label: "Назад",
  };

  // Ответы намеренно НЕ передаём на клиент — проверка на сервере.
  const exercises: ExerciseView[] = lesson.exercises.map((e) => ({
    id: e.id,
    type: e.type as string,
    prompt: e.prompt as any,
  }));

  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-6">
      <Link
        href={back.href}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {back.label}
      </Link>

      <div className="mb-6 mt-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {lesson.module.level.code} · {lesson.module.title}
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">
          {lesson.title}
        </h1>
        {lesson.intro && (
          <p className="mt-2 text-muted-foreground">{lesson.intro}</p>
        )}
      </div>

      {lesson.readingTexts.map((rt) => (
        <section key={rt.id} className="mb-6 rounded-2xl border bg-card p-5">
          <h2 className="mb-3 text-lg font-semibold">{rt.title}</h2>
          <div className="whitespace-pre-line text-sm leading-relaxed">
            {rt.bodyEn}
          </div>
        </section>
      ))}

      {lesson.listeningTasks.map((lt) => (
        <section key={lt.id} className="mb-6">
          <ListeningPlayer script={lt.scriptEn} />
        </section>
      ))}

      {lesson.dialogues.map((d) => (
        <section key={d.id} className="mb-6">
          <DialoguePlayer title={d.title} lines={(d.lines as any) ?? []} />
        </section>
      ))}

      {lesson.grammarPoints.map((gp) => (
        <section key={gp.id} className="mb-6 rounded-2xl border bg-card p-5">
          <h2 className="mb-3 text-lg font-semibold">{gp.title}</h2>
          <Markdown content={gp.theoryMd} />
          {Array.isArray(gp.examples) && (gp.examples as any[]).length > 0 && (
            <div className="mt-4 space-y-2 border-t pt-4">
              {(gp.examples as any[]).map((ex, idx) => (
                <div key={idx} className="text-sm">
                  <p className="font-medium">{ex.en}</p>
                  {ex.ru && <p className="text-muted-foreground">{ex.ru}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {exercises.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Упражнения</h2>
          <ExercisePlayer
            lessonId={lesson.id}
            exercises={exercises}
            backHref={back.href}
            backLabel={back.label}
          />
        </section>
      )}
    </main>
  );
}
