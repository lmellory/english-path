import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const W = (
  headword: string,
  ipaUk: string,
  ipaUs: string,
  pos: string,
  translationRu: string,
  exampleEn: string,
  exampleRu: string,
  topic: string,
  frequencyRank: number
): Prisma.VocabItemUncheckedCreateInput => ({
  levelCode: "A2",
  headword,
  ipaUk,
  ipaUs,
  pos,
  translationRu,
  exampleEn,
  exampleRu,
  topic,
  frequencyRank,
  kind: "WORD",
});

const words: Prisma.VocabItemUncheckedCreateInput[] = [
  // ---------- Путешествия ----------
  W("airport", "ˈeəpɔːt", "ˈerpɔːrt", "noun", "аэропорт", "We arrived at the airport early.", "Мы приехали в аэропорт рано.", "travel", 300),
  W("ticket", "ˈtɪkɪt", "ˈtɪkɪt", "noun", "билет", "I bought a train ticket.", "Я купил билет на поезд.", "travel", 301),
  W("passport", "ˈpɑːspɔːt", "ˈpæspɔːrt", "noun", "паспорт", "Show me your passport, please.", "Покажите ваш паспорт, пожалуйста.", "travel", 302),
  W("luggage", "ˈlʌɡɪdʒ", "ˈlʌɡɪdʒ", "noun", "багаж", "My luggage is very heavy.", "Мой багаж очень тяжёлый.", "travel", 303),
  W("journey", "ˈdʒɜːni", "ˈdʒɜːrni", "noun", "поездка, путешествие", "The journey took five hours.", "Поездка заняла пять часов.", "travel", 304),
  W("flight", "flaɪt", "flaɪt", "noun", "рейс, полёт", "Our flight is at noon.", "Наш рейс в полдень.", "travel", 305),
  W("abroad", "əˈbrɔːd", "əˈbrɔːd", "adv.", "за границей, за границу", "They live abroad now.", "Сейчас они живут за границей.", "travel", 306),
  W("tourist", "ˈtʊərɪst", "ˈtʊrɪst", "noun", "турист", "The city is full of tourists.", "Город полон туристов.", "travel", 307),

  // ---------- Работа ----------
  W("manager", "ˈmænɪdʒə", "ˈmænɪdʒər", "noun", "менеджер, руководитель", "Ask the manager for help.", "Обратитесь за помощью к менеджеру.", "work", 308),
  W("meeting", "ˈmiːtɪŋ", "ˈmiːtɪŋ", "noun", "встреча, совещание", "The meeting starts at ten.", "Совещание начинается в десять.", "work", 309),
  W("salary", "ˈsæləri", "ˈsæləri", "noun", "зарплата", "She has a good salary.", "У неё хорошая зарплата.", "work", 310),
  W("office", "ˈɒfɪs", "ˈɔːfɪs", "noun", "офис", "I work in a big office.", "Я работаю в большом офисе.", "work", 311),
  W("colleague", "ˈkɒliːɡ", "ˈkɑːliːɡ", "noun", "коллега", "My colleague is very kind.", "Мой коллега очень добрый.", "work", 312),
  W("interview", "ˈɪntəvjuː", "ˈɪntərvjuː", "noun", "собеседование", "I have a job interview tomorrow.", "Завтра у меня собеседование.", "work", 313),
  W("company", "ˈkʌmpəni", "ˈkʌmpəni", "noun", "компания, фирма", "He works for a big company.", "Он работает в большой компании.", "work", 314),
  W("customer", "ˈkʌstəmə", "ˈkʌstəmər", "noun", "клиент, покупатель", "The customer is always right.", "Клиент всегда прав.", "work", 315),

  // ---------- Еда ----------
  W("breakfast", "ˈbrekfəst", "ˈbrekfəst", "noun", "завтрак", "I have breakfast at eight.", "Я завтракаю в восемь.", "food", 316),
  W("recipe", "ˈresəpi", "ˈresəpi", "noun", "рецепт", "This is my mother's recipe.", "Это мамин рецепт.", "food", 317),
  W("delicious", "dɪˈlɪʃəs", "dɪˈlɪʃəs", "adj.", "вкусный", "The soup is delicious.", "Суп очень вкусный.", "food", 318),
  W("vegetable", "ˈvedʒtəbl", "ˈvedʒtəbl", "noun", "овощ", "Eat more vegetables.", "Ешь больше овощей.", "food", 319),
  W("meat", "miːt", "miːt", "noun", "мясо", "I don't eat meat.", "Я не ем мясо.", "food", 320),
  W("taste", "teɪst", "teɪst", "verb", "пробовать (на вкус); вкус", "Taste this cake!", "Попробуй этот торт!", "food", 321),
  W("meal", "miːl", "miːl", "noun", "приём пищи, еда", "Dinner is my favourite meal.", "Ужин — мой любимый приём пищи.", "food", 322),

  // ---------- Одежда и покупки ----------
  W("clothes", "kləʊðz", "kloʊðz", "noun", "одежда", "I need new clothes.", "Мне нужна новая одежда.", "clothes", 323),
  W("shirt", "ʃɜːt", "ʃɜːrt", "noun", "рубашка", "He is wearing a white shirt.", "На нём белая рубашка.", "clothes", 324),
  W("dress", "dres", "dres", "noun", "платье", "She bought a red dress.", "Она купила красное платье.", "clothes", 325),
  W("jacket", "ˈdʒækɪt", "ˈdʒækɪt", "noun", "куртка, пиджак", "Take your jacket, it's cold.", "Возьми куртку, холодно.", "clothes", 326),
  W("size", "saɪz", "saɪz", "noun", "размер", "What size do you wear?", "Какой у вас размер?", "clothes", 327),
  W("expensive", "ɪkˈspensɪv", "ɪkˈspensɪv", "adj.", "дорогой", "This phone is too expensive.", "Этот телефон слишком дорогой.", "clothes", 328),
  W("cheap", "tʃiːp", "tʃiːp", "adj.", "дешёвый", "The tickets were cheap.", "Билеты были дешёвыми.", "clothes", 329),
  W("wear", "weə", "wer", "verb", "носить (одежду)", "I wear glasses.", "Я ношу очки.", "clothes", 330),

  // ---------- Здоровье ----------
  W("dentist", "ˈdentɪst", "ˈdentɪst", "noun", "стоматолог", "I go to the dentist twice a year.", "Я хожу к стоматологу дважды в год.", "health", 331),
  W("headache", "ˈhedeɪk", "ˈhedeɪk", "noun", "головная боль", "I have a bad headache.", "У меня сильная головная боль.", "health", 332),
  W("pain", "peɪn", "peɪn", "noun", "боль", "I feel a pain in my leg.", "Я чувствую боль в ноге.", "health", 333),
  W("healthy", "ˈhelθi", "ˈhelθi", "adj.", "здоровый; полезный", "She eats healthy food.", "Она ест здоровую пищу.", "health", 334),
  W("exercise", "ˈeksəsaɪz", "ˈeksərsaɪz", "noun", "упражнение; зарядка", "Do some exercise every day.", "Делай зарядку каждый день.", "health", 335),
  W("rest", "rest", "rest", "verb", "отдыхать; отдых", "You need to rest.", "Тебе нужно отдохнуть.", "health", 336),

  // ---------- Дом ----------
  W("furniture", "ˈfɜːnɪtʃə", "ˈfɜːrnɪtʃər", "noun", "мебель", "We bought new furniture.", "Мы купили новую мебель.", "house", 337),
  W("bedroom", "ˈbedruːm", "ˈbedruːm", "noun", "спальня", "My bedroom is small.", "Моя спальня маленькая.", "house", 338),
  W("bathroom", "ˈbɑːθruːm", "ˈbæθruːm", "noun", "ванная комната", "The bathroom is upstairs.", "Ванная наверху.", "house", 339),
  W("sofa", "ˈsəʊfə", "ˈsoʊfə", "noun", "диван", "The cat sleeps on the sofa.", "Кошка спит на диване.", "house", 340),
  W("wall", "wɔːl", "wɔːl", "noun", "стена", "There is a picture on the wall.", "На стене висит картина.", "house", 341),
  W("floor", "flɔː", "flɔːr", "noun", "пол; этаж", "The keys are on the floor.", "Ключи на полу.", "house", 342),

  // ---------- Технологии ----------
  W("computer", "kəmˈpjuːtə", "kəmˈpjuːtər", "noun", "компьютер", "I use a computer at work.", "Я пользуюсь компьютером на работе.", "technology", 343),
  W("internet", "ˈɪntənet", "ˈɪntərnet", "noun", "интернет", "Is there internet here?", "Здесь есть интернет?", "technology", 344),
  W("screen", "skriːn", "skriːn", "noun", "экран", "The screen is very bright.", "Экран очень яркий.", "technology", 345),
  W("message", "ˈmesɪdʒ", "ˈmesɪdʒ", "noun", "сообщение", "I got your message.", "Я получил твоё сообщение.", "technology", 346),
  W("email", "ˈiːmeɪl", "ˈiːmeɪl", "noun", "электронная почта", "Send me an email.", "Отправь мне письмо.", "technology", 347),
  W("password", "ˈpɑːswɜːd", "ˈpæswɜːrd", "noun", "пароль", "I forgot my password.", "Я забыл пароль.", "technology", 348),
  W("website", "ˈwebsaɪt", "ˈwebsaɪt", "noun", "сайт", "Visit our website.", "Зайдите на наш сайт.", "technology", 349),
  W("download", "ˌdaʊnˈləʊd", "ˌdaʊnˈloʊd", "verb", "скачивать", "Download the app here.", "Скачайте приложение здесь.", "technology", 350),

  // ---------- Досуг ----------
  W("hobby", "ˈhɒbi", "ˈhɑːbi", "noun", "хобби, увлечение", "My hobby is reading.", "Моё хобби — чтение.", "free time", 351),
  W("museum", "mjuˈziːəm", "mjuˈziːəm", "noun", "музей", "We visited an art museum.", "Мы посетили художественный музей.", "free time", 352),
  W("camera", "ˈkæmərə", "ˈkæmərə", "noun", "фотоаппарат, камера", "She has a new camera.", "У неё новый фотоаппарат.", "free time", 353),
  W("paint", "peɪnt", "peɪnt", "verb", "рисовать (красками)", "He likes to paint.", "Он любит рисовать.", "free time", 354),
  W("dance", "dɑːns", "dæns", "verb", "танцевать", "They dance very well.", "Они очень хорошо танцуют.", "free time", 355),

  // ---------- Характер ----------
  W("kind", "kaɪnd", "kaɪnd", "adj.", "добрый", "She is a kind person.", "Она добрый человек.", "personality", 356),
  W("friendly", "ˈfrendli", "ˈfrendli", "adj.", "дружелюбный", "Our neighbours are friendly.", "Наши соседи дружелюбные.", "personality", 357),
  W("polite", "pəˈlaɪt", "pəˈlaɪt", "adj.", "вежливый", "Be polite to everyone.", "Будь вежлив со всеми.", "personality", 358),
  W("shy", "ʃaɪ", "ʃaɪ", "adj.", "застенчивый", "He is too shy to speak.", "Он слишком застенчив, чтобы говорить.", "personality", 359),
  W("clever", "ˈklevə", "ˈklevər", "adj.", "умный, сообразительный", "What a clever idea!", "Какая умная идея!", "personality", 360),
  W("honest", "ˈɒnɪst", "ˈɑːnɪst", "adj.", "честный", "She is always honest.", "Она всегда честна.", "personality", 361),
  W("lazy", "ˈleɪzi", "ˈleɪzi", "adj.", "ленивый", "Don't be lazy!", "Не ленись!", "personality", 362),
  W("funny", "ˈfʌni", "ˈfʌni", "adj.", "смешной, забавный", "He tells funny jokes.", "Он рассказывает смешные шутки.", "personality", 363),

  // ---------- Природа ----------
  W("mountain", "ˈmaʊntən", "ˈmaʊntn", "noun", "гора", "We climbed a high mountain.", "Мы поднялись на высокую гору.", "nature", 364),
  W("river", "ˈrɪvə", "ˈrɪvər", "noun", "река", "The river is very long.", "Река очень длинная.", "nature", 365),
  W("forest", "ˈfɒrɪst", "ˈfɔːrɪst", "noun", "лес", "There are wolves in the forest.", "В лесу есть волки.", "nature", 366),
  W("beach", "biːtʃ", "biːtʃ", "noun", "пляж", "Let's go to the beach.", "Пойдём на пляж.", "nature", 367),
  W("sea", "siː", "siː", "noun", "море", "The sea is warm today.", "Море сегодня тёплое.", "nature", 368),
  W("sky", "skaɪ", "skaɪ", "noun", "небо", "The sky is blue.", "Небо голубое.", "nature", 369),
  W("flower", "ˈflaʊə", "ˈflaʊər", "noun", "цветок", "She gave me flowers.", "Она подарила мне цветы.", "nature", 370),

  // ---------- Учёба ----------
  W("homework", "ˈhəʊmwɜːk", "ˈhoʊmwɜːrk", "noun", "домашнее задание", "Do your homework.", "Сделай домашнее задание.", "education", 371),
  W("exam", "ɪɡˈzæm", "ɪɡˈzæm", "noun", "экзамен", "I have an exam on Friday.", "У меня экзамен в пятницу.", "education", 372),
  W("university", "ˌjuːnɪˈvɜːsəti", "ˌjuːnɪˈvɜːrsəti", "noun", "университет", "She studies at university.", "Она учится в университете.", "education", 373),
  W("subject", "ˈsʌbdʒɪkt", "ˈsʌbdʒɪkt", "noun", "школьный предмет", "Maths is my favourite subject.", "Математика — мой любимый предмет.", "education", 374),
  W("dictionary", "ˈdɪkʃənri", "ˈdɪkʃəneri", "noun", "словарь", "Use a dictionary.", "Пользуйся словарём.", "education", 375),
  W("mistake", "mɪˈsteɪk", "mɪˈsteɪk", "noun", "ошибка", "Everyone makes mistakes.", "Все совершают ошибки.", "education", 376),

  // ---------- Глаголы ----------
  W("arrive", "əˈraɪv", "əˈraɪv", "verb", "прибывать, приезжать", "We arrive at six.", "Мы приезжаем в шесть.", "verbs", 377),
  W("leave", "liːv", "liːv", "verb", "уходить, уезжать; оставлять", "I leave home at eight.", "Я выхожу из дома в восемь.", "verbs", 378),
  W("return", "rɪˈtɜːn", "rɪˈtɜːrn", "verb", "возвращаться", "They return next week.", "Они вернутся на следующей неделе.", "verbs", 379),
  W("choose", "tʃuːz", "tʃuːz", "verb", "выбирать", "Choose one, please.", "Выберите один, пожалуйста.", "verbs", 380),
  W("decide", "dɪˈsaɪd", "dɪˈsaɪd", "verb", "решать", "I can't decide.", "Я не могу решить.", "verbs", 381),
  W("remember", "rɪˈmembə", "rɪˈmembər", "verb", "помнить, вспоминать", "I don't remember his name.", "Я не помню его имени.", "verbs", 382),
  W("forget", "fəˈɡet", "fərˈɡet", "verb", "забывать", "Don't forget your keys.", "Не забудь ключи.", "verbs", 383),
  W("understand", "ˌʌndəˈstænd", "ˌʌndərˈstænd", "verb", "понимать", "I understand you.", "Я тебя понимаю.", "verbs", 384),
  W("explain", "ɪkˈspleɪn", "ɪkˈspleɪn", "verb", "объяснять", "Can you explain this?", "Можешь объяснить это?", "verbs", 385),
  W("improve", "ɪmˈpruːv", "ɪmˈpruːv", "verb", "улучшать(ся)", "I want to improve my English.", "Я хочу улучшить свой английский.", "verbs", 386),
  W("prepare", "prɪˈpeə", "prɪˈper", "verb", "готовить(ся)", "I prepare dinner every day.", "Я готовлю ужин каждый день.", "verbs", 387),
  W("describe", "dɪˈskraɪb", "dɪˈskraɪb", "verb", "описывать", "Describe your house.", "Опиши свой дом.", "verbs", 388),

  // ---------- Прилагательные и наречия ----------
  W("important", "ɪmˈpɔːtnt", "ɪmˈpɔːrtnt", "adj.", "важный", "This is an important question.", "Это важный вопрос.", "adjectives", 389),
  W("difficult", "ˈdɪfɪkəlt", "ˈdɪfɪkəlt", "adj.", "трудный, сложный", "The test was difficult.", "Тест был трудным.", "adjectives", 390),
  W("easy", "ˈiːzi", "ˈiːzi", "adj.", "лёгкий, простой", "This exercise is easy.", "Это упражнение простое.", "adjectives", 391),
  W("dangerous", "ˈdeɪndʒərəs", "ˈdeɪndʒərəs", "adj.", "опасный", "It's dangerous to drive fast.", "Опасно быстро ездить.", "adjectives", 392),
  W("modern", "ˈmɒdn", "ˈmɑːdərn", "adj.", "современный", "They live in a modern house.", "Они живут в современном доме.", "adjectives", 393),
  W("popular", "ˈpɒpjələ", "ˈpɑːpjələr", "adj.", "популярный", "This song is very popular.", "Эта песня очень популярна.", "adjectives", 394),
  W("different", "ˈdɪfrənt", "ˈdɪfrənt", "adj.", "другой, разный", "We have different opinions.", "У нас разные мнения.", "adjectives", 395),
  W("ready", "ˈredi", "ˈredi", "adj.", "готовый", "Are you ready?", "Ты готов?", "adjectives", 396),
  W("already", "ɔːlˈredi", "ɔːlˈredi", "adv.", "уже", "I have already eaten.", "Я уже поел.", "adverbs", 397),
  W("still", "stɪl", "stɪl", "adv.", "всё ещё", "He is still sleeping.", "Он всё ещё спит.", "adverbs", 398),
  W("ago", "əˈɡəʊ", "əˈɡoʊ", "adv.", "(тому) назад", "I saw her two days ago.", "Я видел её два дня назад.", "adverbs", 399),
  W("together", "təˈɡeðə", "təˈɡeðər", "adv.", "вместе", "Let's work together.", "Давай работать вместе.", "adverbs", 400),
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
  const total = await prisma.vocabItem.count({ where: { levelCode: "A2" } });
  console.log(`✅ Словарь A2: добавлено ${created}, всего слов A2 — ${total}.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed словаря A2:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
