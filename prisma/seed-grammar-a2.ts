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
    title: "Past Simple: was / were",
    order: 1,
    estMinutes: 12,
    intro: "Прошедшее время глагола «быть».",
    gpTitle: "was и were",
    theory: [
      "**Past Simple** глагола to be — was и were («был / была / были»).",
      "- I / he / she / it → **was**\n- you / we / they → **were**",
      "### Отрицание и вопрос",
      "Отрицание: **wasn't** / **weren't**. Вопрос: **Was** he...? **Were** you...?",
    ],
    examples: [
      { en: "I was at home yesterday.", ru: "Вчера я был дома." },
      { en: "They were happy.", ru: "Они были счастливы." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "I ___ tired last night.", options: ["was", "were", "am"] }, answer: "was", explanation: "I → was." },
      { order: 2, type: "MCQ", prompt: { question: "They ___ at school yesterday.", options: ["was", "were", "are"] }, answer: "were", explanation: "they → were." },
      { order: 3, type: "FILL_BLANK", prompt: { question: "She ___ at work. (не была)" }, answer: ["wasn't", "was not"], explanation: "she → wasn't." },
      { order: 4, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["were", "We", "at", "home"] }, answer: ["We", "were", "at", "home"] },
    ],
  },
  {
    title: "Past Simple: правильные глаголы",
    order: 2,
    estMinutes: 12,
    intro: "Как поставить обычный глагол в прошедшее время.",
    gpTitle: "Окончание -ed",
    theory: [
      "Правильные глаголы в прошедшем времени получают **-ed**: work → work**ed**, play → play**ed**.",
      "- глагол на -e → +d: like → lik**ed**\n- согласная + y → -ied: study → stud**ied**\n- краткий слог → удвоение: stop → stop**ped**",
    ],
    examples: [
      { en: "I worked yesterday.", ru: "Вчера я работал." },
      { en: "She studied all day.", ru: "Она училась весь день." },
    ],
    exercises: [
      { order: 1, type: "FILL_BLANK", prompt: { question: "play → ___ (прошедшее)" }, answer: ["played"] },
      { order: 2, type: "FILL_BLANK", prompt: { question: "study → ___ (прошедшее)" }, answer: ["studied"], explanation: "согласная + y → -ied." },
      { order: 3, type: "FILL_BLANK", prompt: { question: "stop → ___ (прошедшее)" }, answer: ["stopped"], explanation: "краткий слог → удвоение." },
      { order: 4, type: "MCQ", prompt: { question: "Yesterday I ___ football.", options: ["play", "played", "plays"] }, answer: "played" },
    ],
  },
  {
    title: "Past Simple: неправильные глаголы",
    order: 3,
    estMinutes: 14,
    intro: "Глаголы, которые нужно запомнить.",
    gpTitle: "Неправильные глаголы",
    theory: [
      "Неправильные глаголы образуют прошедшее время особым образом — их учат наизусть.",
      "- go → **went**\n- have → **had**\n- see → **saw**\n- do → **did**\n- get → **got**\n- come → **came**\n- eat → **ate**\n- make → **made**",
    ],
    examples: [
      { en: "I went to London last year.", ru: "В прошлом году я ездил в Лондон." },
      { en: "We had a great time.", ru: "Мы отлично провели время." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "go (прошедшее) → ___", options: ["goed", "went", "gone"] }, answer: "went" },
      { order: 2, type: "MCQ", prompt: { question: "have (прошедшее) → ___", options: ["haved", "had", "has"] }, answer: "had" },
      { order: 3, type: "FILL_BLANK", prompt: { question: "I ___ a film yesterday. (see)" }, answer: ["saw"] },
      { order: 4, type: "FILL_BLANK", prompt: { question: "She ___ breakfast. (eat)" }, answer: ["ate"] },
    ],
  },
  {
    title: "Past Simple: отрицания и вопросы",
    order: 4,
    estMinutes: 14,
    intro: "Как задать вопрос и построить отрицание в прошедшем времени.",
    gpTitle: "did / didn't",
    theory: [
      "Для отрицаний и вопросов в прошедшем времени используется **did**. Главный глагол при этом стоит в **базовой форме**!",
      "- Отрицание: I **didn't go** (не «didn't went»!)\n- Вопрос: **Did** you go?\n- Краткий ответ: Yes, I did. / No, I didn't.",
    ],
    examples: [
      { en: "I didn't see him.", ru: "Я его не видел." },
      { en: "Did you like the film?", ru: "Тебе понравился фильм?" },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "I ___ go to school.", options: ["didn't", "don't", "wasn't"] }, answer: "didn't" },
      { order: 2, type: "MCQ", prompt: { question: "___ you see her?", options: ["Do", "Did", "Was"] }, answer: "Did" },
      { order: 3, type: "MCQ", prompt: { question: "She didn't ___ home.", options: ["went", "go", "goes"] }, answer: "go", explanation: "После did/didn't — базовая форма." },
      { order: 4, type: "WORD_ORDER", prompt: { question: "Соберите вопрос:", words: ["you", "Did", "the", "book", "read"] }, answer: ["Did", "you", "read", "the", "book"] },
    ],
  },
  {
    title: "Сравнительная степень (comparatives)",
    order: 5,
    estMinutes: 14,
    intro: "Как сравнить два предмета: «больше, быстрее, интереснее».",
    gpTitle: "Comparative adjectives",
    theory: [
      "**Сравнительная степень** сравнивает два предмета.",
      "- короткие: **-er than**: big → bigg**er than**\n- на -y → -ier: happy → happ**ier**\n- длинные: **more ... than**: **more** expensive **than**\n- исключения: good → **better**, bad → **worse**",
    ],
    examples: [
      { en: "My car is faster than yours.", ru: "Моя машина быстрее твоей." },
      { en: "This book is more interesting.", ru: "Эта книга интереснее." },
    ],
    exercises: [
      { order: 1, type: "FILL_BLANK", prompt: { question: "big → ___ (сравнительная)" }, answer: ["bigger"] },
      { order: 2, type: "MCQ", prompt: { question: "This film is ___ than that one.", options: ["more good", "better", "gooder"] }, answer: "better", explanation: "good → better." },
      { order: 3, type: "MCQ", prompt: { question: "A plane is ___ than a car.", options: ["more fast", "faster", "fastest"] }, answer: "faster" },
      { order: 4, type: "MCQ", prompt: { question: "Gold is ___ than silver.", options: ["expensiver", "more expensive", "most expensive"] }, answer: "more expensive", explanation: "Длинное слово → more." },
    ],
  },
  {
    title: "Превосходная степень (superlatives)",
    order: 6,
    estMinutes: 14,
    intro: "Как сказать «самый…».",
    gpTitle: "Superlative adjectives",
    theory: [
      "**Превосходная степень** — «самый». Обычно с **the**.",
      "- короткие: the **-est**: the bigg**est**\n- на -y → -iest: the happ**iest**\n- длинные: **the most**: the **most** expensive\n- исключения: good → **the best**, bad → **the worst**",
    ],
    examples: [
      { en: "It's the biggest city in the country.", ru: "Это самый большой город в стране." },
      { en: "She is the best student.", ru: "Она лучшая ученица." },
    ],
    exercises: [
      { order: 1, type: "FILL_BLANK", prompt: { question: "big → the ___ (превосходная)" }, answer: ["biggest"] },
      { order: 2, type: "MCQ", prompt: { question: "He is ___ player in the team.", options: ["the best", "the goodest", "the most good"] }, answer: "the best" },
      { order: 3, type: "MCQ", prompt: { question: "This is ___ film I know.", options: ["the most interesting", "the interestingest", "most interesting"] }, answer: "the most interesting" },
      { order: 4, type: "FILL_BLANK", prompt: { question: "happy → the ___ (превосходная)" }, answer: ["happiest"] },
    ],
  },
  {
    title: "be going to (планы)",
    order: 7,
    estMinutes: 12,
    intro: "Как говорить о планах и намерениях на будущее.",
    gpTitle: "be going to",
    theory: [
      "**be going to** выражает планы и намерения.",
      "Формула: **am / is / are** + **going to** + глагол.",
      "- I **am going to** study.\n- She **is going to** travel.\n- They **are going to** move.",
    ],
    examples: [
      { en: "I am going to visit my friend.", ru: "Я собираюсь навестить друга." },
      { en: "We are going to buy a car.", ru: "Мы собираемся купить машину." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "She is going ___ study tonight.", options: ["to", "for", "at"] }, answer: "to" },
      { order: 2, type: "MCQ", prompt: { question: "They ___ going to travel.", options: ["is", "are", "am"] }, answer: "are" },
      { order: 3, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["going", "I", "am", "to", "sleep"] }, answer: ["I", "am", "going", "to", "sleep"] },
      { order: 4, type: "FILL_BLANK", prompt: { question: "We ___ going to win. (are/is)" }, answer: ["are"] },
    ],
  },
  {
    title: "will (будущее)",
    order: 8,
    estMinutes: 12,
    intro: "Предсказания и решения, принятые в момент речи.",
    gpTitle: "will / won't",
    theory: [
      "**will** используют для предсказаний и спонтанных решений.",
      "- Предсказание: It **will** rain tomorrow.\n- Решение сейчас: I **will** help you.\n- Отрицание: **won't** (will not). Вопрос: **Will** you...?",
    ],
    examples: [
      { en: "I think it will be sunny.", ru: "Думаю, будет солнечно." },
      { en: "I'll call you later.", ru: "Я позвоню тебе позже." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "I think she ___ come.", options: ["will", "is", "does"] }, answer: "will" },
      { order: 2, type: "MCQ", prompt: { question: "He ___ come, he is busy. (не придёт)", options: ["will", "won't", "doesn't"] }, answer: "won't" },
      { order: 3, type: "FILL_BLANK", prompt: { question: "___ you help me? (вопрос с will)" }, answer: ["will"] },
      { order: 4, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["will", "It", "tomorrow", "rain"] }, answer: ["It", "will", "rain", "tomorrow"] },
    ],
  },
  {
    title: "Present Perfect (ever / never)",
    order: 9,
    estMinutes: 16,
    intro: "Время жизненного опыта: «когда-либо / никогда».",
    gpTitle: "have / has + 3-я форма",
    theory: [
      "**Present Perfect** связывает прошлое с настоящим — говорит об опыте.",
      "Формула: **have / has** + 3-я форма глагола (past participle).\n- I **have seen** it.\n- She **has been** to Paris.",
      "### ever и never",
      "**ever** — в вопросах («когда-нибудь»): Have you **ever** been to London? **never** — «никогда»: I have **never** eaten sushi.",
    ],
    examples: [
      { en: "I have never been to Japan.", ru: "Я никогда не был в Японии." },
      { en: "Have you ever seen a whale?", ru: "Ты когда-нибудь видел кита?" },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "She ___ been to Rome.", options: ["have", "has", "is"] }, answer: "has" },
      { order: 2, type: "MCQ", prompt: { question: "I ___ seen this film.", options: ["have", "has", "am"] }, answer: "have" },
      { order: 3, type: "MCQ", prompt: { question: "Have you ___ been to Paris?", options: ["ever", "never", "always"] }, answer: "ever" },
      { order: 4, type: "FILL_BLANK", prompt: { question: "I have ___ eaten sushi. (никогда)" }, answer: ["never"] },
    ],
  },
  {
    title: "much / many / a lot of",
    order: 10,
    estMinutes: 14,
    intro: "Слова количества для исчисляемых и неисчисляемых существительных.",
    gpTitle: "Количество",
    theory: [
      "Выбор зависит от того, исчисляемое существительное или нет.",
      "- **many** + исчисляемые: how **many** books\n- **much** + неисчисляемые: how **much** water\n- **a lot of** — с обоими (в утверждениях): a **lot of** friends",
      "### a few / a little",
      "**a few** + исчисляемые: a **few** apples. **a little** + неисчисляемые: a **little** milk.",
    ],
    examples: [
      { en: "How many people are there?", ru: "Сколько там человек?" },
      { en: "I don't have much time.", ru: "У меня мало времени." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "How ___ books do you have?", options: ["much", "many", "little"] }, answer: "many", explanation: "books — исчисляемые." },
      { order: 2, type: "MCQ", prompt: { question: "How ___ water is there?", options: ["much", "many", "few"] }, answer: "much", explanation: "water — неисчисляемое." },
      { order: 3, type: "MCQ", prompt: { question: "I have a ___ friends here.", options: ["little", "much", "few"] }, answer: "few", explanation: "a few + исчисляемые." },
      { order: 4, type: "MCQ", prompt: { question: "There is a ___ milk left.", options: ["few", "little", "many"] }, answer: "little", explanation: "a little + неисчисляемое." },
    ],
  },
  {
    title: "Наречия частоты",
    order: 11,
    estMinutes: 12,
    intro: "Как часто происходит действие и куда ставить эти слова.",
    gpTitle: "Adverbs of frequency",
    theory: [
      "Наречия частоты показывают, как часто что-то происходит:",
      "always (всегда) → usually (обычно) → often (часто) → sometimes (иногда) → rarely (редко) → never (никогда)",
      "### Место в предложении",
      "Обычно **перед** смысловым глаголом, но **после** глагола to be: I **often** walk; She is **always** late.",
    ],
    examples: [
      { en: "I always drink coffee in the morning.", ru: "Я всегда пью кофе утром." },
      { en: "He is never late.", ru: "Он никогда не опаздывает." },
    ],
    exercises: [
      { order: 1, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["always", "I", "tea", "drink"] }, answer: ["I", "always", "drink", "tea"] },
      { order: 2, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["is", "always", "She", "late"] }, answer: ["She", "is", "always", "late"] },
      { order: 3, type: "MCQ", prompt: { question: "'never' переводится как:", options: ["всегда", "иногда", "никогда"] }, answer: "никогда" },
      { order: 4, type: "MCQ", prompt: { question: "Какое наречие означает «обычно»?", options: ["usually", "rarely", "never"] }, answer: "usually" },
    ],
  },
  {
    title: "have to / don't have to",
    order: 12,
    estMinutes: 12,
    intro: "Необходимость и её отсутствие.",
    gpTitle: "have to",
    theory: [
      "**have to** выражает необходимость и обязанность («должен, приходится»).",
      "- I / you / we / they → **have to**\n- he / she / it → **has to**\n- **don't / doesn't have to** = «не обязательно».",
    ],
    examples: [
      { en: "I have to work on Monday.", ru: "В понедельник мне надо работать." },
      { en: "She doesn't have to come.", ru: "Ей не обязательно приходить." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "He ___ to get up early.", options: ["have", "has", "having"] }, answer: "has" },
      { order: 2, type: "MCQ", prompt: { question: "We ___ to finish this. (обязаны)", options: ["have", "has", "are"] }, answer: "have" },
      { order: 3, type: "MCQ", prompt: { question: "You ___ have to pay, it's free. (не обязан)", options: ["don't", "doesn't", "aren't"] }, answer: "don't" },
      { order: 4, type: "FILL_BLANK", prompt: { question: "She ___ to study. (has/have)" }, answer: ["has"] },
    ],
  },
  {
    title: "should / shouldn't (совет)",
    order: 13,
    estMinutes: 12,
    intro: "Как давать советы и рекомендации.",
    gpTitle: "should",
    theory: [
      "**should** даёт совет («следует, стоит»). После should — базовая форма глагола.",
      "- Совет: You **should** rest.\n- Отрицание: You **shouldn't** smoke.\n- Вопрос: **Should** I call him?",
    ],
    examples: [
      { en: "You should see a doctor.", ru: "Тебе стоит сходить к врачу." },
      { en: "You shouldn't eat so much sugar.", ru: "Тебе не стоит есть так много сахара." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "You ___ drink more water. (совет)", options: ["should", "must", "will"] }, answer: "should" },
      { order: 2, type: "MCQ", prompt: { question: "He ___ smoke. (не следует)", options: ["shouldn't", "don't", "isn't"] }, answer: "shouldn't" },
      { order: 3, type: "MCQ", prompt: { question: "После 'should' используем:", options: ["base verb (go)", "to + verb (to go)", "verb+ing (going)"] }, answer: "base verb (go)" },
      { order: 4, type: "WORD_ORDER", prompt: { question: "Соберите совет:", words: ["should", "You", "more", "sleep"] }, answer: ["You", "should", "sleep", "more"] },
    ],
  },
  {
    title: "Условие 1 типа (First Conditional)",
    order: 14,
    estMinutes: 14,
    intro: "Реальное условие в будущем: если… то…",
    gpTitle: "If + Present, ... will",
    theory: [
      "**Первый тип условия** описывает реальную ситуацию в будущем.",
      "Формула: **If** + Present Simple, ... **will** + глагол.",
      "- If it **rains**, I **will** stay home.\n- If you **study**, you **will** pass.",
    ],
    examples: [
      { en: "If you help me, I will finish faster.", ru: "Если ты поможешь мне, я закончу быстрее." },
      { en: "If it is sunny, we will go out.", ru: "Если будет солнечно, мы пойдём гулять." },
    ],
    exercises: [
      { order: 1, type: "MCQ", prompt: { question: "If it ___, we will stay home.", options: ["rains", "will rain", "rained"] }, answer: "rains", explanation: "После if — Present Simple." },
      { order: 2, type: "MCQ", prompt: { question: "If you study, you ___ pass.", options: ["will", "are", "do"] }, answer: "will" },
      { order: 3, type: "WORD_ORDER", prompt: { question: "Соберите предложение:", words: ["rains", "If", "it", "will", "I", "home", "stay"] }, answer: ["If", "it", "rains", "I", "will", "stay", "home"] },
      { order: 4, type: "FILL_BLANK", prompt: { question: "If you ___ hard, you will succeed. (work)" }, answer: ["work"] },
    ],
  },
];

async function main() {
  const mod = await prisma.module.findFirst({
    where: { levelCode: "A2", type: "GRAMMAR" },
    select: { id: true },
  });
  if (!mod) {
    console.error("❌ Не найден модуль A2 GRAMMAR. Сначала: npx prisma db seed");
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
    `✅ Грамматика A2: добавлено ${created}, всего уроков A2 — ${total}.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed грамматики A2:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
