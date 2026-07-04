import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";

// GET /api/exams?level=A1&count=10 — случайные вопросы уровня (без ответов)
export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const level = (req.nextUrl.searchParams.get("level") ?? "A1").toUpperCase();
  const count = Math.min(
    Number(req.nextUrl.searchParams.get("count") ?? 10) || 10,
    30
  );

  const all = await prisma.exercise.findMany({
    where: { lesson: { module: { levelCode: level } } },
    select: { id: true, type: true, prompt: true },
  });

  // Перемешиваем и берём count
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  return NextResponse.json({ questions: all.slice(0, count) });
}

const schema = z.object({
  levelCode: z.enum(["A1", "A2", "B1", "B2", "C1"]),
  correct: z.number().int().min(0),
  total: z.number().int().min(1),
});

// POST /api/exams — записать результат теста
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

  const { levelCode, correct, total } = parsed.data;
  const score = Math.round((correct / total) * 100);
  const passed = score >= 80;

  await prisma.examResult.create({
    data: { userId, levelCode, score, passed },
  });

  return NextResponse.json({ passed, score });
}
