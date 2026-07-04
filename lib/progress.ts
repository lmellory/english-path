import { prisma } from "@/lib/db";
import { recordActivity } from "@/lib/gamification";
import type { ProgressStatus } from "@prisma/client";

/**
 * Устанавливает статус урока для пользователя.
 * При первом завершении урока засчитывает активность (минуты + урок).
 */
export async function setLessonStatus(
  userId: string,
  lessonId: string,
  status: ProgressStatus,
  score?: number
) {
  const isCompleting = status === "COMPLETED";

  const existing = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
  });
  const wasCompleted = existing?.status === "COMPLETED";

  const progress = await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: {
      status,
      score: score ?? existing?.score ?? null,
      completedAt: isCompleting
        ? new Date()
        : existing?.completedAt ?? null,
    },
    create: {
      userId,
      lessonId,
      status,
      score: score ?? null,
      completedAt: isCompleting ? new Date() : null,
    },
  });

  if (isCompleting && !wasCompleted) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { estMinutes: true },
    });
    await recordActivity(userId, {
      lessonsCompleted: 1,
      minutesStudied: lesson?.estMinutes ?? 0,
    });
  }

  return progress;
}
