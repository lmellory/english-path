import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";
import type { Prisma, VocabKind } from "@prisma/client";

// GET /api/vocab?levelCode=A1&kind=WORD&q=cat&take=60&skip=0
export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sp = req.nextUrl.searchParams;
  const levelCode = sp.get("levelCode") ?? undefined;
  const kind = sp.get("kind") ?? undefined;
  const q = sp.get("q")?.trim();
  const take = Math.min(Number(sp.get("take") ?? 60) || 60, 200);
  const skip = Number(sp.get("skip") ?? 0) || 0;

  const where: Prisma.VocabItemWhereInput = {};
  if (levelCode) where.levelCode = levelCode;
  if (kind) where.kind = kind as VocabKind;
  if (q) {
    where.OR = [
      { headword: { contains: q, mode: "insensitive" } },
      { translationRu: { contains: q, mode: "insensitive" } },
    ];
  }

  const [items, cards] = await Promise.all([
    prisma.vocabItem.findMany({
      where,
      orderBy: [{ frequencyRank: "asc" }, { headword: "asc" }],
      take,
      skip,
    }),
    prisma.srsCard.findMany({
      where: { userId },
      select: { vocabItemId: true },
    }),
  ]);

  const inReview = new Set(cards.map((c) => c.vocabItemId));

  return NextResponse.json({
    items: items.map((it) => ({ ...it, inReview: inReview.has(it.id) })),
  });
}
