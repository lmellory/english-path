// Алгоритм интервального повторения SM-2 (SuperMemo 2).
// Состояние карточки: easeFactor (лёгкость), interval (дней до показа), repetitions (успехи подряд).

export interface SrsState {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

export interface SrsResult extends SrsState {
  dueDate: Date;
}

// Оценки для 4 кнопок в интерфейсе повторения → качество ответа q (0..5).
export const REVIEW_GRADES = {
  again: 1, // не вспомнил
  hard: 3, // вспомнил с трудом
  good: 4, // вспомнил
  easy: 5, // легко
} as const;

export type ReviewGrade = keyof typeof REVIEW_GRADES;

export const DEFAULT_SRS_STATE: SrsState = {
  easeFactor: 2.5,
  interval: 0,
  repetitions: 0,
};

/**
 * Рассчитывает новое состояние карточки после повторения.
 * @param state текущее состояние
 * @param quality качество ответа 0..5 (см. REVIEW_GRADES)
 * @param now момент повторения (по умолчанию — сейчас)
 */
export function reviewCard(
  state: SrsState,
  quality: number,
  now: Date = new Date()
): SrsResult {
  const q = Math.max(0, Math.min(5, Math.round(quality)));

  let { easeFactor, interval, repetitions } = state;

  if (q >= 3) {
    // Верный ответ — увеличиваем интервал
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Ошибка — сбрасываем прогресс, показываем снова через день
    repetitions = 0;
    interval = 1;
  }

  // Корректируем лёгкость
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const dueDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

  return { easeFactor, interval, repetitions, dueDate };
}
