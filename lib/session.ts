import { auth } from "@/auth";

/**
 * Возвращает id текущего вошедшего пользователя или null.
 * Используется в API-роутах для привязки данных к профилю.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}
