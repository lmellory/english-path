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
    title: "Артикли a / an / the",
    order: 3,
    estMinutes: 12,
    intro:
      "Маленькие слова перед существительными, которые в русском отсутствуют. Разберём, когда какой ставить.",
    gpTitle: "Три случая: a, an, the",
    theory: [
      "**Артикль** ставится перед существительным. Выбор зависит от звука и от того, конкретный ли предмет.",
      "- **a** — перед согласным звуком: a book, a car\n- **an** — перед гласным звуком: an apple, an hour\n- **the** — когда предмет конкретный или уже известен: the sun, the book on the table",
      "### Когда артикль не нужен",
      "С неисчисляемыми словами и общими понятиями во множественном числе: I like **music**; **Cats** are nice.",
    ],
    examples: [
      { en: "I have a dog and an old cat.", ru: "У меня есть собака и старая кошка." },
      { en: "The dog is in the garden.", ru: "Собака в саду." },
      { en: "She is an English teacher.", ru: "Она учительница английского." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "I have ___ apple.", options: ["a", "an", "the"] }, answer: "an", explanation: "Перед гласным звуком — an." },
      { order: 2, type: "MCQ", prompt: { question: "She is ___ doctor.", options: ["a", "an", "the"] }, answer: "a", explanation: "Перед согласным звуком — a." },
      { order: 3, type: "FILL_BLANK", prompt: { question: "Look at ___ moon! (конкретный предмет)" }, answer: ["the"], explanation: "Единственная, всем известная — the." },
      { order: 4, type: "MCQ", prompt: { question: "He is ___ hour late.", options: ["a", "an", "the"] }, answer: "an", explanation: "В слове hour буква h не читается, звук гласный — an." },
    ],
  },
  {
    title: "Множественное число существительных",
    order: 4,
    estMinutes: 12,
    intro: "Как из одного предмета сделать «много»: правила и исключения.",
    gpTitle: "Образование множественного числа",
    theory: [
      "Обычно к слову добавляется **-s**: book → book**s**, cat → cat**s**.",
      "- после s, x, ch, sh → **-es**: box → box**es**, bus → bus**es**\n- согласная + y → **-ies**: city → cit**ies**\n- особые слова: man → **men**, woman → **women**, child → **children**, foot → **feet**",
    ],
    examples: [
      { en: "I have three books.", ru: "У меня три книги." },
      { en: "There are two buses.", ru: "Там два автобуса." },
      { en: "The children are playing.", ru: "Дети играют." },
    ],
    exercises: [
      { order: 1, type: "FILL_BLANK", prompt: { question: "one box → two ___" }, answer: ["boxes"], explanation: "После x добавляем -es." },
      { order: 2, type: "FILL_BLANK", prompt: { question: "one city → two ___" }, answer: ["cities"], explanation: "Согласная + y → -ies." },
      { order: 3, type: "MCQ", prompt: { question: "Множественное число слова child:", options: ["childs", "children", "childes"] }, answer: "children", explanation: "child — особое слово." },
      { order: 4, type: "FILL_BLANK", prompt: { question: "one man → two ___" }, answer: ["men"], explanation: "man → men (исключение)." },
    ],
  },
  {
    title: "this / that / these / those",
    order: 5,
    estMinutes: 10,
    intro: "Указательные слова: близко или далеко, один предмет или много.",
    gpTitle: "Указательные местоимения",
    theory: [
      "Показывают, о каком предмете речь — рядом он или вдали, один или несколько.",
      "- **this** — этот (близко, ед.ч.)\n- **that** — тот (далеко, ед.ч.)\n- **these** — эти (близко, мн.ч.)\n- **those** — те (далеко, мн.ч.)",
    ],
    examples: [
      { en: "This is my phone.", ru: "Это мой телефон." },
      { en: "Those houses are big.", ru: "Те дома большие." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "___ apples here are fresh. (близко, мн.ч.)", options: ["This", "These", "That"] }, answer: "These", explanation: "Близко и много — these." },
      { order: 2, type: "MCQ", prompt: { question: "Look at ___ bird in the sky. (далеко, ед.ч.)", options: ["this", "that", "these"] }, answer: "that", explanation: "Далеко и один — that." },
      { order: 3, type: "FILL_BLANK", prompt: { question: "___ is my sister. (близко, ед.ч.)" }, answer: ["this"], explanation: "Близко, один — this." },
      { order: 4, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["are", "These", "my", "shoes"] }, answer: ["These", "are", "my", "shoes"] },
    ],
  },
  {
    title: "Притяжательные: my, your, 's",
    order: 6,
    estMinutes: 12,
    intro: "Как сказать, чей это предмет.",
    gpTitle: "Чей предмет: my / your и окончание 's",
    theory: [
      "Притяжательные местоимения показывают принадлежность:",
      "- I → **my**\n- you → **your**\n- he → **his**\n- she → **her**\n- it → **its**\n- we → **our**\n- they → **their**",
      "### Притяжательный падеж 's",
      "Для людей добавляем **'s**: Anna**'s** book — книга Анны; my brother**'s** car — машина моего брата.",
    ],
    examples: [
      { en: "This is my book.", ru: "Это моя книга." },
      { en: "That is Anna's phone.", ru: "Это телефон Анны." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "This is ___ car. (принадлежит ей)", options: ["his", "her", "their"] }, answer: "her", explanation: "she → her." },
      { order: 2, type: "FILL_BLANK", prompt: { question: "We love ___ family. (принадлежит нам)" }, answer: ["our"], explanation: "we → our." },
      { order: 3, type: "MCQ", prompt: { question: "It is ___ house. (принадлежит им)", options: ["our", "your", "their"] }, answer: "their", explanation: "they → their." },
      { order: 4, type: "MATCHING", prompt: { question: "Соотнесите местоимение и притяжательную форму:", left: ["I", "he", "they"], right: ["my", "his", "their"] }, answer: { I: "my", he: "his", they: "their" } },
    ],
  },
  {
    title: "there is / there are",
    order: 7,
    estMinutes: 12,
    intro: "Как сказать, что где-то что-то есть.",
    gpTitle: "Наличие: there is / there are",
    theory: [
      "**There is / There are** сообщают, что что-то существует или находится где-то.",
      "- **there is** + единственное число: There **is** a cat.\n- **there are** + множественное число: There **are** two cats.",
      "### Отрицание и вопрос",
      "Отрицание: There **isn't** / There **aren't**. Вопрос: **Is there**...? / **Are there**...?",
    ],
    examples: [
      { en: "There is a book on the table.", ru: "На столе есть книга." },
      { en: "There are five people here.", ru: "Здесь пять человек." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "There ___ a dog in the garden.", options: ["is", "are", "am"] }, answer: "is", explanation: "Один предмет — there is." },
      { order: 2, type: "MCQ", prompt: { question: "There ___ three cups on the table.", options: ["is", "are", "be"] }, answer: "are", explanation: "Несколько — there are." },
      { order: 3, type: "FILL_BLANK", prompt: { question: "___ there any milk? (вопрос, ед.ч.)" }, answer: ["is"], explanation: "Вопрос с ед.ч. — Is there...?" },
      { order: 4, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["are", "There", "two", "windows"] }, answer: ["There", "are", "two", "windows"] },
    ],
  },
  {
    title: "can / can't (умение)",
    order: 8,
    estMinutes: 10,
    intro: "Как сказать, что вы умеете или не умеете что-то делать.",
    gpTitle: "Модальный глагол can",
    theory: [
      "**can** выражает умение или возможность. После can — глагол в **базовой форме** без to.",
      "- Утверждение: I **can** swim.\n- Отрицание: I **can't** (cannot) swim.\n- Вопрос: **Can** you swim?",
    ],
    examples: [
      { en: "I can speak English.", ru: "Я умею говорить по-английски." },
      { en: "She can't drive.", ru: "Она не умеет водить." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "I ___ swim very well.", options: ["can", "cans", "can to"] }, answer: "can", explanation: "can не меняется и идёт без to." },
      { order: 2, type: "MCQ", prompt: { question: "He ___ come today. (не может)", options: ["can't", "don't", "isn't"] }, answer: "can't", explanation: "Отрицание умения — can't." },
      { order: 3, type: "FILL_BLANK", prompt: { question: "___ you help me? (вопрос)" }, answer: ["can"], explanation: "Вопрос: Can you...?" },
      { order: 4, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["can", "She", "play", "the", "piano"] }, answer: ["She", "can", "play", "the", "piano"] },
    ],
  },
  {
    title: "Present Continuous",
    order: 9,
    estMinutes: 15,
    intro: "Время для действий, которые происходят прямо сейчас, в момент речи.",
    gpTitle: "Настоящее длительное время",
    theory: [
      "**Present Continuous** описывает действие, которое происходит **прямо сейчас**.",
      "Формула: **am / is / are** + глагол с окончанием **-ing**.",
      "- I **am** working\n- he / she / it **is** working\n- we / you / they **are** working",
      "### Написание -ing",
      "make → mak**ing** (убираем e); run → run**ning** (удваиваем согласную).",
    ],
    examples: [
      { en: "I am reading a book now.", ru: "Я сейчас читаю книгу." },
      { en: "They are playing football.", ru: "Они играют в футбол." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "She ___ TV now.", options: ["watch", "is watching", "watches"] }, answer: "is watching", explanation: "Сейчас → is + -ing." },
      { order: 2, type: "FILL_BLANK", prompt: { question: "I am ___ a book. (read)" }, answer: ["reading"], explanation: "read → reading." },
      { order: 3, type: "MCQ", prompt: { question: "They ___ football at the moment.", options: ["are playing", "play", "plays"] }, answer: "are playing", explanation: "they → are + -ing." },
      { order: 4, type: "FILL_BLANK", prompt: { question: "He is ___ in the park. (run)" }, answer: ["running"], explanation: "run → running (удвоение n)." },
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
    `✅ Грамматика A1 (batch 2): добавлено ${created}, всего уроков A1 — ${total}.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed грамматики A1:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
