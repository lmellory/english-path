import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";

const schema = z.object({
  vocabItemIds: z.array(z.string().min(1)).min(1).max(200),
});

// POST /api/vocab/learn — добавить слова в набор повторения (SRS)
export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const now = new Date();
  const data = parsed.data.vocabItemIds.map((vocabItemId) => ({
    userId,
    vocabItemId,
    dueDate: now, // сразу доступны для первого повторения
  }));

  const result = await prisma.srsCard.createMany({
    data,
    skipDuplicates: true,
  });

  return NextResponse.json({ added: result.count });
}
