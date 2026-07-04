import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Сокращения, фразовые глаголы и идиомы (batch 1).
// Уровни: чат-сокращения и простые фразовые — A2; деловые сокращения, идиомы и
// сложные фразовые — B1. Транскрипцию для многословных выражений не даём (null),
// озвучка при этом работает.
const items: Prisma.VocabItemUncheckedCreateInput[] = [
  // ===================== ЧАТ-СОКРАЩЕНИЯ (A2) =====================
  { levelCode: "A2", headword: "LOL", pos: "abbr.", translationRu: "laughing out loud — «громко смеюсь» (ха-ха)", exampleEn: "That's so funny, LOL!", exampleRu: "Так смешно, ха-ха!", topic: "chat", frequencyRank: 1, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "BRB", pos: "abbr.", translationRu: "be right back — «скоро вернусь»", exampleEn: "BRB, someone's at the door.", exampleRu: "Скоро вернусь, кто-то у двери.", topic: "chat", frequencyRank: 2, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "IDK", pos: "abbr.", translationRu: "I don't know — «я не знаю»", exampleEn: "IDK where he is.", exampleRu: "Не знаю, где он.", topic: "chat", frequencyRank: 3, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "TBH", pos: "abbr.", translationRu: "to be honest — «честно говоря»", exampleEn: "TBH, I don't like it.", exampleRu: "Честно говоря, мне не нравится.", topic: "chat", frequencyRank: 4, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "OMG", pos: "abbr.", translationRu: "oh my God — «о боже»", exampleEn: "OMG, that's amazing!", exampleRu: "О боже, это потрясающе!", topic: "chat", frequencyRank: 5, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "BTW", pos: "abbr.", translationRu: "by the way — «кстати»", exampleEn: "BTW, are you free tonight?", exampleRu: "Кстати, ты свободен вечером?", topic: "chat", frequencyRank: 6, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "IMO", pos: "abbr.", translationRu: "in my opinion — «по-моему»", exampleEn: "IMO, this film is boring.", exampleRu: "По-моему, этот фильм скучный.", topic: "chat", frequencyRank: 7, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "TTYL", pos: "abbr.", translationRu: "talk to you later — «поговорим позже»", exampleEn: "Gotta go, TTYL!", exampleRu: "Мне пора, поговорим позже!", topic: "chat", frequencyRank: 8, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "NP", pos: "abbr.", translationRu: "no problem — «без проблем»", exampleEn: "Thanks! — NP!", exampleRu: "Спасибо! — Без проблем!", topic: "chat", frequencyRank: 9, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "JK", pos: "abbr.", translationRu: "just kidding — «шучу»", exampleEn: "You failed! JK, you passed.", exampleRu: "Ты провалился! Шучу, ты сдал.", topic: "chat", frequencyRank: 10, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "BFF", pos: "abbr.", translationRu: "best friends forever — «лучшие друзья навсегда»", exampleEn: "She's my BFF.", exampleRu: "Она моя лучшая подруга.", topic: "chat", frequencyRank: 11, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "DM", pos: "abbr.", translationRu: "direct message — «личное сообщение»", exampleEn: "Send me a DM.", exampleRu: "Напиши мне в личку.", topic: "chat", frequencyRank: 12, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "IDC", pos: "abbr.", translationRu: "I don't care — «мне всё равно»", exampleEn: "IDC what they think.", exampleRu: "Мне всё равно, что они думают.", topic: "chat", frequencyRank: 13, register: "SLANG", kind: "ABBREVIATION" },
  { levelCode: "A2", headword: "THX", pos: "abbr.", translationRu: "thanks — «спасибо»", exampleEn: "THX for your help!", exampleRu: "Спасибо за помощь!", topic: "chat", frequencyRank: 14, register: "SLANG", kind: "ABBREVIATION" },

  // ===================== ДЕЛОВЫЕ СОКРАЩЕНИЯ (B1) =====================
  { levelCode: "B1", headword: "ASAP", pos: "abbr.", translationRu: "as soon as possible — «как можно скорее»", exampleEn: "Please reply ASAP.", exampleRu: "Пожалуйста, ответьте как можно скорее.", topic: "business", frequencyRank: 1, register: "NEUTRAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "FYI", pos: "abbr.", translationRu: "for your information — «к вашему сведению»", exampleEn: "FYI, the meeting is cancelled.", exampleRu: "К вашему сведению, встреча отменена.", topic: "business", frequencyRank: 2, register: "NEUTRAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "ETA", pos: "abbr.", translationRu: "estimated time of arrival — «ожидаемое время прибытия»", exampleEn: "What's your ETA?", exampleRu: "Когда ты примерно будешь?", topic: "business", frequencyRank: 3, register: "NEUTRAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "e.g.", pos: "abbr.", translationRu: "for example (лат. exempli gratia) — «например»", exampleEn: "Bring some fruit, e.g. apples.", exampleRu: "Принеси фруктов, например яблоки.", topic: "academic", frequencyRank: 4, register: "FORMAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "i.e.", pos: "abbr.", translationRu: "that is (лат. id est) — «то есть»", exampleEn: "The capital, i.e. London.", exampleRu: "Столица, то есть Лондон.", topic: "academic", frequencyRank: 5, register: "FORMAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "etc.", pos: "abbr.", translationRu: "and so on (лат. et cetera) — «и так далее»", exampleEn: "Pens, pencils, etc.", exampleRu: "Ручки, карандаши и так далее.", topic: "academic", frequencyRank: 6, register: "FORMAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "N/A", pos: "abbr.", translationRu: "not applicable / not available — «не применимо / нет данных»", exampleEn: "Middle name: N/A.", exampleRu: "Отчество: нет данных.", topic: "business", frequencyRank: 7, register: "NEUTRAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "RSVP", pos: "abbr.", translationRu: "please reply (франц.) — «просьба ответить» (на приглашение)", exampleEn: "RSVP by Friday.", exampleRu: "Просьба ответить до пятницы.", topic: "business", frequencyRank: 8, register: "FORMAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "TBD", pos: "abbr.", translationRu: "to be decided — «будет решено позже»", exampleEn: "The date is TBD.", exampleRu: "Дата будет определена позже.", topic: "business", frequencyRank: 9, register: "NEUTRAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "AKA", pos: "abbr.", translationRu: "also known as — «также известный как»", exampleEn: "John Smith, AKA the boss.", exampleRu: "Джон Смит, также известный как босс.", topic: "business", frequencyRank: 10, register: "NEUTRAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "FAQ", pos: "abbr.", translationRu: "frequently asked questions — «часто задаваемые вопросы»", exampleEn: "Check the FAQ page.", exampleRu: "Посмотрите раздел частых вопросов.", topic: "business", frequencyRank: 11, register: "NEUTRAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "CV", pos: "abbr.", translationRu: "curriculum vitae — «резюме»", exampleEn: "Send us your CV.", exampleRu: "Пришлите нам своё резюме.", topic: "business", frequencyRank: 12, register: "FORMAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "PS", pos: "abbr.", translationRu: "postscript — «постскриптум, приписка»", exampleEn: "PS: don't forget the keys.", exampleRu: "P.S.: не забудь ключи.", topic: "business", frequencyRank: 13, register: "NEUTRAL", kind: "ABBREVIATION" },
  { levelCode: "B1", headword: "VIP", pos: "abbr.", translationRu: "very important person — «особо важная персона»", exampleEn: "He's a VIP guest.", exampleRu: "Он VIP-гость.", topic: "business", frequencyRank: 14, register: "NEUTRAL", kind: "ABBREVIATION" },

  // ===================== ФРАЗОВЫЕ ГЛАГОЛЫ (A2) =====================
  { levelCode: "A2", headword: "get up", pos: "phr.v.", translationRu: "вставать (с постели)", exampleEn: "I get up at seven.", exampleRu: "Я встаю в семь.", topic: "phrasal verbs", frequencyRank: 20, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "wake up", pos: "phr.v.", translationRu: "просыпаться; будить", exampleEn: "Wake up, it's late!", exampleRu: "Просыпайся, уже поздно!", topic: "phrasal verbs", frequencyRank: 21, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "sit down", pos: "phr.v.", translationRu: "садиться", exampleEn: "Please sit down.", exampleRu: "Пожалуйста, садитесь.", topic: "phrasal verbs", frequencyRank: 22, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "stand up", pos: "phr.v.", translationRu: "вставать, подниматься", exampleEn: "Everyone stood up.", exampleRu: "Все встали.", topic: "phrasal verbs", frequencyRank: 23, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "turn on", pos: "phr.v.", translationRu: "включать", exampleEn: "Turn on the light, please.", exampleRu: "Включи свет, пожалуйста.", topic: "phrasal verbs", frequencyRank: 24, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "turn off", pos: "phr.v.", translationRu: "выключать", exampleEn: "Turn off the TV.", exampleRu: "Выключи телевизор.", topic: "phrasal verbs", frequencyRank: 25, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "put on", pos: "phr.v.", translationRu: "надевать", exampleEn: "Put on your coat.", exampleRu: "Надень пальто.", topic: "phrasal verbs", frequencyRank: 26, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "take off", pos: "phr.v.", translationRu: "снимать (одежду); взлетать", exampleEn: "The plane takes off at six.", exampleRu: "Самолёт взлетает в шесть.", topic: "phrasal verbs", frequencyRank: 27, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "look for", pos: "phr.v.", translationRu: "искать", exampleEn: "I'm looking for my keys.", exampleRu: "Я ищу свои ключи.", topic: "phrasal verbs", frequencyRank: 28, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "come back", pos: "phr.v.", translationRu: "возвращаться", exampleEn: "Come back soon!", exampleRu: "Возвращайся скорее!", topic: "phrasal verbs", frequencyRank: 29, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "A2", headword: "go out", pos: "phr.v.", translationRu: "выходить (из дома); гулять", exampleEn: "Let's go out tonight.", exampleRu: "Давай сходим куда-нибудь вечером.", topic: "phrasal verbs", frequencyRank: 30, register: "NEUTRAL", kind: "PHRASAL_VERB" },

  // ===================== ФРАЗОВЫЕ ГЛАГОЛЫ (B1) =====================
  { levelCode: "B1", headword: "give up", pos: "phr.v.", translationRu: "сдаваться; бросать (привычку)", exampleEn: "Don't give up!", exampleRu: "Не сдавайся!", topic: "phrasal verbs", frequencyRank: 20, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "find out", pos: "phr.v.", translationRu: "выяснять, узнавать", exampleEn: "I'll find out the answer.", exampleRu: "Я выясню ответ.", topic: "phrasal verbs", frequencyRank: 21, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "look after", pos: "phr.v.", translationRu: "заботиться, присматривать", exampleEn: "She looks after her sister.", exampleRu: "Она присматривает за сестрой.", topic: "phrasal verbs", frequencyRank: 22, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "pick up", pos: "phr.v.", translationRu: "поднимать; забирать; заезжать за", exampleEn: "I'll pick you up at eight.", exampleRu: "Я заеду за тобой в восемь.", topic: "phrasal verbs", frequencyRank: 23, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "put off", pos: "phr.v.", translationRu: "откладывать (на потом)", exampleEn: "Don't put off the work.", exampleRu: "Не откладывай работу.", topic: "phrasal verbs", frequencyRank: 24, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "run out of", pos: "phr.v.", translationRu: "заканчиваться (о запасах)", exampleEn: "We ran out of milk.", exampleRu: "У нас закончилось молоко.", topic: "phrasal verbs", frequencyRank: 25, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "come across", pos: "phr.v.", translationRu: "натыкаться, случайно находить", exampleEn: "I came across an old photo.", exampleRu: "Я наткнулся на старое фото.", topic: "phrasal verbs", frequencyRank: 26, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "get on with", pos: "phr.v.", translationRu: "ладить с кем-то", exampleEn: "I get on well with my boss.", exampleRu: "Я хорошо лажу с начальником.", topic: "phrasal verbs", frequencyRank: 27, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "look forward to", pos: "phr.v.", translationRu: "с нетерпением ждать", exampleEn: "I look forward to the trip.", exampleRu: "Я с нетерпением жду поездки.", topic: "phrasal verbs", frequencyRank: 28, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "break down", pos: "phr.v.", translationRu: "ломаться (о технике)", exampleEn: "My car broke down.", exampleRu: "Моя машина сломалась.", topic: "phrasal verbs", frequencyRank: 29, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "carry on", pos: "phr.v.", translationRu: "продолжать", exampleEn: "Carry on, you're doing well.", exampleRu: "Продолжай, у тебя хорошо получается.", topic: "phrasal verbs", frequencyRank: 30, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "figure out", pos: "phr.v.", translationRu: "понять, разобраться", exampleEn: "I can't figure it out.", exampleRu: "Я не могу в этом разобраться.", topic: "phrasal verbs", frequencyRank: 31, register: "NEUTRAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "hang out", pos: "phr.v.", translationRu: "тусоваться, проводить время", exampleEn: "We hang out on weekends.", exampleRu: "Мы тусуемся по выходным.", topic: "phrasal verbs", frequencyRank: 32, register: "INFORMAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "show up", pos: "phr.v.", translationRu: "появляться, приходить", exampleEn: "He didn't show up.", exampleRu: "Он так и не пришёл.", topic: "phrasal verbs", frequencyRank: 33, register: "INFORMAL", kind: "PHRASAL_VERB" },
  { levelCode: "B1", headword: "take care of", pos: "phr.v.", translationRu: "заботиться о; заниматься чем-то", exampleEn: "I'll take care of it.", exampleRu: "Я об этом позабочусь.", topic: "phrasal verbs", frequencyRank: 34, register: "NEUTRAL", kind: "PHRASAL_VERB" },

  // ===================== ИДИОМЫ (B1) =====================
  { levelCode: "B1", headword: "piece of cake", pos: "idiom", translationRu: "проще простого, легкотня", exampleEn: "The test was a piece of cake.", exampleRu: "Тест был проще простого.", topic: "idioms", frequencyRank: 40, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "break a leg", pos: "idiom", translationRu: "ни пуха ни пера (удачи)", exampleEn: "Break a leg at the concert!", exampleRu: "Удачи на концерте!", topic: "idioms", frequencyRank: 41, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "hit the books", pos: "idiom", translationRu: "засесть за учёбу", exampleEn: "I need to hit the books tonight.", exampleRu: "Сегодня мне нужно засесть за учёбу.", topic: "idioms", frequencyRank: 42, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "under the weather", pos: "idiom", translationRu: "нездоровится, чувствовать себя неважно", exampleEn: "I'm feeling under the weather.", exampleRu: "Мне немного нездоровится.", topic: "idioms", frequencyRank: 43, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "once in a blue moon", pos: "idiom", translationRu: "очень редко, раз в сто лет", exampleEn: "We meet once in a blue moon.", exampleRu: "Мы видимся крайне редко.", topic: "idioms", frequencyRank: 44, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "cost an arm and a leg", pos: "idiom", translationRu: "стоить целое состояние", exampleEn: "That car cost an arm and a leg.", exampleRu: "Та машина стоила целое состояние.", topic: "idioms", frequencyRank: 45, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "on the same page", pos: "idiom", translationRu: "быть заодно, понимать друг друга", exampleEn: "Let's make sure we're on the same page.", exampleRu: "Давай убедимся, что мы понимаем друг друга.", topic: "idioms", frequencyRank: 46, register: "NEUTRAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "call it a day", pos: "idiom", translationRu: "закончить работу на сегодня", exampleEn: "Let's call it a day.", exampleRu: "Давай на сегодня закончим.", topic: "idioms", frequencyRank: 47, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "hit the road", pos: "idiom", translationRu: "отправляться в путь", exampleEn: "It's late, let's hit the road.", exampleRu: "Уже поздно, пора в путь.", topic: "idioms", frequencyRank: 48, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "out of the blue", pos: "idiom", translationRu: "как гром среди ясного неба, внезапно", exampleEn: "She called me out of the blue.", exampleRu: "Она позвонила совершенно неожиданно.", topic: "idioms", frequencyRank: 49, register: "NEUTRAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "keep an eye on", pos: "idiom", translationRu: "приглядывать за, следить", exampleEn: "Keep an eye on my bag, please.", exampleRu: "Приглядите за моей сумкой, пожалуйста.", topic: "idioms", frequencyRank: 50, register: "NEUTRAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "get the hang of", pos: "idiom", translationRu: "приноровиться, освоить", exampleEn: "You'll get the hang of it.", exampleRu: "Ты скоро приноровишься.", topic: "idioms", frequencyRank: 51, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "no worries", pos: "idiom", translationRu: "не переживай, всё нормально", exampleEn: "No worries, take your time.", exampleRu: "Не переживай, не торопись.", topic: "idioms", frequencyRank: 52, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "make up your mind", pos: "idiom", translationRu: "решиться, принять решение", exampleEn: "Make up your mind, we're late!", exampleRu: "Решай уже, мы опаздываем!", topic: "idioms", frequencyRank: 53, register: "INFORMAL", kind: "IDIOM" },
  { levelCode: "B1", headword: "a hot potato", pos: "idiom", translationRu: "щекотливая, острая тема", exampleEn: "That topic is a hot potato.", exampleRu: "Эта тема очень щекотливая.", topic: "idioms", frequencyRank: 54, register: "INFORMAL", kind: "IDIOM" },
];

async function main() {
  let created = 0;
  for (const w of items) {
    const exists = await prisma.vocabItem.findFirst({
      where: { levelCode: w.levelCode, headword: w.headword },
      select: { id: true },
    });
    if (exists) continue;
    await prisma.vocabItem.create({ data: w });
    created++;
  }

  const byKind = await prisma.vocabItem.groupBy({
    by: ["kind"],
    _count: true,
    where: { kind: { in: ["ABBREVIATION", "PHRASAL_VERB", "IDIOM"] } },
  });
  console.log(`✅ Сленг-батч: добавлено ${created}.`);
  for (const g of byKind) {
    console.log(`   ${g.kind}: ${g._count}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed сленга:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
