import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";
import { checkAnswer } from "@/lib/exercises";

const checkSchema = z.object({
  exerciseId: z.string().min(1),
  userAnswer: z.any(),
});

// POST /api/exercises — проверить ответ на упражнение
export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = checkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { exerciseId, userAnswer } = parsed.data;

  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
  });
  if (!exercise) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isCorrect = checkAnswer(exercise.type, exercise.answer, userAnswer);

  await prisma.exerciseAttempt.create({
    data: {
      userId,
      exerciseId,
      isCorrect,
      userAnswer: userAnswer ?? undefined,
    },
  });

  return NextResponse.json({
    isCorrect,
    correctAnswer: exercise.answer,
    explanation: exercise.explanation,
  });
}
