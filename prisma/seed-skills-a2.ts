import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function moduleId(type: "READING" | "LISTENING" | "WRITING" | "SPEAKING") {
  const m = await prisma.module.findFirst({
    where: { levelCode: "A2", type },
    select: { id: true },
  });
  if (!m) throw new Error(`Не найден модуль A2 ${type}. Сначала: npx prisma db seed`);
  return m.id;
}

async function has(mId: string, title: string) {
  return !!(await prisma.lesson.findFirst({
    where: { moduleId: mId, title },
    select: { id: true },
  }));
}

async function main() {
  let created = 0;

  // ============================ READING ============================
  const R = await moduleId("READING");

  if (!(await has(R, "My last holiday"))) {
    await prisma.lesson.create({
      data: {
        moduleId: R,
        title: "My last holiday",
        order: 1,
        estMinutes: 12,
        intro: "Прочитайте рассказ о прошлом отпуске (Past Simple).",
        readingTexts: {
          create: [
            {
              levelCode: "A2",
              title: "A trip to Spain",
              bodyEn:
                "Last summer we went to Spain. We stayed in a small hotel near the beach. Every morning we swam in the sea and ate fresh fruit. One day we visited an old castle. It was very hot, so we drank a lot of water. In the evening we walked in the old town. It was a wonderful holiday and we took many photos.",
              questions: [] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            { order: 1, type: "MCQ", prompt: { question: "Where did they go?", options: ["Italy", "Spain", "France"] } as Prisma.InputJsonValue, answer: "Spain" as Prisma.InputJsonValue },
            { order: 2, type: "MCQ", prompt: { question: "Where was the hotel?", options: ["near the beach", "in the mountains", "in a big city"] } as Prisma.InputJsonValue, answer: "near the beach" as Prisma.InputJsonValue },
            { order: 3, type: "MCQ", prompt: { question: "What did they visit one day?", options: ["a museum", "an old castle", "a market"] } as Prisma.InputJsonValue, answer: "an old castle" as Prisma.InputJsonValue },
            { order: 4, type: "MCQ", prompt: { question: "Why did they drink a lot of water?", options: ["it was hot", "it was cheap", "they were ill"] } as Prisma.InputJsonValue, answer: "it was hot" as Prisma.InputJsonValue },
          ],
        },
      },
    });
    created++;
  }

  if (!(await has(R, "A busy city"))) {
    await prisma.lesson.create({
      data: {
        moduleId: R,
        title: "A busy city",
        order: 2,
        estMinutes: 12,
        intro: "Прочитайте описание города и ответьте на вопросы.",
        readingTexts: {
          create: [
            {
              levelCode: "A2",
              title: "Life in London",
              bodyEn:
                "London is a big and busy city. Millions of people live and work there. The city has many parks, museums and shops. Most people travel by underground because the traffic is heavy. London is more expensive than many other cities, but there is always something to do. The weather is often cloudy, but people say the city is beautiful in every season.",
              questions: [] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            { order: 1, type: "MCQ", prompt: { question: "How do most people travel?", options: ["by car", "by underground", "by bike"] } as Prisma.InputJsonValue, answer: "by underground" as Prisma.InputJsonValue },
            { order: 2, type: "MCQ", prompt: { question: "London is ___ than many other cities.", options: ["cheaper", "more expensive", "smaller"] } as Prisma.InputJsonValue, answer: "more expensive" as Prisma.InputJsonValue },
            { order: 3, type: "MCQ", prompt: { question: "What is the weather often like?", options: ["sunny", "cloudy", "snowy"] } as Prisma.InputJsonValue, answer: "cloudy" as Prisma.InputJsonValue },
          ],
        },
      },
    });
    created++;
  }

  if (!(await has(R, "An email to a friend"))) {
    await prisma.lesson.create({
      data: {
        moduleId: R,
        title: "An email to a friend",
        order: 3,
        estMinutes: 12,
        intro: "Прочитайте неформальное письмо и ответьте на вопросы.",
        readingTexts: {
          create: [
            {
              levelCode: "A2",
              title: "Hi from Mark",
              bodyEn:
                "Hi Kate! How are you? I'm writing from my new flat. I moved to Manchester last month because I got a new job. The job is difficult but interesting, and my colleagues are friendly. I'm going to visit you in July. Are you free then? Write back soon! Bye, Mark.",
              questions: [] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            { order: 1, type: "MCQ", prompt: { question: "Why did Mark move to Manchester?", options: ["for a new job", "for university", "for family"] } as Prisma.InputJsonValue, answer: "for a new job" as Prisma.InputJsonValue },
            { order: 2, type: "MCQ", prompt: { question: "What does he say about his colleagues?", options: ["they are lazy", "they are friendly", "they are rude"] } as Prisma.InputJsonValue, answer: "they are friendly" as Prisma.InputJsonValue },
            { order: 3, type: "MCQ", prompt: { question: "When is he going to visit Kate?", options: ["in June", "in July", "in August"] } as Prisma.InputJsonValue, answer: "in July" as Prisma.InputJsonValue },
          ],
        },
      },
    });
    created++;
  }

  // ============================ LISTENING ============================
  const L = await moduleId("LISTENING");

  if (!(await has(L, "Booking a hotel"))) {
    await prisma.lesson.create({
      data: {
        moduleId: L,
        title: "Booking a hotel",
        order: 1,
        estMinutes: 12,
        intro: "Послушайте бронирование номера в отеле и ответьте на вопросы.",
        listeningTasks: {
          create: [
            {
              scriptEn:
                "Good evening. I'd like to book a room, please. Sure. For how many nights? For three nights, from Friday to Monday. A single or a double room? A double room, please. That's ninety pounds per night. Breakfast is included. Great, I'll take it. Thank you!",
              questions: [] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            { order: 1, type: "MCQ", prompt: { question: "How many nights does he book?", options: ["two", "three", "four"] } as Prisma.InputJsonValue, answer: "three" as Prisma.InputJsonValue },
            { order: 2, type: "MCQ", prompt: { question: "What kind of room?", options: ["single", "double", "family"] } as Prisma.InputJsonValue, answer: "double" as Prisma.InputJsonValue },
            { order: 3, type: "MCQ", prompt: { question: "Is breakfast included?", options: ["yes", "no", "we don't know"] } as Prisma.InputJsonValue, answer: "yes" as Prisma.InputJsonValue },
          ],
        },
      },
    });
    created++;
  }

  if (!(await has(L, "Asking for directions"))) {
    await prisma.lesson.create({
      data: {
        moduleId: L,
        title: "Asking for directions",
        order: 2,
        estMinutes: 12,
        intro: "Послушайте, как спрашивают дорогу, и ответьте на вопросы.",
        listeningTasks: {
          create: [
            {
              scriptEn:
                "Excuse me, how do I get to the train station? Go straight on and turn left at the bank. The station is next to a big supermarket. Is it far? No, it's about five minutes on foot. Thank you very much! You're welcome.",
              questions: [] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            { order: 1, type: "MCQ", prompt: { question: "Where should you turn left?", options: ["at the bank", "at the park", "at the school"] } as Prisma.InputJsonValue, answer: "at the bank" as Prisma.InputJsonValue },
            { order: 2, type: "MCQ", prompt: { question: "The station is next to a:", options: ["hospital", "supermarket", "cafe"] } as Prisma.InputJsonValue, answer: "supermarket" as Prisma.InputJsonValue },
            { order: 3, type: "MCQ", prompt: { question: "How long does it take on foot?", options: ["five minutes", "fifteen minutes", "an hour"] } as Prisma.InputJsonValue, answer: "five minutes" as Prisma.InputJsonValue },
          ],
        },
      },
    });
    created++;
  }

  // ============================ WRITING ============================
  const Wm = await moduleId("WRITING");

  if (!(await has(Wm, "Your last weekend"))) {
    await prisma.lesson.create({
      data: {
        moduleId: Wm,
        title: "Your last weekend",
        order: 1,
        estMinutes: 15,
        intro: "Напишите о прошлых выходных, используя Past Simple.",
        grammarPoints: {
          create: [
            {
              title: "Рассказ о прошлом",
              theoryMd: [
                "### Задание",
                "Напишите 4–6 предложений о прошлых выходных (в прошедшем времени).",
                "### Шаблон",
                "- Last weekend I ... (went / visited / stayed) ...\n- On Saturday I ...\n- On Sunday I ...\n- It was ... (great / boring / relaxing).",
                "### Чек-лист самопроверки",
                "- Все глаголы в прошедшем времени (-ed или неправильные)\n- Есть Saturday и Sunday\n- 4–6 предложений\n- В конце — ваше мнение (It was ...)",
              ].join("\n\n"),
              examples: [
                {
                  en: "Last weekend I visited my grandparents. On Saturday we cooked dinner together. On Sunday I watched a film and read a book. It was relaxing.",
                  ru: "На прошлых выходных я навестил бабушку с дедушкой. В субботу мы вместе готовили ужин. В воскресенье я посмотрел фильм и почитал книгу. Было спокойно.",
                },
              ] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            {
              order: 1,
              type: "WRITING",
              prompt: { question: "Напишите 4–6 предложений о прошлых выходных (Past Simple)." } as Prisma.InputJsonValue,
              answer: "" as Prisma.InputJsonValue,
              explanation: "Проверьте: все глаголы в прошедшем времени, есть Saturday и Sunday, есть ваше мнение.",
            },
          ],
        },
      },
    });
    created++;
  }

  if (!(await has(Wm, "A postcard from holiday"))) {
    await prisma.lesson.create({
      data: {
        moduleId: Wm,
        title: "A postcard from holiday",
        order: 2,
        estMinutes: 15,
        intro: "Напишите открытку из отпуска.",
        grammarPoints: {
          create: [
            {
              title: "Открытка из отпуска",
              theoryMd: [
                "### Задание",
                "Представьте, что вы в отпуске. Напишите короткую открытку другу (4–5 предложений).",
                "### Шаблон",
                "- Hi ...!\n- I am in ... (place). The weather is ...\n- Yesterday I ... (visited / saw / ate) ...\n- Today I am going to ...\n- See you soon!",
                "### Чек-лист самопроверки",
                "- Указано место и погода\n- Есть предложение о вчерашнем дне (прошедшее время)\n- Есть план на сегодня (going to)\n- Есть приветствие и прощание",
              ].join("\n\n"),
              examples: [
                {
                  en: "Hi Anna! I am in Italy. The weather is sunny and warm. Yesterday I visited a beautiful old town. Today I am going to swim in the sea. See you soon!",
                  ru: "Привет, Анна! Я в Италии. Погода солнечная и тёплая. Вчера я посетил красивый старый город. Сегодня я собираюсь купаться в море. До скорого!",
                },
              ] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            {
              order: 1,
              type: "WRITING",
              prompt: { question: "Напишите открытку из отпуска (4–5 предложений)." } as Prisma.InputJsonValue,
              answer: "" as Prisma.InputJsonValue,
              explanation: "Проверьте: место и погода, вчерашний день, план на сегодня, приветствие и прощание.",
            },
          ],
        },
      },
    });
    created++;
  }

  // ============================ SPEAKING ============================
  const S = await moduleId("SPEAKING");

  if (!(await has(S, "At the shop"))) {
    await prisma.lesson.create({
      data: {
        moduleId: S,
        title: "At the shop",
        order: 1,
        estMinutes: 10,
        intro: "Диалог в магазине одежды — слушайте и повторяйте.",
        dialogues: {
          create: [
            {
              title: "Buying a jacket",
              lines: [
                { speaker: "Assistant", en: "Hello! Can I help you?", ru: "Здравствуйте! Вам помочь?" },
                { speaker: "Customer", en: "Yes, I'm looking for a jacket.", ru: "Да, я ищу куртку." },
                { speaker: "Assistant", en: "What size do you wear?", ru: "Какой у вас размер?" },
                { speaker: "Customer", en: "Medium, please. How much is this one?", ru: "Средний, пожалуйста. Сколько стоит эта?" },
                { speaker: "Assistant", en: "It's forty pounds.", ru: "Сорок фунтов." },
                { speaker: "Customer", en: "Great, I'll take it.", ru: "Отлично, я возьму её." },
              ] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            {
              order: 1,
              type: "WRITING",
              prompt: { question: "Произнесите диалог вслух за обе роли, затем составьте свой (купите другую вещь)." } as Prisma.InputJsonValue,
              answer: "" as Prisma.InputJsonValue,
            },
          ],
        },
      },
    });
    created++;
  }

  if (!(await has(S, "Making plans"))) {
    await prisma.lesson.create({
      data: {
        moduleId: S,
        title: "Making plans",
        order: 2,
        estMinutes: 10,
        intro: "Диалог о планах на выходные — слушайте и повторяйте.",
        dialogues: {
          create: [
            {
              title: "What are you doing this weekend?",
              lines: [
                { speaker: "A", en: "What are you going to do this weekend?", ru: "Что ты собираешься делать на выходных?" },
                { speaker: "B", en: "I'm going to visit my parents. And you?", ru: "Я собираюсь навестить родителей. А ты?" },
                { speaker: "A", en: "I'll probably stay home and watch films.", ru: "Я, наверное, останусь дома и буду смотреть фильмы." },
                { speaker: "B", en: "Do you want to meet on Sunday?", ru: "Хочешь встретиться в воскресенье?" },
                { speaker: "A", en: "Sure! Let's have a coffee.", ru: "Конечно! Давай выпьем кофе." },
              ] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            {
              order: 1,
              type: "WRITING",
              prompt: { question: "Произнесите диалог вслух, затем напишите свой план на выходные (going to / will)." } as Prisma.InputJsonValue,
              answer: "" as Prisma.InputJsonValue,
            },
          ],
        },
      },
    });
    created++;
  }

  console.log(`✅ Навыковые модули A2: добавлено уроков — ${created}.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed навыков A2:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
