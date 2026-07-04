import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";
import { reviewCard, DEFAULT_SRS_STATE } from "@/lib/srs";
import { recordActivity } from "@/lib/gamification";

// GET /api/srs?limit=20 — карточки, которые пора повторить
export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = Math.min(
    Number(req.nextUrl.searchParams.get("limit") ?? 20) || 20,
    100
  );

  const cards = await prisma.srsCard.findMany({
    where: { userId, dueDate: { lte: new Date() } },
    orderBy: { dueDate: "asc" },
    take: limit,
    include: { vocabItem: true },
  });

  return NextResponse.json({ cards });
}

const reviewSchema = z.object({
  vocabItemId: z.string().min(1),
  quality: z.number().int().min(0).max(5),
});

// POST /api/srs — записать оценку и пересчитать интервал по SM-2
export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { vocabItemId, quality } = parsed.data;

  const existing = await prisma.srsCard.findUnique({
    where: { userId_vocabItemId: { userId, vocabItemId } },
  });

  const state = existing
    ? {
        easeFactor: existing.easeFactor,
        interval: existing.interval,
        repetitions: existing.repetitions,
      }
    : DEFAULT_SRS_STATE;

  const next = reviewCard(state, quality);

  const card = await prisma.srsCard.upsert({
    where: { userId_vocabItemId: { userId, vocabItemId } },
    update: {
      easeFactor: next.easeFactor,
      interval: next.interval,
      repetitions: next.repetitions,
      dueDate: next.dueDate,
      lastReviewedAt: new Date(),
    },
    create: {
      userId,
      vocabItemId,
      easeFactor: next.easeFactor,
      interval: next.interval,
      repetitions: next.repetitions,
      dueDate: next.dueDate,
      lastReviewedAt: new Date(),
    },
  });

  await recordActivity(userId, { reviewsDone: 1 });

  return NextResponse.json({ card });
}
