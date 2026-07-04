import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const mod = await prisma.module.findFirst({
    where: { levelCode: "A1", type: "GRAMMAR" },
    select: { id: true },
  });
  if (!mod) {
    console.error(
      "❌ Не найден модуль A1 GRAMMAR. Сначала выполните: npx prisma db seed"
    );
    process.exit(1);
  }
  const moduleId = mod.id;
  let created = 0;

  // --- Урок 1: to be ---
  const hasToBe = await prisma.lesson.findFirst({
    where: { moduleId, title: "Глагол to be (am / is / are)" },
    select: { id: true },
  });
  if (!hasToBe) {
    await prisma.lesson.create({
      data: {
        moduleId,
        title: "Глагол to be (am / is / are)",
        order: 1,
        estMinutes: 12,
        intro:
          "Самый важный глагол в английском. С него начинается почти каждое предложение о том, кто вы, какой вы и где вы.",
        grammarPoints: {
          create: [
            {
              title: "Формы глагола to be",
              theoryMd: [
                "Глагол **to be** («быть») меняет форму в зависимости от местоимения:",
                "- I → **am**\n- he / she / it → **is**\n- we / you / they → **are**",
                "В речи часто используют сокращения: `I'm`, `he's`, `they're`.",
                "### Отрицание",
                "Добавляем **not**: I am **not**, he **isn't**, they **aren't**.",
              ].join("\n\n"),
              examples: [
                { en: "I am a student.", ru: "Я студент." },
                { en: "She is from Italy.", ru: "Она из Италии." },
                { en: "They are my friends.", ru: "Они мои друзья." },
              ] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            {
              order: 1,
              type: "MCQ",
              prompt: {
                question: "I ___ a teacher.",
                options: ["am", "is", "are"],
              } as Prisma.InputJsonValue,
              answer: "am" as Prisma.InputJsonValue,
              explanation: "С местоимением I всегда используется am.",
            },
            {
              order: 2,
              type: "MCQ",
              prompt: {
                question: "She ___ from Spain.",
                options: ["am", "is", "are"],
              } as Prisma.InputJsonValue,
              answer: "is" as Prisma.InputJsonValue,
              explanation: "He / she / it → is.",
            },
            {
              order: 3,
              type: "FILL_BLANK",
              prompt: { question: "We ___ ready. (be)" } as Prisma.InputJsonValue,
              answer: ["are"] as Prisma.InputJsonValue,
              explanation: "We / you / they → are.",
            },
            {
              order: 4,
              type: "WORD_ORDER",
              prompt: {
                question: "Соберите предложение:",
                words: ["He", "is", "my", "brother"],
              } as Prisma.InputJsonValue,
              answer: ["He", "is", "my", "brother"] as Prisma.InputJsonValue,
            },
          ],
        },
      },
    });
    created++;
  }

  // --- Урок 2: Present Simple ---
  const hasPS = await prisma.lesson.findFirst({
    where: { moduleId, title: "Present Simple" },
    select: { id: true },
  });
  if (!hasPS) {
    await prisma.lesson.create({
      data: {
        moduleId,
        title: "Present Simple",
        order: 2,
        estMinutes: 15,
        intro:
          "Время для привычек, расписаний и общих фактов: то, что происходит регулярно.",
        grammarPoints: {
          create: [
            {
              title: "Настоящее простое время",
              theoryMd: [
                "**Present Simple** описывает регулярные действия и факты: I work, she works.",
                "- I / you / we / they → базовая форма: **work**\n- he / she / it → форма с **-s**: **works**",
                "### Отрицание и вопрос",
                "Используем вспомогательный глагол **do / does**: I **don't** work, he **doesn't** work, **Do** you work?",
              ].join("\n\n"),
              examples: [
                {
                  en: "I drink coffee every morning.",
                  ru: "Я пью кофе каждое утро.",
                },
                { en: "He works in a bank.", ru: "Он работает в банке." },
                { en: "They don't like tea.", ru: "Они не любят чай." },
              ] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            {
              order: 1,
              type: "MCQ",
              prompt: {
                question: "He ___ coffee every day.",
                options: ["drink", "drinks", "drinking"],
              } as Prisma.InputJsonValue,
              answer: "drinks" as Prisma.InputJsonValue,
              explanation: "He / she / it → глагол с окончанием -s.",
            },
            {
              order: 2,
              type: "FILL_BLANK",
              prompt: {
                question: "I ___ music. (like)",
              } as Prisma.InputJsonValue,
              answer: ["like"] as Prisma.InputJsonValue,
              explanation: "С I используется базовая форма без -s.",
            },
            {
              order: 3,
              type: "MCQ",
              prompt: {
                question: "They ___ like tea.",
                options: ["doesn't", "don't", "isn't"],
              } as Prisma.InputJsonValue,
              answer: "don't" as Prisma.InputJsonValue,
              explanation: "Для they отрицание образуется через don't.",
            },
            {
              order: 4,
              type: "MATCHING",
              prompt: {
                question: "Соотнесите местоимение и форму глагола:",
                left: ["He", "We", "She"],
                right: ["work", "works"],
              } as Prisma.InputJsonValue,
              answer: {
                He: "works",
                We: "work",
                She: "works",
              } as Prisma.InputJsonValue,
            },
          ],
        },
      },
    });
    created++;
  }

  console.log(`✅ Грамматика A1: добавлено уроков — ${created}.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed грамматики:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
