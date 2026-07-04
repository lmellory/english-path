import { PrismaClient, Prisma, ExerciseType } from "@prisma/client";

const prisma = new PrismaClient();

type LessonDef = {
  title: string;
  order: number;
  estMinutes: number;
  intro: string;
  gpTitle: string;
  theory: string[];
  examples: { en: string; ru: string }[];
  exercises: {
    order: number;
    type: ExerciseType;
    prompt: Prisma.InputJsonValue;
    answer: Prisma.InputJsonValue;
    explanation?: string;
  }[];
};

const lessons: LessonDef[] = [
  {
    title: "have got",
    order: 10,
    estMinutes: 12,
    intro: "Ещё один способ сказать, что у вас что-то есть.",
    gpTitle: "have got / has got",
    theory: [
      "**have got** означает «иметь» (что-то есть). Часто используется в британском английском.",
      "- I / you / we / they → **have got**\n- he / she / it → **has got**",
      "### Сокращения, вопрос и отрицание",
      "Сокращённо: I**'ve got**, she**'s got**. Вопрос: **Have** you **got**...? Отрицание: I **haven't got**.",
    ],
    examples: [
      { en: "I have got two brothers.", ru: "У меня есть два брата." },
      { en: "She has got a new phone.", ru: "У неё есть новый телефон." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "She ___ got a cat.", options: ["have", "has", "is"] }, answer: "has", explanation: "he/she/it → has got." },
      { order: 2, type: "MCQ", prompt: { question: "We ___ got a big house.", options: ["have", "has", "are"] }, answer: "have", explanation: "we → have got." },
      { order: 3, type: "FILL_BLANK", prompt: { question: "___ you got a pen? (вопрос)" }, answer: ["have"], explanation: "Вопрос: Have you got...?" },
      { order: 4, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["got", "have", "I", "a", "bike"] }, answer: ["I", "have", "got", "a", "bike"] },
    ],
  },
  {
    title: "Предлоги времени: in / on / at",
    order: 11,
    estMinutes: 12,
    intro: "Какой предлог поставить перед временем, днём или месяцем.",
    gpTitle: "in / on / at во времени",
    theory: [
      "Правило «от большого к малому»:",
      "- **at** — точное время: at 7 o'clock, at night\n- **on** — дни и даты: on Monday, on 5 May\n- **in** — месяцы, годы, сезоны, части дня: in July, in summer, in the morning",
    ],
    examples: [
      { en: "The meeting is at 3 o'clock.", ru: "Встреча в три часа." },
      { en: "I was born in May.", ru: "Я родился в мае." },
      { en: "We meet on Friday.", ru: "Мы встречаемся в пятницу." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "The class starts ___ 9 o'clock.", options: ["in", "on", "at"] }, answer: "at", explanation: "Точное время — at." },
      { order: 2, type: "MCQ", prompt: { question: "My birthday is ___ July.", options: ["in", "on", "at"] }, answer: "in", explanation: "Месяц — in." },
      { order: 3, type: "MCQ", prompt: { question: "See you ___ Monday.", options: ["in", "on", "at"] }, answer: "on", explanation: "День недели — on." },
      { order: 4, type: "FILL_BLANK", prompt: { question: "I get up early ___ the morning." }, answer: ["in"], explanation: "Часть дня — in the morning." },
    ],
  },
  {
    title: "some / any",
    order: 12,
    estMinutes: 10,
    intro: "Как сказать «немного / несколько / какой-нибудь».",
    gpTitle: "some и any",
    theory: [
      "**some** и **any** используются с неисчисляемыми и множественными существительными.",
      "- **some** — в утверждениях: I have **some** money.\n- **any** — в отрицаниях и вопросах: I don't have **any** money; Do you have **any** money?",
    ],
    examples: [
      { en: "There is some milk in the fridge.", ru: "В холодильнике есть немного молока." },
      { en: "I don't have any questions.", ru: "У меня нет вопросов." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "I have ___ water. (утверждение)", options: ["some", "any", "a"] }, answer: "some", explanation: "В утверждении — some." },
      { order: 2, type: "MCQ", prompt: { question: "There aren't ___ apples.", options: ["some", "any", "the"] }, answer: "any", explanation: "В отрицании — any." },
      { order: 3, type: "MCQ", prompt: { question: "Do you have ___ money?", options: ["some", "any", "a"] }, answer: "any", explanation: "В вопросе — any." },
      { order: 4, type: "FILL_BLANK", prompt: { question: "We need ___ bread. (утверждение)" }, answer: ["some"], explanation: "В утверждении — some." },
    ],
  },
  {
    title: "Объектные местоимения (me, him, her)",
    order: 13,
    estMinutes: 10,
    intro: "После глагола и предлога местоимение меняет форму.",
    gpTitle: "Объектный падеж местоимений",
    theory: [
      "После глагола или предлога местоимение стоит в объектной форме:",
      "- I → **me**\n- you → **you**\n- he → **him**\n- she → **her**\n- it → **it**\n- we → **us**\n- they → **them**",
    ],
    examples: [
      { en: "Call me later.", ru: "Позвони мне позже." },
      { en: "I know them.", ru: "Я их знаю." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "Please help ___. (я)", options: ["I", "me", "my"] }, answer: "me", explanation: "I → me (объектная форма)." },
      { order: 2, type: "MCQ", prompt: { question: "I like ___. (он)", options: ["he", "his", "him"] }, answer: "him", explanation: "he → him." },
      { order: 3, type: "MCQ", prompt: { question: "Give it to ___. (мы)", options: ["we", "us", "our"] }, answer: "us", explanation: "we → us." },
      { order: 4, type: "MATCHING", prompt: { question: "Соотнесите формы:", left: ["he", "she", "they"], right: ["him", "her", "them"] }, answer: { he: "him", she: "her", they: "them" } },
    ],
  },
  {
    title: "Повелительное наклонение (Imperatives)",
    order: 14,
    estMinutes: 10,
    intro: "Команды, просьбы и указания.",
    gpTitle: "Как давать команды",
    theory: [
      "**Повелительное наклонение** — команды и просьбы. Берём глагол в базовой форме, без местоимения.",
      "- Утверждение: **Open** the door. **Sit** down.\n- Отрицание: **Don't** + глагол: **Don't** run. **Don't** be late.",
      "Слово **please** делает просьбу вежливой: **Please** sit down.",
    ],
    examples: [
      { en: "Close the window, please.", ru: "Закрой окно, пожалуйста." },
      { en: "Don't touch that!", ru: "Не трогай это!" },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "___ the door, please. (команда)", options: ["Opens", "Open", "Opening"] }, answer: "Open", explanation: "Базовая форма глагола." },
      { order: 2, type: "MCQ", prompt: { question: "___ run in the room! (запрет)", options: ["Not", "Don't", "No"] }, answer: "Don't", explanation: "Запрет — Don't + глагол." },
      { order: 3, type: "WORD_ORDER", prompt: { question: "Соберите просьбу:", words: ["down", "Please", "sit"] }, answer: ["Please", "sit", "down"] },
      { order: 4, type: "FILL_BLANK", prompt: { question: "___ be late! (не опаздывай)" }, answer: ["don't", "dont"], explanation: "Запрет: Don't be late!" },
    ],
  },
];

