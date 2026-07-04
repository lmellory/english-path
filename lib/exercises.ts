import type { ExerciseType } from "@prisma/client";

function normalize(s: unknown): string {
  return String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/**
 * Проверяет ответ пользователя против эталона (на сервере — чтобы нельзя было подсмотреть).
 * Формат `correct` зависит от типа упражнения:
 * - MCQ / FILL_BLANK / READING_Q / LISTENING: строка или массив допустимых строк
 * - WORD_ORDER: массив слов в правильном порядке
 * - MATCHING: объект { левое: правильное_правое }
 * - SPEAKING / WRITING: творческие задания, засчитываются автоматически
 */
export function checkAnswer(
  type: ExerciseType,
  correct: unknown,
  userAnswer: unknown
): boolean {
  switch (type) {
    case "MCQ":
    case "FILL_BLANK":
    case "READING_Q":
    case "LISTENING": {
      if (Array.isArray(correct)) {
        return correct.some((c) => normalize(c) === normalize(userAnswer));
      }
      return normalize(correct) === normalize(userAnswer);
    }

    case "WORD_ORDER": {
      const a = Array.isArray(correct) ? correct.map(normalize) : [];
      const b = Array.isArray(userAnswer) ? userAnswer.map(normalize) : [];
      return a.length > 0 && a.length === b.length && a.every((v, i) => v === b[i]);
    }

    case "MATCHING": {
      if (
        typeof correct !== "object" ||
        correct === null ||
        typeof userAnswer !== "object" ||
        userAnswer === null
      ) {
        return false;
      }
      const c = correct as Record<string, unknown>;
      const u = userAnswer as Record<string, unknown>;
      const keys = Object.keys(c);
      return (
        keys.length === Object.keys(u).length &&
        keys.every((k) => normalize(c[k]) === normalize(u[k]))
      );
    }

    case "SPEAKING":
    case "WRITING":
      // Творческие задания: самопроверка на клиенте, засчитываем как выполненные.
      return true;

    default:
      return false;
  }
}
