import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";
import { setLessonStatus } from "@/lib/progress";

// GET /api/progress            — весь прогресс пользователя
// GET /api/progress?lessonId=  — прогресс по одному уроку
export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lessonId = req.nextUrl.searchParams.get("lessonId");

  if (lessonId) {
    const progress = await prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });
    return NextResponse.json({ progress });
  }

  const progress = await prisma.lessonProgress.findMany({ where: { userId } });
  return NextResponse.json({ progress });
}

const progressSchema = z.object({
  lessonId: z.string().min(1),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
  score: z.number().int().min(0).max(100).optional(),
});

// POST /api/progress — обновить статус урока
export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = progressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { lessonId, status, score } = parsed.data;
  const progress = await setLessonStatus(userId, lessonId, status, score);

  return NextResponse.json({ progress });
}