async function main() {
  const mod = await prisma.module.findFirst({
    where: { levelCode: "A1", type: "GRAMMAR" },
    select: { id: true },
  });
  if (!mod) {
    console.error("❌ Не найден модуль A1 GRAMMAR. Сначала: npx prisma db seed");
    process.exit(1);
  }
  const moduleId = mod.id;
  let created = 0;

  for (const def of lessons) {
    const exists = await prisma.lesson.findFirst({
      where: { moduleId, title: def.title },
      select: { id: true },
    });
    if (exists) continue;

    await prisma.lesson.create({
      data: {
        moduleId,
        title: def.title,
        order: def.order,
        estMinutes: def.estMinutes,
        intro: def.intro,
        grammarPoints: {
          create: [
            {
              title: def.gpTitle,
              theoryMd: def.theory.join("\n\n"),
              examples: def.examples as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: def.exercises.map((e) => ({
            order: e.order,
            type: e.type,
            prompt: e.prompt,
            answer: e.answer,
            explanation: e.explanation,
          })),
        },
      },
    });
    created++;
  }

  const total = await prisma.lesson.count({ where: { moduleId } });
  console.log(
    `✅ Грамматика A1 (batch 3): добавлено ${created}, всего уроков A1 — ${total}.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed грамматики A1 (batch 3):", e);
    await prisma.$disconnect();
    process.exit(1);
  });
