import { prisma } from "@/lib/db";

/** Начало суток в UTC (для хранения дневной активности и сравнения дней). */
export function startOfUTCDay(date: Date = new Date()): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

function daysBetween(a: Date, b: Date): number {
  const MS = 86_400_000;
  return Math.round(
    (startOfUTCDay(b).getTime() - startOfUTCDay(a).getTime()) / MS
  );
}

export interface ActivityDelta {
  minutesStudied?: number;
  lessonsCompleted?: number;
  wordsLearned?: number;
  reviewsDone?: number;
}

/**
 * Прибавляет активность за сегодня и обновляет streak.
 */
export async function recordActivity(userId: string, delta: ActivityDelta) {
  const today = startOfUTCDay();

  await prisma.dailyActivity.upsert({
    where: { userId_date: { userId, date: today } },
    update: {
      minutesStudied: { increment: delta.minutesStudied ?? 0 },
      lessonsCompleted: { increment: delta.lessonsCompleted ?? 0 },
      wordsLearned: { increment: delta.wordsLearned ?? 0 },
      reviewsDone: { increment: delta.reviewsDone ?? 0 },
    },
    create: {
      userId,
      date: today,
      minutesStudied: delta.minutesStudied ?? 0,
      lessonsCompleted: delta.lessonsCompleted ?? 0,
      wordsLearned: delta.wordsLearned ?? 0,
      reviewsDone: delta.reviewsDone ?? 0,
    },
  });

  await updateStreak(userId, today);
}

/**
 * Обновляет серию дней подряд (streak):
 * - активность в тот же день → без изменений;
 * - активность на следующий день → +1;
 * - пропуск → сброс до 1.
 */
export async function updateStreak(
  userId: string,
  today: Date = startOfUTCDay()
) {
  const streak = await prisma.streak.findUnique({ where: { userId } });

  if (!streak || !streak.lastActiveDate) {
    return prisma.streak.upsert({
      where: { userId },
      update: {
        currentStreak: 1,
        longestStreak: Math.max(1, streak?.longestStreak ?? 0),
        lastActiveDate: today,
      },
      create: {
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today,
      },
    });
  }

  const diff = daysBetween(streak.lastActiveDate, today);
  if (diff === 0) return streak; // сегодня уже засчитан

  const currentStreak = diff === 1 ? streak.currentStreak + 1 : 1;
  const longestStreak = Math.max(streak.longestStreak, currentStreak);

  return prisma.streak.update({
    where: { userId },
    data: { currentStreak, longestStreak, lastActiveDate: today },
  });
}
