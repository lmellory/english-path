import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function moduleId(type: "READING" | "LISTENING" | "WRITING" | "SPEAKING") {
  const m = await prisma.module.findFirst({
    where: { levelCode: "A1", type },
    select: { id: true },
  });
  if (!m) throw new Error(`Не найден модуль A1 ${type}. Сначала: npx prisma db seed`);
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

  if (!(await has(R, "My family"))) {
    await prisma.lesson.create({
      data: {
        moduleId: R,
        title: "My family",
        order: 1,
        estMinutes: 10,
        intro: "Прочитайте короткий текст и ответьте на вопросы.",
        readingTexts: {
          create: [
            {
              levelCode: "A1",
              title: "My family",
              bodyEn:
                "Hi! My name is Tom. I have a small family. I have a mother, a father and a sister. My sister is ten years old. We have a dog. Its name is Max. We live in a small house in London. I love my family.",
              questions: [] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            { order: 1, type: "MCQ", prompt: { question: "How old is Tom's sister?", options: ["five", "ten", "twelve"] } as Prisma.InputJsonValue, answer: "ten" as Prisma.InputJsonValue },
            { order: 2, type: "MCQ", prompt: { question: "What is the dog's name?", options: ["Max", "Tom", "Rex"] } as Prisma.InputJsonValue, answer: "Max" as Prisma.InputJsonValue },
            { order: 3, type: "MCQ", prompt: { question: "Where do they live?", options: ["Paris", "London", "Rome"] } as Prisma.InputJsonValue, answer: "London" as Prisma.InputJsonValue },
          ],
        },
      },
    });
    created++;
  }

  if (!(await has(R, "A day at work"))) {
    await prisma.lesson.create({
      data: {
        moduleId: R,
        title: "A day at work",
        order: 2,
        estMinutes: 10,
        intro: "Прочитайте про обычный день Анны и ответьте на вопросы.",
        readingTexts: {
          create: [
            {
              levelCode: "A1",
              title: "Anna's day",
              bodyEn:
                "Anna is a teacher. She gets up at seven o'clock. She has breakfast and drinks coffee. She goes to school by bus. She works from nine to three. In the evening she reads books. She likes her job.",
              questions: [] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            { order: 1, type: "MCQ", prompt: { question: "What is Anna's job?", options: ["doctor", "teacher", "cook"] } as Prisma.InputJsonValue, answer: "teacher" as Prisma.InputJsonValue },
            { order: 2, type: "MCQ", prompt: { question: "How does she go to school?", options: ["by car", "by bus", "on foot"] } as Prisma.InputJsonValue, answer: "by bus" as Prisma.InputJsonValue },
            { order: 3, type: "MCQ", prompt: { question: "What does she do in the evening?", options: ["reads books", "plays football", "cooks dinner"] } as Prisma.InputJsonValue, answer: "reads books" as Prisma.InputJsonValue },
          ],
        },
      },
    });
    created++;
  }

  // ============================ LISTENING ============================
  const L = await moduleId("LISTENING");

  if (!(await has(L, "At the cafe"))) {
    await prisma.lesson.create({
      data: {
        moduleId: L,
        title: "At the cafe",
        order: 1,
        estMinutes: 10,
        intro: "Послушайте разговор в кафе и ответьте на вопросы.",
        listeningTasks: {
          create: [
            {
              scriptEn:
                "Good morning! Can I have a coffee and a sandwich, please? Sure. That is five pounds. Here you are. Thank you. Have a nice day!",
              questions: [] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            { order: 1, type: "MCQ", prompt: { question: "What does the person order?", options: ["tea and cake", "coffee and a sandwich", "juice and an apple"] } as Prisma.InputJsonValue, answer: "coffee and a sandwich" as Prisma.InputJsonValue },
            { order: 2, type: "MCQ", prompt: { question: "How much is it?", options: ["five pounds", "ten pounds", "three pounds"] } as Prisma.InputJsonValue, answer: "five pounds" as Prisma.InputJsonValue },
          ],
        },
      },
    });
    created++;
  }

  if (!(await has(L, "Meeting a friend"))) {
    await prisma.lesson.create({
      data: {
        moduleId: L,
        title: "Meeting a friend",
        order: 2,
        estMinutes: 10,
        intro: "Послушайте встречу двух друзей и ответьте на вопросы.",
        listeningTasks: {
          create: [
            {
              scriptEn:
                "Hi Sarah! How are you? I'm fine, thanks. Where are you going? I'm going to the park. Do you want to come? Yes, sure. Let's go!",
              questions: [] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            { order: 1, type: "MCQ", prompt: { question: "Where is Sarah going?", options: ["to the shop", "to the park", "to work"] } as Prisma.InputJsonValue, answer: "to the park" as Prisma.InputJsonValue },
            { order: 2, type: "MCQ", prompt: { question: "Does the friend go with her?", options: ["yes", "no", "maybe"] } as Prisma.InputJsonValue, answer: "yes" as Prisma.InputJsonValue },
          ],
        },
      },
    });
    created++;
  }

  // ============================ WRITING ============================
  const W = await moduleId("WRITING");

  if (!(await has(W, "Introduce yourself"))) {
    await prisma.lesson.create({
      data: {
        moduleId: W,
        title: "Introduce yourself",
        order: 1,
        estMinutes: 12,
        intro: "Напишите короткое сообщение о себе по шаблону.",
        grammarPoints: {
          create: [
            {
              title: "Как написать о себе",
              theoryMd: [
                "### Задание",
                "Напишите короткое сообщение о себе (3–4 предложения).",
                "### Шаблон",
                "- Hello! My name is ...\n- I am from ...\n- I work / study ...\n- I like ...",
                "### Чек-лист самопроверки",
                "- Есть приветствие и имя\n- Указано, откуда вы\n- 3–4 предложения\n- Каждое с заглавной буквы и с точкой в конце",
              ].join("\n\n"),
              examples: [
                {
                  en: "Hello! My name is Ivan. I am from Russia. I study English. I like football.",
                  ru: "Привет! Меня зовут Иван. Я из России. Я изучаю английский. Я люблю футбол.",
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
              prompt: { question: "Напишите 3–4 предложения о себе по шаблону выше." } as Prisma.InputJsonValue,
              answer: "" as Prisma.InputJsonValue,
              explanation: "Сверьтесь с чек-листом: приветствие, имя, откуда вы, что любите.",
            },
          ],
        },
      },
    });
    created++;
  }

  if (!(await has(W, "Write a short message"))) {
    await prisma.lesson.create({
      data: {
        moduleId: W,
        title: "Write a short message",
        order: 2,
        estMinutes: 12,
        intro: "Напишите другу короткое сообщение с приглашением.",
        grammarPoints: {
          create: [
            {
              title: "Сообщение-приглашение",
              theoryMd: [
                "### Задание",
                "Напишите другу сообщение и пригласите его куда-нибудь (3–4 предложения).",
                "### Шаблон",
                "- Hi ...!\n- Do you want to ... (go to the cinema / have a coffee) ... ?\n- It is on ... (day) at ... (time).\n- See you!",
                "### Чек-лист самопроверки",
                "- Есть обращение по имени\n- Есть приглашение (вопрос)\n- Указаны день и время\n- Есть прощание",
              ].join("\n\n"),
              examples: [
                {
                  en: "Hi Anna! Do you want to go to the cinema? It is on Saturday at six. See you!",
                  ru: "Привет, Анна! Хочешь сходить в кино? В субботу в шесть. Увидимся!",
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
              prompt: { question: "Напишите сообщение-приглашение другу (3–4 предложения)." } as Prisma.InputJsonValue,
              answer: "" as Prisma.InputJsonValue,
              explanation: "Проверьте по чек-листу: обращение, приглашение, день и время, прощание.",
            },
          ],
        },
      },
    });
    created++;
  }

  // ============================ SPEAKING ============================
  const S = await moduleId("SPEAKING");

  if (!(await has(S, "Greetings and introductions"))) {
    await prisma.lesson.create({
      data: {
        moduleId: S,
        title: "Greetings and introductions",
        order: 1,
        estMinutes: 10,
        intro: "Прослушайте диалог знакомства и повторите реплики вслух.",
        dialogues: {
          create: [
            {
              title: "Nice to meet you",
              lines: [
                { speaker: "A", en: "Hello! What's your name?", ru: "Привет! Как тебя зовут?" },
                { speaker: "B", en: "Hi! My name is Anna. And you?", ru: "Привет! Меня зовут Анна. А тебя?" },
                { speaker: "A", en: "I'm Tom. Nice to meet you!", ru: "Я Том. Приятно познакомиться!" },
                { speaker: "B", en: "Nice to meet you too!", ru: "Мне тоже приятно!" },
              ] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            {
              order: 1,
              type: "WRITING",
              prompt: { question: "Произнесите реплики вслух за A и за B, затем напишите свой вариант знакомства." } as Prisma.InputJsonValue,
              answer: "" as Prisma.InputJsonValue,
            },
          ],
        },
      },
    });
    created++;
  }

  if (!(await has(S, "Ordering in a cafe"))) {
    await prisma.lesson.create({
      data: {
        moduleId: S,
        title: "Ordering in a cafe",
        order: 2,
        estMinutes: 10,
        intro: "Прослушайте, как делают заказ в кафе, и потренируйтесь вслух.",
        dialogues: {
          create: [
            {
              title: "At the cafe",
              lines: [
                { speaker: "Waiter", en: "Hello! What would you like?", ru: "Здравствуйте! Что желаете?" },
                { speaker: "You", en: "A tea and a cake, please.", ru: "Чай и пирожное, пожалуйста." },
                { speaker: "Waiter", en: "Anything else?", ru: "Что-нибудь ещё?" },
                { speaker: "You", en: "No, thank you. How much is it?", ru: "Нет, спасибо. Сколько с меня?" },
                { speaker: "Waiter", en: "Four pounds, please.", ru: "Четыре фунта, пожалуйста." },
              ] as Prisma.InputJsonValue,
            },
          ],
        },
        exercises: {
          create: [
            {
              order: 1,
              type: "WRITING",
              prompt: { question: "Произнесите диалог вслух за обе роли, затем закажите свой набор (напишите реплики)." } as Prisma.InputJsonValue,
              answer: "" as Prisma.InputJsonValue,
            },
          ],
        },
      },
    });
    created++;
  }

  console.log(`✅ Навыковые модули A1: добавлено уроков — ${created}.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed навыков A1:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
