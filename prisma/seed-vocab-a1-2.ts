import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Словарь A1 (batch 2): недостающие темы, чтобы довести A1 до полного объёма.
const words: Prisma.VocabItemUncheckedCreateInput[] = [
  // ---------- Дни недели ----------
  { levelCode: "A1", headword: "Monday", ipaUk: "ˈmʌndeɪ", ipaUs: "ˈmʌndeɪ", pos: "noun", translationRu: "понедельник", exampleEn: "I work on Monday.", exampleRu: "Я работаю в понедельник.", topic: "days", frequencyRank: 200, kind: "WORD" },
  { levelCode: "A1", headword: "Tuesday", ipaUk: "ˈtjuːzdeɪ", ipaUs: "ˈtuːzdeɪ", pos: "noun", translationRu: "вторник", exampleEn: "The class is on Tuesday.", exampleRu: "Занятие во вторник.", topic: "days", frequencyRank: 201, kind: "WORD" },
  { levelCode: "A1", headword: "Wednesday", ipaUk: "ˈwenzdeɪ", ipaUs: "ˈwenzdeɪ", pos: "noun", translationRu: "среда", exampleEn: "See you on Wednesday.", exampleRu: "Увидимся в среду.", topic: "days", frequencyRank: 202, kind: "WORD" },
  { levelCode: "A1", headword: "Thursday", ipaUk: "ˈθɜːzdeɪ", ipaUs: "ˈθɜːrzdeɪ", pos: "noun", translationRu: "четверг", exampleEn: "We meet on Thursday.", exampleRu: "Мы встречаемся в четверг.", topic: "days", frequencyRank: 203, kind: "WORD" },
  { levelCode: "A1", headword: "Friday", ipaUk: "ˈfraɪdeɪ", ipaUs: "ˈfraɪdeɪ", pos: "noun", translationRu: "пятница", exampleEn: "Friday is my favourite day.", exampleRu: "Пятница — мой любимый день.", topic: "days", frequencyRank: 204, kind: "WORD" },
  { levelCode: "A1", headword: "Saturday", ipaUk: "ˈsætədeɪ", ipaUs: "ˈsætərdeɪ", pos: "noun", translationRu: "суббота", exampleEn: "We rest on Saturday.", exampleRu: "Мы отдыхаем в субботу.", topic: "days", frequencyRank: 205, kind: "WORD" },
  { levelCode: "A1", headword: "Sunday", ipaUk: "ˈsʌndeɪ", ipaUs: "ˈsʌndeɪ", pos: "noun", translationRu: "воскресенье", exampleEn: "Sunday is a family day.", exampleRu: "Воскресенье — семейный день.", topic: "days", frequencyRank: 206, kind: "WORD" },

  // ---------- Месяцы (частые) ----------
  { levelCode: "A1", headword: "January", ipaUk: "ˈdʒænjuəri", ipaUs: "ˈdʒænjueri", pos: "noun", translationRu: "январь", exampleEn: "My birthday is in January.", exampleRu: "Мой день рождения в январе.", topic: "months", frequencyRank: 207, kind: "WORD" },
  { levelCode: "A1", headword: "summer", ipaUk: "ˈsʌmə", ipaUs: "ˈsʌmər", pos: "noun", translationRu: "лето", exampleEn: "We travel in summer.", exampleRu: "Мы путешествуем летом.", topic: "seasons", frequencyRank: 208, kind: "WORD" },
  { levelCode: "A1", headword: "winter", ipaUk: "ˈwɪntə", ipaUs: "ˈwɪntər", pos: "noun", translationRu: "зима", exampleEn: "It is cold in winter.", exampleRu: "Зимой холодно.", topic: "seasons", frequencyRank: 209, kind: "WORD" },
  { levelCode: "A1", headword: "spring", ipaUk: "sprɪŋ", ipaUs: "sprɪŋ", pos: "noun", translationRu: "весна", exampleEn: "Flowers grow in spring.", exampleRu: "Весной растут цветы.", topic: "seasons", frequencyRank: 210, kind: "WORD" },
  { levelCode: "A1", headword: "autumn", ipaUk: "ˈɔːtəm", ipaUs: "ˈɔːtəm", pos: "noun", translationRu: "осень", exampleEn: "Leaves fall in autumn.", exampleRu: "Осенью падают листья.", topic: "seasons", frequencyRank: 211, kind: "WORD" },

  // ---------- Погода ----------
  { levelCode: "A1", headword: "weather", ipaUk: "ˈweðə", ipaUs: "ˈweðər", pos: "noun", translationRu: "погода", exampleEn: "The weather is nice today.", exampleRu: "Сегодня хорошая погода.", topic: "weather", frequencyRank: 212, kind: "WORD" },
  { levelCode: "A1", headword: "rain", ipaUk: "reɪn", ipaUs: "reɪn", pos: "noun", translationRu: "дождь", exampleEn: "I don't like the rain.", exampleRu: "Я не люблю дождь.", topic: "weather", frequencyRank: 213, kind: "WORD" },
  { levelCode: "A1", headword: "snow", ipaUk: "snəʊ", ipaUs: "snoʊ", pos: "noun", translationRu: "снег", exampleEn: "The snow is white.", exampleRu: "Снег белый.", topic: "weather", frequencyRank: 214, kind: "WORD" },
  { levelCode: "A1", headword: "sun", ipaUk: "sʌn", ipaUs: "sʌn", pos: "noun", translationRu: "солнце", exampleEn: "The sun is hot.", exampleRu: "Солнце горячее.", topic: "weather", frequencyRank: 215, kind: "WORD" },
  { levelCode: "A1", headword: "wind", ipaUk: "wɪnd", ipaUs: "wɪnd", pos: "noun", translationRu: "ветер", exampleEn: "The wind is strong.", exampleRu: "Ветер сильный.", topic: "weather", frequencyRank: 216, kind: "WORD" },
  { levelCode: "A1", headword: "warm", ipaUk: "wɔːm", ipaUs: "wɔːrm", pos: "adj.", translationRu: "тёплый", exampleEn: "It is warm today.", exampleRu: "Сегодня тепло.", topic: "weather", frequencyRank: 217, kind: "WORD" },
  { levelCode: "A1", headword: "cloudy", ipaUk: "ˈklaʊdi", ipaUs: "ˈklaʊdi", pos: "adj.", translationRu: "облачный, пасмурный", exampleEn: "It is cloudy outside.", exampleRu: "На улице пасмурно.", topic: "weather", frequencyRank: 218, kind: "WORD" },

  // ---------- Тело и здоровье ----------
  { levelCode: "A1", headword: "head", ipaUk: "hed", ipaUs: "hed", pos: "noun", translationRu: "голова", exampleEn: "My head hurts.", exampleRu: "У меня болит голова.", topic: "body", frequencyRank: 219, kind: "WORD" },
  { levelCode: "A1", headword: "hand", ipaUk: "hænd", ipaUs: "hænd", pos: "noun", translationRu: "рука (кисть)", exampleEn: "Give me your hand.", exampleRu: "Дай мне руку.", topic: "body", frequencyRank: 220, kind: "WORD" },
  { levelCode: "A1", headword: "eye", ipaUk: "aɪ", ipaUs: "aɪ", pos: "noun", translationRu: "глаз", exampleEn: "She has blue eyes.", exampleRu: "У неё голубые глаза.", topic: "body", frequencyRank: 221, kind: "WORD" },
  { levelCode: "A1", headword: "face", ipaUk: "feɪs", ipaUs: "feɪs", pos: "noun", translationRu: "лицо", exampleEn: "Wash your face.", exampleRu: "Умой лицо.", topic: "body", frequencyRank: 222, kind: "WORD" },
  { levelCode: "A1", headword: "foot", ipaUk: "fʊt", ipaUs: "fʊt", pos: "noun", translationRu: "нога (ступня)", exampleEn: "My foot is cold.", exampleRu: "У меня замёрзла нога.", topic: "body", frequencyRank: 223, kind: "WORD" },
  { levelCode: "A1", headword: "hair", ipaUk: "heə", ipaUs: "her", pos: "noun", translationRu: "волосы", exampleEn: "She has long hair.", exampleRu: "У неё длинные волосы.", topic: "body", frequencyRank: 224, kind: "WORD" },
  { levelCode: "A1", headword: "ill", ipaUk: "ɪl", ipaUs: "ɪl", pos: "adj.", translationRu: "больной", exampleEn: "I feel ill today.", exampleRu: "Сегодня я плохо себя чувствую.", topic: "health", frequencyRank: 225, kind: "WORD" },
  { levelCode: "A1", headword: "medicine", ipaUk: "ˈmedsn", ipaUs: "ˈmedɪsn", pos: "noun", translationRu: "лекарство", exampleEn: "Take this medicine.", exampleRu: "Прими это лекарство.", topic: "health", frequencyRank: 226, kind: "WORD" },

  // ---------- Чувства и состояния ----------
  { levelCode: "A1", headword: "sad", ipaUk: "sæd", ipaUs: "sæd", pos: "adj.", translationRu: "грустный", exampleEn: "Why are you sad?", exampleRu: "Почему ты грустишь?", topic: "feelings", frequencyRank: 227, kind: "WORD" },
  { levelCode: "A1", headword: "angry", ipaUk: "ˈæŋɡri", ipaUs: "ˈæŋɡri", pos: "adj.", translationRu: "сердитый, злой", exampleEn: "He is angry with me.", exampleRu: "Он злится на меня.", topic: "feelings", frequencyRank: 228, kind: "WORD" },
  { levelCode: "A1", headword: "afraid", ipaUk: "əˈfreɪd", ipaUs: "əˈfreɪd", pos: "adj.", translationRu: "испуганный, боящийся", exampleEn: "I am afraid of dogs.", exampleRu: "Я боюсь собак.", topic: "feelings", frequencyRank: 229, kind: "WORD" },
  { levelCode: "A1", headword: "thirsty", ipaUk: "ˈθɜːsti", ipaUs: "ˈθɜːrsti", pos: "adj.", translationRu: "испытывающий жажду", exampleEn: "I am thirsty.", exampleRu: "Я хочу пить.", topic: "feelings", frequencyRank: 230, kind: "WORD" },
  { levelCode: "A1", headword: "busy", ipaUk: "ˈbɪzi", ipaUs: "ˈbɪzi", pos: "adj.", translationRu: "занятой", exampleEn: "I am busy right now.", exampleRu: "Я сейчас занят.", topic: "feelings", frequencyRank: 231, kind: "WORD" },

  // ---------- Места ----------
  { levelCode: "A1", headword: "restaurant", ipaUk: "ˈrestrɒnt", ipaUs: "ˈrestərɑːnt", pos: "noun", translationRu: "ресторан", exampleEn: "Let's go to a restaurant.", exampleRu: "Давай пойдём в ресторан.", topic: "places", frequencyRank: 232, kind: "WORD" },
  { levelCode: "A1", headword: "hospital", ipaUk: "ˈhɒspɪtl", ipaUs: "ˈhɑːspɪtl", pos: "noun", translationRu: "больница", exampleEn: "She works in a hospital.", exampleRu: "Она работает в больнице.", topic: "places", frequencyRank: 233, kind: "WORD" },
  { levelCode: "A1", headword: "park", ipaUk: "pɑːk", ipaUs: "pɑːrk", pos: "noun", translationRu: "парк", exampleEn: "We walk in the park.", exampleRu: "Мы гуляем в парке.", topic: "places", frequencyRank: 234, kind: "WORD" },
  { levelCode: "A1", headword: "bank", ipaUk: "bæŋk", ipaUs: "bæŋk", pos: "noun", translationRu: "банк", exampleEn: "The bank is closed.", exampleRu: "Банк закрыт.", topic: "places", frequencyRank: 235, kind: "WORD" },
  { levelCode: "A1", headword: "market", ipaUk: "ˈmɑːkɪt", ipaUs: "ˈmɑːrkɪt", pos: "noun", translationRu: "рынок", exampleEn: "I buy fruit at the market.", exampleRu: "Я покупаю фрукты на рынке.", topic: "places", frequencyRank: 236, kind: "WORD" },
  { levelCode: "A1", headword: "country", ipaUk: "ˈkʌntri", ipaUs: "ˈkʌntri", pos: "noun", translationRu: "страна", exampleEn: "What country are you from?", exampleRu: "Из какой ты страны?", topic: "places", frequencyRank: 237, kind: "WORD" },

  // ---------- Ещё глаголы ----------
  { levelCode: "A1", headword: "open", ipaUk: "ˈəʊpən", ipaUs: "ˈoʊpən", pos: "verb", translationRu: "открывать", exampleEn: "Open the window, please.", exampleRu: "Открой окно, пожалуйста.", topic: "verbs", frequencyRank: 238, kind: "WORD" },
  { levelCode: "A1", headword: "close", ipaUk: "kləʊz", ipaUs: "kloʊz", pos: "verb", translationRu: "закрывать", exampleEn: "Please close the door.", exampleRu: "Пожалуйста, закрой дверь.", topic: "verbs", frequencyRank: 239, kind: "WORD" },
  { levelCode: "A1", headword: "watch", ipaUk: "wɒtʃ", ipaUs: "wɑːtʃ", pos: "verb", translationRu: "смотреть (наблюдать)", exampleEn: "I watch films at night.", exampleRu: "Я смотрю фильмы вечером.", topic: "verbs", frequencyRank: 240, kind: "WORD" },
  { levelCode: "A1", headword: "play", ipaUk: "pleɪ", ipaUs: "pleɪ", pos: "verb", translationRu: "играть", exampleEn: "The kids play outside.", exampleRu: "Дети играют на улице.", topic: "verbs", frequencyRank: 241, kind: "WORD" },
  { levelCode: "A1", headword: "study", ipaUk: "ˈstʌdi", ipaUs: "ˈstʌdi", pos: "verb", translationRu: "учиться, изучать", exampleEn: "I study English every day.", exampleRu: "Я изучаю английский каждый день.", topic: "verbs", frequencyRank: 242, kind: "WORD" },
  { levelCode: "A1", headword: "start", ipaUk: "stɑːt", ipaUs: "stɑːrt", pos: "verb", translationRu: "начинать", exampleEn: "The film starts at eight.", exampleRu: "Фильм начинается в восемь.", topic: "verbs", frequencyRank: 243, kind: "WORD" },
  { levelCode: "A1", headword: "stop", ipaUk: "stɒp", ipaUs: "stɑːp", pos: "verb", translationRu: "останавливать(ся)", exampleEn: "The bus stops here.", exampleRu: "Автобус останавливается здесь.", topic: "verbs", frequencyRank: 244, kind: "WORD" },
  { levelCode: "A1", headword: "call", ipaUk: "kɔːl", ipaUs: "kɔːl", pos: "verb", translationRu: "звонить; называть", exampleEn: "Call me tonight.", exampleRu: "Позвони мне вечером.", topic: "verbs", frequencyRank: 245, kind: "WORD" },
  { levelCode: "A1", headword: "ask", ipaUk: "ɑːsk", ipaUs: "æsk", pos: "verb", translationRu: "спрашивать; просить", exampleEn: "Can I ask a question?", exampleRu: "Можно задать вопрос?", topic: "verbs", frequencyRank: 246, kind: "WORD" },
  { levelCode: "A1", headword: "answer", ipaUk: "ˈɑːnsə", ipaUs: "ˈænsər", pos: "verb", translationRu: "отвечать; ответ", exampleEn: "Please answer my email.", exampleRu: "Пожалуйста, ответь на моё письмо.", topic: "verbs", frequencyRank: 247, kind: "WORD" },
  { levelCode: "A1", headword: "think", ipaUk: "θɪŋk", ipaUs: "θɪŋk", pos: "verb", translationRu: "думать", exampleEn: "I think you are right.", exampleRu: "Думаю, ты прав.", topic: "verbs", frequencyRank: 248, kind: "WORD" },
  { levelCode: "A1", headword: "feel", ipaUk: "fiːl", ipaUs: "fiːl", pos: "verb", translationRu: "чувствовать (себя)", exampleEn: "I feel good today.", exampleRu: "Сегодня я хорошо себя чувствую.", topic: "verbs", frequencyRank: 249, kind: "WORD" },

  // ---------- Предлоги и служебные слова ----------
  { levelCode: "A1", headword: "in", ipaUk: "ɪn", ipaUs: "ɪn", pos: "prep.", translationRu: "в (внутри)", exampleEn: "The keys are in the bag.", exampleRu: "Ключи в сумке.", topic: "prepositions", frequencyRank: 250, kind: "WORD" },
  { levelCode: "A1", headword: "on", ipaUk: "ɒn", ipaUs: "ɑːn", pos: "prep.", translationRu: "на (поверхности)", exampleEn: "The book is on the table.", exampleRu: "Книга на столе.", topic: "prepositions", frequencyRank: 251, kind: "WORD" },
  { levelCode: "A1", headword: "under", ipaUk: "ˈʌndə", ipaUs: "ˈʌndər", pos: "prep.", translationRu: "под", exampleEn: "The cat is under the chair.", exampleRu: "Кошка под стулом.", topic: "prepositions", frequencyRank: 252, kind: "WORD" },
  { levelCode: "A1", headword: "next to", ipaUk: "ˈnekst tuː", ipaUs: "ˈnekst tuː", pos: "prep.", translationRu: "рядом с", exampleEn: "The shop is next to the bank.", exampleRu: "Магазин рядом с банком.", topic: "prepositions", frequencyRank: 253, kind: "WORD" },
  { levelCode: "A1", headword: "here", ipaUk: "hɪə", ipaUs: "hɪr", pos: "adv.", translationRu: "здесь, сюда", exampleEn: "Come here, please.", exampleRu: "Иди сюда, пожалуйста.", topic: "adverbs", frequencyRank: 254, kind: "WORD" },
  { levelCode: "A1", headword: "there", ipaUk: "ðeə", ipaUs: "ðer", pos: "adv.", translationRu: "там, туда", exampleEn: "Put it over there.", exampleRu: "Положи это туда.", topic: "adverbs", frequencyRank: 255, kind: "WORD" },
  { levelCode: "A1", headword: "now", ipaUk: "naʊ", ipaUs: "naʊ", pos: "adv.", translationRu: "сейчас", exampleEn: "I am busy now.", exampleRu: "Я сейчас занят.", topic: "adverbs", frequencyRank: 256, kind: "WORD" },
  { levelCode: "A1", headword: "very", ipaUk: "ˈveri", ipaUs: "ˈveri", pos: "adv.", translationRu: "очень", exampleEn: "It is very cold.", exampleRu: "Очень холодно.", topic: "adverbs", frequencyRank: 257, kind: "WORD" },

  // ---------- Объектные местоимения ----------
  { levelCode: "A1", headword: "me", ipaUk: "miː", ipaUs: "miː", pos: "pron.", translationRu: "меня, мне", exampleEn: "Give it to me.", exampleRu: "Дай это мне.", topic: "pronouns", frequencyRank: 258, kind: "WORD" },
  { levelCode: "A1", headword: "him", ipaUk: "hɪm", ipaUs: "hɪm", pos: "pron.", translationRu: "его, ему", exampleEn: "I know him well.", exampleRu: "Я хорошо его знаю.", topic: "pronouns", frequencyRank: 259, kind: "WORD" },
  { levelCode: "A1", headword: "her", ipaUk: "hɜː", ipaUs: "hɜːr", pos: "pron.", translationRu: "её, ей", exampleEn: "Please help her.", exampleRu: "Пожалуйста, помоги ей.", topic: "pronouns", frequencyRank: 260, kind: "WORD" },
  { levelCode: "A1", headword: "them", ipaUk: "ðem", ipaUs: "ðem", pos: "pron.", translationRu: "их, им", exampleEn: "I like them.", exampleRu: "Они мне нравятся.", topic: "pronouns", frequencyRank: 261, kind: "WORD" },
];

async function main() {
  let created = 0;
  for (const w of words) {
    const exists = await prisma.vocabItem.findFirst({
      where: { levelCode: w.levelCode, headword: w.headword },
      select: { id: true },
    });
    if (exists) continue;
    await prisma.vocabItem.create({ data: w });
    created++;
  }
  const total = await prisma.vocabItem.count({ where: { levelCode: "A1" } });
  console.log(
    `✅ Словарь A1 (batch 2): добавлено ${created}, всего слов A1 — ${total}.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed словаря A1 (batch 2):", e);
    await prisma.$disconnect();
    process.exit(1);
  });
