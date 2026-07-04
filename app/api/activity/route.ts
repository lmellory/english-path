import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";
import { recordActivity, startOfUTCDay } from "@/lib/gamification";

// GET /api/activity?days=7 — активность за последние N дней + streak
export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const days = Math.min(
    Number(req.nextUrl.searchParams.get("days") ?? 7) || 7,
    60
  );
  const from = startOfUTCDay(
    new Date(Date.now() - (days - 1) * 86_400_000)
  );

  const [activity, streak] = await Promise.all([
    prisma.dailyActivity.findMany({
      where: { userId, date: { gte: from } },
      orderBy: { date: "asc" },
    }),
    prisma.streak.findUnique({ where: { userId } }),
  ]);

  return NextResponse.json({ activity, streak });
}

const activitySchema = z.object({
  minutesStudied: z.number().int().min(0).optional(),
  lessonsCompleted: z.number().int().min(0).optional(),
  wordsLearned: z.number().int().min(0).optional(),
  reviewsDone: z.number().int().min(0).optional(),
});

// POST /api/activity — вручную записать активность (например, минуты занятий)
export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = activitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  await recordActivity(userId, parsed.data);
  const streak = await prisma.streak.findUnique({ where: { userId } });

  return NextResponse.json({ ok: true, streak });
}
