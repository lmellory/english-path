# English Path — Часть 1 (конфиги, layout, тема)

Что внутри этой части:
- Конфигурация проекта: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `.gitignore`, `.env.example`
- Корневой layout и провайдеры: `app/layout.tsx`, `app/providers.tsx`, `app/globals.css`
- Тема dark/light на CSS-переменных + переключатель: `components/layout/ThemeToggle.tsx`
- Утилита `cn`: `lib/utils.ts`
- Тестовая главная страница: `app/page.tsx`

## Как запустить и проверить

1. Распакуйте архив — структура папок уже готова.
2. Установите зависимости (флаг `--ignore-scripts` нужен только сейчас, пока
   в проекте ещё нет Prisma-схемы — она появится в Части 2):

   ```bash
   npm install --ignore-scripts
   ```

3. Запустите dev-сервер:

   ```bash
   npm run dev
   ```

4. Откройте http://localhost:3000

Должна открыться главная страница с заголовком «English Path» и цветными
плашками. Иконка в правом верхнем углу переключает тёмную/светлую тему —
фон и цвета меняются.

## Что дальше (Часть 2)

- Полная Prisma-схема (все таблицы: пользователи, контент курса, прогресс, SRS).
- Подключение к Neon Postgres (`lib/db.ts`, singleton-клиент).
- Инструкция, где в Neon взять `DATABASE_URL` и `DIRECT_URL`.
- Первая миграция.

После Части 2 обычный `npm install` (уже без флагов) отработает корректно.
