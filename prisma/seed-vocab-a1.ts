import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Расширенный словарь A1 (batch 1). Дополняет стартовые 30 слов.
// Дубли по (levelCode + headword) пропускаются, поэтому запускать можно повторно.
const words: Prisma.VocabItemUncheckedCreateInput[] = [
  // ---------- Общение и знакомство ----------
  { levelCode: "A1", headword: "hi", ipaUk: "haɪ", ipaUs: "haɪ", pos: "excl.", translationRu: "привет (неформ.)", exampleEn: "Hi, I'm Anna.", exampleRu: "Привет, я Анна.", topic: "greetings", frequencyRank: 31, register: "INFORMAL", kind: "WORD" },
  { levelCode: "A1", headword: "bye", ipaUk: "baɪ", ipaUs: "baɪ", pos: "excl.", translationRu: "пока (неформ.)", exampleEn: "Bye! See you later.", exampleRu: "Пока! Увидимся позже.", topic: "greetings", frequencyRank: 32, register: "INFORMAL", kind: "WORD" },
  { levelCode: "A1", headword: "good morning", ipaUk: "ˌɡʊd ˈmɔːnɪŋ", ipaUs: "ˌɡʊd ˈmɔːrnɪŋ", pos: "phrase", translationRu: "доброе утро", exampleEn: "Good morning, everyone!", exampleRu: "Доброе утро всем!", topic: "greetings", frequencyRank: 33, kind: "WORD" },
  { levelCode: "A1", headword: "sorry", ipaUk: "ˈsɒri", ipaUs: "ˈsɑːri", pos: "excl.", translationRu: "извините, простите", exampleEn: "Sorry, I'm late.", exampleRu: "Извините, я опоздал.", topic: "polite", frequencyRank: 34, kind: "WORD" },
  { levelCode: "A1", headword: "excuse me", ipaUk: "ɪkˈskjuːz miː", ipaUs: "ɪkˈskjuːz miː", pos: "phrase", translationRu: "извините (чтобы обратиться)", exampleEn: "Excuse me, where is the station?", exampleRu: "Извините, где вокзал?", topic: "polite", frequencyRank: 35, kind: "WORD" },
  { levelCode: "A1", headword: "welcome", ipaUk: "ˈwelkəm", ipaUs: "ˈwelkəm", pos: "excl.", translationRu: "добро пожаловать", exampleEn: "Welcome to our home!", exampleRu: "Добро пожаловать к нам домой!", topic: "greetings", frequencyRank: 36, kind: "WORD" },
  { levelCode: "A1", headword: "how", ipaUk: "haʊ", ipaUs: "haʊ", pos: "adv.", translationRu: "как", exampleEn: "How are you?", exampleRu: "Как дела?", topic: "questions", frequencyRank: 37, kind: "WORD" },
  { levelCode: "A1", headword: "what", ipaUk: "wɒt", ipaUs: "wʌt", pos: "pron.", translationRu: "что", exampleEn: "What is your name?", exampleRu: "Как тебя зовут?", topic: "questions", frequencyRank: 38, kind: "WORD" },
  { levelCode: "A1", headword: "where", ipaUk: "weə", ipaUs: "wer", pos: "adv.", translationRu: "где, куда", exampleEn: "Where do you live?", exampleRu: "Где ты живёшь?", topic: "questions", frequencyRank: 39, kind: "WORD" },
  { levelCode: "A1", headword: "when", ipaUk: "wen", ipaUs: "wen", pos: "adv.", translationRu: "когда", exampleEn: "When is the meeting?", exampleRu: "Когда встреча?", topic: "questions", frequencyRank: 40, kind: "WORD" },
  { levelCode: "A1", headword: "who", ipaUk: "huː", ipaUs: "huː", pos: "pron.", translationRu: "кто", exampleEn: "Who is that man?", exampleRu: "Кто этот мужчина?", topic: "questions", frequencyRank: 41, kind: "WORD" },
  { levelCode: "A1", headword: "why", ipaUk: "waɪ", ipaUs: "waɪ", pos: "adv.", translationRu: "почему", exampleEn: "Why are you happy?", exampleRu: "Почему ты счастлив?", topic: "questions", frequencyRank: 42, kind: "WORD" },
  { levelCode: "A1", headword: "maybe", ipaUk: "ˈmeɪbi", ipaUs: "ˈmeɪbi", pos: "adv.", translationRu: "может быть", exampleEn: "Maybe tomorrow.", exampleRu: "Может быть, завтра.", topic: "basics", frequencyRank: 43, kind: "WORD" },
  { levelCode: "A1", headword: "okay", ipaUk: "ˌəʊˈkeɪ", ipaUs: "ˌoʊˈkeɪ", pos: "excl.", translationRu: "хорошо, ладно", exampleEn: "Okay, let's go.", exampleRu: "Хорошо, пойдём.", topic: "basics", frequencyRank: 44, register: "INFORMAL", kind: "WORD" },
  { levelCode: "A1", headword: "of course", ipaUk: "əv ˈkɔːs", ipaUs: "əv ˈkɔːrs", pos: "phrase", translationRu: "конечно", exampleEn: "Of course, I can help.", exampleRu: "Конечно, я могу помочь.", topic: "polite", frequencyRank: 45, kind: "WORD" },

  // ---------- Люди ----------
  { levelCode: "A1", headword: "man", ipaUk: "mæn", ipaUs: "mæn", pos: "noun", translationRu: "мужчина", exampleEn: "The man is tall.", exampleRu: "Мужчина высокий.", topic: "people", frequencyRank: 46, kind: "WORD" },
  { levelCode: "A1", headword: "woman", ipaUk: "ˈwʊmən", ipaUs: "ˈwʊmən", pos: "noun", translationRu: "женщина", exampleEn: "The woman is a doctor.", exampleRu: "Женщина — врач.", topic: "people", frequencyRank: 47, kind: "WORD" },
  { levelCode: "A1", headword: "boy", ipaUk: "bɔɪ", ipaUs: "bɔɪ", pos: "noun", translationRu: "мальчик", exampleEn: "The boy is playing.", exampleRu: "Мальчик играет.", topic: "people", frequencyRank: 48, kind: "WORD" },
  { levelCode: "A1", headword: "girl", ipaUk: "ɡɜːl", ipaUs: "ɡɜːrl", pos: "noun", translationRu: "девочка", exampleEn: "The girl is reading.", exampleRu: "Девочка читает.", topic: "people", frequencyRank: 49, kind: "WORD" },
  { levelCode: "A1", headword: "child", ipaUk: "tʃaɪld", ipaUs: "tʃaɪld", pos: "noun", translationRu: "ребёнок", exampleEn: "The child is sleeping.", exampleRu: "Ребёнок спит.", topic: "people", frequencyRank: 50, kind: "WORD" },
  { levelCode: "A1", headword: "people", ipaUk: "ˈpiːpl", ipaUs: "ˈpiːpl", pos: "noun", translationRu: "люди", exampleEn: "Many people are here.", exampleRu: "Здесь много людей.", topic: "people", frequencyRank: 51, kind: "WORD" },
  { levelCode: "A1", headword: "person", ipaUk: "ˈpɜːsn", ipaUs: "ˈpɜːrsn", pos: "noun", translationRu: "человек", exampleEn: "She is a kind person.", exampleRu: "Она добрый человек.", topic: "people", frequencyRank: 52, kind: "WORD" },
  { levelCode: "A1", headword: "teacher", ipaUk: "ˈtiːtʃə", ipaUs: "ˈtiːtʃər", pos: "noun", translationRu: "учитель", exampleEn: "My teacher is nice.", exampleRu: "Мой учитель хороший.", topic: "people", frequencyRank: 53, kind: "WORD" },
  { levelCode: "A1", headword: "student", ipaUk: "ˈstjuːdnt", ipaUs: "ˈstuːdnt", pos: "noun", translationRu: "студент, ученик", exampleEn: "He is a good student.", exampleRu: "Он хороший студент.", topic: "people", frequencyRank: 54, kind: "WORD" },
  { levelCode: "A1", headword: "doctor", ipaUk: "ˈdɒktə", ipaUs: "ˈdɑːktər", pos: "noun", translationRu: "врач, доктор", exampleEn: "I need a doctor.", exampleRu: "Мне нужен врач.", topic: "people", frequencyRank: 55, kind: "WORD" },

  // ---------- Семья ----------
  { levelCode: "A1", headword: "sister", ipaUk: "ˈsɪstə", ipaUs: "ˈsɪstər", pos: "noun", translationRu: "сестра", exampleEn: "My sister is a nurse.", exampleRu: "Моя сестра — медсестра.", topic: "family", frequencyRank: 56, kind: "WORD" },
  { levelCode: "A1", headword: "brother", ipaUk: "ˈbrʌðə", ipaUs: "ˈbrʌðər", pos: "noun", translationRu: "брат", exampleEn: "I have one brother.", exampleRu: "У меня один брат.", topic: "family", frequencyRank: 57, kind: "WORD" },
  { levelCode: "A1", headword: "parents", ipaUk: "ˈpeərənts", ipaUs: "ˈperənts", pos: "noun", translationRu: "родители", exampleEn: "My parents live here.", exampleRu: "Мои родители живут здесь.", topic: "family", frequencyRank: 58, kind: "WORD" },
  { levelCode: "A1", headword: "son", ipaUk: "sʌn", ipaUs: "sʌn", pos: "noun", translationRu: "сын", exampleEn: "Their son is five.", exampleRu: "Их сыну пять лет.", topic: "family", frequencyRank: 59, kind: "WORD" },
  { levelCode: "A1", headword: "daughter", ipaUk: "ˈdɔːtə", ipaUs: "ˈdɔːtər", pos: "noun", translationRu: "дочь", exampleEn: "My daughter loves music.", exampleRu: "Моя дочь любит музыку.", topic: "family", frequencyRank: 60, kind: "WORD" },
  { levelCode: "A1", headword: "husband", ipaUk: "ˈhʌzbənd", ipaUs: "ˈhʌzbənd", pos: "noun", translationRu: "муж", exampleEn: "Her husband is a cook.", exampleRu: "Её муж — повар.", topic: "family", frequencyRank: 61, kind: "WORD" },
  { levelCode: "A1", headword: "wife", ipaUk: "waɪf", ipaUs: "waɪf", pos: "noun", translationRu: "жена", exampleEn: "His wife is a teacher.", exampleRu: "Его жена — учительница.", topic: "family", frequencyRank: 62, kind: "WORD" },
  { levelCode: "A1", headword: "baby", ipaUk: "ˈbeɪbi", ipaUs: "ˈbeɪbi", pos: "noun", translationRu: "малыш, младенец", exampleEn: "The baby is sleeping.", exampleRu: "Малыш спит.", topic: "family", frequencyRank: 63, kind: "WORD" },

  // ---------- Дом и повседневность ----------
  { levelCode: "A1", headword: "home", ipaUk: "həʊm", ipaUs: "hoʊm", pos: "noun", translationRu: "дом (родной)", exampleEn: "I am at home.", exampleRu: "Я дома.", topic: "home", frequencyRank: 64, kind: "WORD" },
  { levelCode: "A1", headword: "room", ipaUk: "ruːm", ipaUs: "ruːm", pos: "noun", translationRu: "комната", exampleEn: "This is my room.", exampleRu: "Это моя комната.", topic: "home", frequencyRank: 65, kind: "WORD" },
  { levelCode: "A1", headword: "kitchen", ipaUk: "ˈkɪtʃɪn", ipaUs: "ˈkɪtʃɪn", pos: "noun", translationRu: "кухня", exampleEn: "She is in the kitchen.", exampleRu: "Она на кухне.", topic: "home", frequencyRank: 66, kind: "WORD" },
  { levelCode: "A1", headword: "table", ipaUk: "ˈteɪbl", ipaUs: "ˈteɪbl", pos: "noun", translationRu: "стол", exampleEn: "The keys are on the table.", exampleRu: "Ключи на столе.", topic: "home", frequencyRank: 67, kind: "WORD" },
  { levelCode: "A1", headword: "chair", ipaUk: "tʃeə", ipaUs: "tʃer", pos: "noun", translationRu: "стул", exampleEn: "Please sit on the chair.", exampleRu: "Пожалуйста, садитесь на стул.", topic: "home", frequencyRank: 68, kind: "WORD" },
  { levelCode: "A1", headword: "bed", ipaUk: "bed", ipaUs: "bed", pos: "noun", translationRu: "кровать", exampleEn: "The cat is on the bed.", exampleRu: "Кошка на кровати.", topic: "home", frequencyRank: 69, kind: "WORD" },
  { levelCode: "A1", headword: "door", ipaUk: "dɔː", ipaUs: "dɔːr", pos: "noun", translationRu: "дверь", exampleEn: "Please close the door.", exampleRu: "Пожалуйста, закройте дверь.", topic: "home", frequencyRank: 70, kind: "WORD" },
  { levelCode: "A1", headword: "window", ipaUk: "ˈwɪndəʊ", ipaUs: "ˈwɪndoʊ", pos: "noun", translationRu: "окно", exampleEn: "Open the window, please.", exampleRu: "Откройте окно, пожалуйста.", topic: "home", frequencyRank: 71, kind: "WORD" },
  { levelCode: "A1", headword: "phone", ipaUk: "fəʊn", ipaUs: "foʊn", pos: "noun", translationRu: "телефон", exampleEn: "Where is my phone?", exampleRu: "Где мой телефон?", topic: "objects", frequencyRank: 72, kind: "WORD" },
  { levelCode: "A1", headword: "car", ipaUk: "kɑː", ipaUs: "kɑːr", pos: "noun", translationRu: "машина, автомобиль", exampleEn: "This is my car.", exampleRu: "Это моя машина.", topic: "objects", frequencyRank: 73, kind: "WORD" },
  { levelCode: "A1", headword: "key", ipaUk: "kiː", ipaUs: "kiː", pos: "noun", translationRu: "ключ", exampleEn: "I have the key.", exampleRu: "У меня есть ключ.", topic: "objects", frequencyRank: 74, kind: "WORD" },
  { levelCode: "A1", headword: "money", ipaUk: "ˈmʌni", ipaUs: "ˈmʌni", pos: "noun", translationRu: "деньги", exampleEn: "I have no money.", exampleRu: "У меня нет денег.", topic: "objects", frequencyRank: 75, kind: "WORD" },
  { levelCode: "A1", headword: "bag", ipaUk: "bæɡ", ipaUs: "bæɡ", pos: "noun", translationRu: "сумка", exampleEn: "Her bag is black.", exampleRu: "Её сумка чёрная.", topic: "objects", frequencyRank: 76, kind: "WORD" },
  { levelCode: "A1", headword: "clothes", ipaUk: "kləʊðz", ipaUs: "kloʊðz", pos: "noun", translationRu: "одежда", exampleEn: "I need new clothes.", exampleRu: "Мне нужна новая одежда.", topic: "objects", frequencyRank: 77, kind: "WORD" },

  // ---------- Еда, кафе, покупки ----------
  { levelCode: "A1", headword: "bread", ipaUk: "bred", ipaUs: "bred", pos: "noun", translationRu: "хлеб", exampleEn: "I buy bread every day.", exampleRu: "Я покупаю хлеб каждый день.", topic: "food", frequencyRank: 78, kind: "WORD" },
  { levelCode: "A1", headword: "milk", ipaUk: "mɪlk", ipaUs: "mɪlk", pos: "noun", translationRu: "молоко", exampleEn: "Do you want milk?", exampleRu: "Хочешь молока?", topic: "food", frequencyRank: 79, kind: "WORD" },
  { levelCode: "A1", headword: "tea", ipaUk: "tiː", ipaUs: "tiː", pos: "noun", translationRu: "чай", exampleEn: "A cup of tea, please.", exampleRu: "Чашку чая, пожалуйста.", topic: "food", frequencyRank: 80, kind: "WORD" },
  { levelCode: "A1", headword: "coffee", ipaUk: "ˈkɒfi", ipaUs: "ˈkɔːfi", pos: "noun", translationRu: "кофе", exampleEn: "I like black coffee.", exampleRu: "Я люблю чёрный кофе.", topic: "food", frequencyRank: 81, kind: "WORD" },
  { levelCode: "A1", headword: "apple", ipaUk: "ˈæpl", ipaUs: "ˈæpl", pos: "noun", translationRu: "яблоко", exampleEn: "She is eating an apple.", exampleRu: "Она ест яблоко.", topic: "food", frequencyRank: 82, kind: "WORD" },
  { levelCode: "A1", headword: "egg", ipaUk: "eɡ", ipaUs: "eɡ", pos: "noun", translationRu: "яйцо", exampleEn: "I want two eggs.", exampleRu: "Я хочу два яйца.", topic: "food", frequencyRank: 83, kind: "WORD" },
  { levelCode: "A1", headword: "meat", ipaUk: "miːt", ipaUs: "miːt", pos: "noun", translationRu: "мясо", exampleEn: "I don't eat meat.", exampleRu: "Я не ем мясо.", topic: "food", frequencyRank: 84, kind: "WORD" },
  { levelCode: "A1", headword: "fish", ipaUk: "fɪʃ", ipaUs: "fɪʃ", pos: "noun", translationRu: "рыба", exampleEn: "The fish is fresh.", exampleRu: "Рыба свежая.", topic: "food", frequencyRank: 85, kind: "WORD" },
  { levelCode: "A1", headword: "sugar", ipaUk: "ˈʃʊɡə", ipaUs: "ˈʃʊɡər", pos: "noun", translationRu: "сахар", exampleEn: "No sugar, please.", exampleRu: "Без сахара, пожалуйста.", topic: "food", frequencyRank: 86, kind: "WORD" },
  { levelCode: "A1", headword: "breakfast", ipaUk: "ˈbrekfəst", ipaUs: "ˈbrekfəst", pos: "noun", translationRu: "завтрак", exampleEn: "Breakfast is ready.", exampleRu: "Завтрак готов.", topic: "food", frequencyRank: 87, kind: "WORD" },
  { levelCode: "A1", headword: "lunch", ipaUk: "lʌntʃ", ipaUs: "lʌntʃ", pos: "noun", translationRu: "обед", exampleEn: "Let's have lunch.", exampleRu: "Давай пообедаем.", topic: "food", frequencyRank: 88, kind: "WORD" },
  { levelCode: "A1", headword: "dinner", ipaUk: "ˈdɪnə", ipaUs: "ˈdɪnər", pos: "noun", translationRu: "ужин", exampleEn: "Dinner is at seven.", exampleRu: "Ужин в семь.", topic: "food", frequencyRank: 89, kind: "WORD" },
  { levelCode: "A1", headword: "menu", ipaUk: "ˈmenjuː", ipaUs: "ˈmenjuː", pos: "noun", translationRu: "меню", exampleEn: "Can I see the menu?", exampleRu: "Можно посмотреть меню?", topic: "food", frequencyRank: 90, kind: "WORD" },
  { levelCode: "A1", headword: "bill", ipaUk: "bɪl", ipaUs: "bɪl", pos: "noun", translationRu: "счёт (в кафе)", exampleEn: "The bill, please.", exampleRu: "Счёт, пожалуйста.", topic: "shopping", frequencyRank: 91, kind: "WORD" },
  { levelCode: "A1", headword: "shop", ipaUk: "ʃɒp", ipaUs: "ʃɑːp", pos: "noun", translationRu: "магазин", exampleEn: "The shop is open.", exampleRu: "Магазин открыт.", topic: "shopping", frequencyRank: 92, kind: "WORD" },
  { levelCode: "A1", headword: "buy", ipaUk: "baɪ", ipaUs: "baɪ", pos: "verb", translationRu: "покупать", exampleEn: "I want to buy a ticket.", exampleRu: "Я хочу купить билет.", topic: "shopping", frequencyRank: 93, kind: "WORD" },
  { levelCode: "A1", headword: "cheap", ipaUk: "tʃiːp", ipaUs: "tʃiːp", pos: "adj.", translationRu: "дешёвый", exampleEn: "This shop is cheap.", exampleRu: "Этот магазин дешёвый.", topic: "shopping", frequencyRank: 94, kind: "WORD" },
  { levelCode: "A1", headword: "expensive", ipaUk: "ɪkˈspensɪv", ipaUs: "ɪkˈspensɪv", pos: "adj.", translationRu: "дорогой", exampleEn: "This car is expensive.", exampleRu: "Эта машина дорогая.", topic: "shopping", frequencyRank: 95, kind: "WORD" },

  // ---------- Город и путешествия ----------
  { levelCode: "A1", headword: "city", ipaUk: "ˈsɪti", ipaUs: "ˈsɪti", pos: "noun", translationRu: "город", exampleEn: "London is a big city.", exampleRu: "Лондон — большой город.", topic: "travel", frequencyRank: 96, kind: "WORD" },
  { levelCode: "A1", headword: "street", ipaUk: "striːt", ipaUs: "striːt", pos: "noun", translationRu: "улица", exampleEn: "The shop is on this street.", exampleRu: "Магазин на этой улице.", topic: "travel", frequencyRank: 97, kind: "WORD" },
  { levelCode: "A1", headword: "station", ipaUk: "ˈsteɪʃn", ipaUs: "ˈsteɪʃn", pos: "noun", translationRu: "станция, вокзал", exampleEn: "The station is near.", exampleRu: "Вокзал рядом.", topic: "travel", frequencyRank: 98, kind: "WORD" },
  { levelCode: "A1", headword: "airport", ipaUk: "ˈeəpɔːt", ipaUs: "ˈerpɔːrt", pos: "noun", translationRu: "аэропорт", exampleEn: "We are at the airport.", exampleRu: "Мы в аэропорту.", topic: "travel", frequencyRank: 99, kind: "WORD" },
  { levelCode: "A1", headword: "hotel", ipaUk: "həʊˈtel", ipaUs: "hoʊˈtel", pos: "noun", translationRu: "отель, гостиница", exampleEn: "Our hotel is nice.", exampleRu: "Наш отель хороший.", topic: "travel", frequencyRank: 100, kind: "WORD" },
  { levelCode: "A1", headword: "ticket", ipaUk: "ˈtɪkɪt", ipaUs: "ˈtɪkɪt", pos: "noun", translationRu: "билет", exampleEn: "Two tickets, please.", exampleRu: "Два билета, пожалуйста.", topic: "travel", frequencyRank: 101, kind: "WORD" },
  { levelCode: "A1", headword: "bus", ipaUk: "bʌs", ipaUs: "bʌs", pos: "noun", translationRu: "автобус", exampleEn: "The bus is late.", exampleRu: "Автобус опаздывает.", topic: "travel", frequencyRank: 102, kind: "WORD" },
  { levelCode: "A1", headword: "train", ipaUk: "treɪn", ipaUs: "treɪn", pos: "noun", translationRu: "поезд", exampleEn: "The train is fast.", exampleRu: "Поезд быстрый.", topic: "travel", frequencyRank: 103, kind: "WORD" },
  { levelCode: "A1", headword: "plane", ipaUk: "pleɪn", ipaUs: "pleɪn", pos: "noun", translationRu: "самолёт", exampleEn: "The plane is ready.", exampleRu: "Самолёт готов.", topic: "travel", frequencyRank: 104, kind: "WORD" },
  { levelCode: "A1", headword: "taxi", ipaUk: "ˈtæksi", ipaUs: "ˈtæksi", pos: "noun", translationRu: "такси", exampleEn: "Let's take a taxi.", exampleRu: "Давай возьмём такси.", topic: "travel", frequencyRank: 105, kind: "WORD" },
  { levelCode: "A1", headword: "map", ipaUk: "mæp", ipaUs: "mæp", pos: "noun", translationRu: "карта", exampleEn: "I need a map.", exampleRu: "Мне нужна карта.", topic: "travel", frequencyRank: 106, kind: "WORD" },
  { levelCode: "A1", headword: "left", ipaUk: "left", ipaUs: "left", pos: "adv.", translationRu: "налево, левый", exampleEn: "Turn left here.", exampleRu: "Поверните налево здесь.", topic: "travel", frequencyRank: 107, kind: "WORD" },
  { levelCode: "A1", headword: "right", ipaUk: "raɪt", ipaUs: "raɪt", pos: "adv.", translationRu: "направо, правый", exampleEn: "The shop is on the right.", exampleRu: "Магазин справа.", topic: "travel", frequencyRank: 108, kind: "WORD" },
  { levelCode: "A1", headword: "near", ipaUk: "nɪə", ipaUs: "nɪr", pos: "prep.", translationRu: "близко, рядом", exampleEn: "The hotel is near the station.", exampleRu: "Отель рядом с вокзалом.", topic: "travel", frequencyRank: 109, kind: "WORD" },

  // ---------- Работа и учёба ----------
  { levelCode: "A1", headword: "job", ipaUk: "dʒɒb", ipaUs: "dʒɑːb", pos: "noun", translationRu: "работа (место)", exampleEn: "I have a new job.", exampleRu: "У меня новая работа.", topic: "work", frequencyRank: 110, kind: "WORD" },
  { levelCode: "A1", headword: "work", ipaUk: "wɜːk", ipaUs: "wɜːrk", pos: "verb", translationRu: "работать; работа", exampleEn: "I work in an office.", exampleRu: "Я работаю в офисе.", topic: "work", frequencyRank: 111, kind: "WORD" },
  { levelCode: "A1", headword: "office", ipaUk: "ˈɒfɪs", ipaUs: "ˈɔːfɪs", pos: "noun", translationRu: "офис", exampleEn: "Our office is big.", exampleRu: "Наш офис большой.", topic: "work", frequencyRank: 112, kind: "WORD" },
  { levelCode: "A1", headword: "school", ipaUk: "skuːl", ipaUs: "skuːl", pos: "noun", translationRu: "школа", exampleEn: "The children go to school.", exampleRu: "Дети ходят в школу.", topic: "study", frequencyRank: 113, kind: "WORD" },
  { levelCode: "A1", headword: "university", ipaUk: "ˌjuːnɪˈvɜːsəti", ipaUs: "ˌjuːnɪˈvɜːrsəti", pos: "noun", translationRu: "университет", exampleEn: "She studies at university.", exampleRu: "Она учится в университете.", topic: "study", frequencyRank: 114, kind: "WORD" },
  { levelCode: "A1", headword: "lesson", ipaUk: "ˈlesn", ipaUs: "ˈlesn", pos: "noun", translationRu: "урок", exampleEn: "The lesson is easy.", exampleRu: "Урок лёгкий.", topic: "study", frequencyRank: 115, kind: "WORD" },
  { levelCode: "A1", headword: "computer", ipaUk: "kəmˈpjuːtə", ipaUs: "kəmˈpjuːtər", pos: "noun", translationRu: "компьютер", exampleEn: "I work on a computer.", exampleRu: "Я работаю за компьютером.", topic: "work", frequencyRank: 116, kind: "WORD" },
  { levelCode: "A1", headword: "email", ipaUk: "ˈiːmeɪl", ipaUs: "ˈiːmeɪl", pos: "noun", translationRu: "электронная почта, письмо", exampleEn: "I read your email.", exampleRu: "Я прочитал твоё письмо.", topic: "work", frequencyRank: 117, kind: "WORD" },
  { levelCode: "A1", headword: "meeting", ipaUk: "ˈmiːtɪŋ", ipaUs: "ˈmiːtɪŋ", pos: "noun", translationRu: "встреча, совещание", exampleEn: "The meeting is at ten.", exampleRu: "Встреча в десять.", topic: "work", frequencyRank: 118, kind: "WORD" },

  // ---------- Время и числа ----------
  { levelCode: "A1", headword: "four", ipaUk: "fɔː", ipaUs: "fɔːr", pos: "num.", translationRu: "четыре", exampleEn: "I have four books.", exampleRu: "У меня четыре книги.", topic: "numbers", frequencyRank: 119, kind: "WORD" },
  { levelCode: "A1", headword: "five", ipaUk: "faɪv", ipaUs: "faɪv", pos: "num.", translationRu: "пять", exampleEn: "It is five o'clock.", exampleRu: "Сейчас пять часов.", topic: "numbers", frequencyRank: 120, kind: "WORD" },
  { levelCode: "A1", headword: "ten", ipaUk: "ten", ipaUs: "ten", pos: "num.", translationRu: "десять", exampleEn: "I have ten fingers.", exampleRu: "У меня десять пальцев.", topic: "numbers", frequencyRank: 121, kind: "WORD" },
  { levelCode: "A1", headword: "today", ipaUk: "təˈdeɪ", ipaUs: "təˈdeɪ", pos: "adv.", translationRu: "сегодня", exampleEn: "I am busy today.", exampleRu: "Сегодня я занят.", topic: "time", frequencyRank: 122, kind: "WORD" },
  { levelCode: "A1", headword: "tomorrow", ipaUk: "təˈmɒrəʊ", ipaUs: "təˈmɑːroʊ", pos: "adv.", translationRu: "завтра", exampleEn: "See you tomorrow.", exampleRu: "Увидимся завтра.", topic: "time", frequencyRank: 123, kind: "WORD" },
  { levelCode: "A1", headword: "yesterday", ipaUk: "ˈjestədeɪ", ipaUs: "ˈjestərdeɪ", pos: "adv.", translationRu: "вчера", exampleEn: "I was at home yesterday.", exampleRu: "Вчера я был дома.", topic: "time", frequencyRank: 124, kind: "WORD" },
  { levelCode: "A1", headword: "week", ipaUk: "wiːk", ipaUs: "wiːk", pos: "noun", translationRu: "неделя", exampleEn: "See you next week.", exampleRu: "Увидимся на следующей неделе.", topic: "time", frequencyRank: 125, kind: "WORD" },
  { levelCode: "A1", headword: "month", ipaUk: "mʌnθ", ipaUs: "mʌnθ", pos: "noun", translationRu: "месяц", exampleEn: "This month is busy.", exampleRu: "Этот месяц напряжённый.", topic: "time", frequencyRank: 126, kind: "WORD" },
  { levelCode: "A1", headword: "year", ipaUk: "jɪə", ipaUs: "jɪr", pos: "noun", translationRu: "год", exampleEn: "Happy New Year!", exampleRu: "С Новым годом!", topic: "time", frequencyRank: 127, kind: "WORD" },
  { levelCode: "A1", headword: "time", ipaUk: "taɪm", ipaUs: "taɪm", pos: "noun", translationRu: "время", exampleEn: "What time is it?", exampleRu: "Который час?", topic: "time", frequencyRank: 128, kind: "WORD" },

  // ---------- Частые глаголы ----------
  { levelCode: "A1", headword: "do", ipaUk: "duː", ipaUs: "duː", pos: "verb", translationRu: "делать", exampleEn: "What do you do?", exampleRu: "Чем ты занимаешься?", topic: "verbs", frequencyRank: 129, kind: "WORD" },
  { levelCode: "A1", headword: "say", ipaUk: "seɪ", ipaUs: "seɪ", pos: "verb", translationRu: "говорить, сказать", exampleEn: "What did you say?", exampleRu: "Что ты сказал?", topic: "verbs", frequencyRank: 130, kind: "WORD" },
  { levelCode: "A1", headword: "see", ipaUk: "siː", ipaUs: "siː", pos: "verb", translationRu: "видеть", exampleEn: "I can see the sea.", exampleRu: "Я вижу море.", topic: "verbs", frequencyRank: 131, kind: "WORD" },
  { levelCode: "A1", headword: "know", ipaUk: "nəʊ", ipaUs: "noʊ", pos: "verb", translationRu: "знать", exampleEn: "I don't know.", exampleRu: "Я не знаю.", topic: "verbs", frequencyRank: 132, kind: "WORD" },
  { levelCode: "A1", headword: "want", ipaUk: "wɒnt", ipaUs: "wɑːnt", pos: "verb", translationRu: "хотеть", exampleEn: "I want some tea.", exampleRu: "Я хочу чая.", topic: "verbs", frequencyRank: 133, kind: "WORD" },
  { levelCode: "A1", headword: "need", ipaUk: "niːd", ipaUs: "niːd", pos: "verb", translationRu: "нуждаться", exampleEn: "I need help.", exampleRu: "Мне нужна помощь.", topic: "verbs", frequencyRank: 134, kind: "WORD" },
  { levelCode: "A1", headword: "come", ipaUk: "kʌm", ipaUs: "kʌm", pos: "verb", translationRu: "приходить", exampleEn: "Come here, please.", exampleRu: "Иди сюда, пожалуйста.", topic: "verbs", frequencyRank: 135, kind: "WORD" },
  { levelCode: "A1", headword: "live", ipaUk: "lɪv", ipaUs: "lɪv", pos: "verb", translationRu: "жить", exampleEn: "I live in Moscow.", exampleRu: "Я живу в Москве.", topic: "verbs", frequencyRank: 136, kind: "WORD" },
  { levelCode: "A1", headword: "speak", ipaUk: "spiːk", ipaUs: "spiːk", pos: "verb", translationRu: "говорить (на языке)", exampleEn: "Do you speak English?", exampleRu: "Ты говоришь по-английски?", topic: "verbs", frequencyRank: 137, kind: "WORD" },
  { levelCode: "A1", headword: "read", ipaUk: "riːd", ipaUs: "riːd", pos: "verb", translationRu: "читать", exampleEn: "I read every day.", exampleRu: "Я читаю каждый день.", topic: "verbs", frequencyRank: 138, kind: "WORD" },
  { levelCode: "A1", headword: "write", ipaUk: "raɪt", ipaUs: "raɪt", pos: "verb", translationRu: "писать", exampleEn: "Write your name here.", exampleRu: "Напишите здесь своё имя.", topic: "verbs", frequencyRank: 139, kind: "WORD" },
  { levelCode: "A1", headword: "listen", ipaUk: "ˈlɪsn", ipaUs: "ˈlɪsn", pos: "verb", translationRu: "слушать", exampleEn: "Listen to me, please.", exampleRu: "Послушай меня, пожалуйста.", topic: "verbs", frequencyRank: 140, kind: "WORD" },
  { levelCode: "A1", headword: "help", ipaUk: "help", ipaUs: "help", pos: "verb", translationRu: "помогать", exampleEn: "Can you help me?", exampleRu: "Ты можешь мне помочь?", topic: "verbs", frequencyRank: 141, kind: "WORD" },
  { levelCode: "A1", headword: "understand", ipaUk: "ˌʌndəˈstænd", ipaUs: "ˌʌndərˈstænd", pos: "verb", translationRu: "понимать", exampleEn: "I understand you.", exampleRu: "Я тебя понимаю.", topic: "verbs", frequencyRank: 142, kind: "WORD" },
  { levelCode: "A1", headword: "learn", ipaUk: "lɜːn", ipaUs: "lɜːrn", pos: "verb", translationRu: "учить, изучать", exampleEn: "I learn English.", exampleRu: "Я учу английский.", topic: "verbs", frequencyRank: 143, kind: "WORD" },
  { levelCode: "A1", headword: "make", ipaUk: "meɪk", ipaUs: "meɪk", pos: "verb", translationRu: "делать, создавать", exampleEn: "I make tea.", exampleRu: "Я делаю чай.", topic: "verbs", frequencyRank: 144, kind: "WORD" },
  { levelCode: "A1", headword: "take", ipaUk: "teɪk", ipaUs: "teɪk", pos: "verb", translationRu: "брать", exampleEn: "Take an umbrella.", exampleRu: "Возьми зонт.", topic: "verbs", frequencyRank: 145, kind: "WORD" },
  { levelCode: "A1", headword: "give", ipaUk: "ɡɪv", ipaUs: "ɡɪv", pos: "verb", translationRu: "давать", exampleEn: "Give me the book.", exampleRu: "Дай мне книгу.", topic: "verbs", frequencyRank: 146, kind: "WORD" },
  { levelCode: "A1", headword: "love", ipaUk: "lʌv", ipaUs: "lʌv", pos: "verb", translationRu: "любить", exampleEn: "I love my family.", exampleRu: "Я люблю свою семью.", topic: "verbs", frequencyRank: 147, kind: "WORD" },
  { levelCode: "A1", headword: "sleep", ipaUk: "sliːp", ipaUs: "sliːp", pos: "verb", translationRu: "спать", exampleEn: "I sleep eight hours.", exampleRu: "Я сплю восемь часов.", topic: "verbs", frequencyRank: 148, kind: "WORD" },
  { levelCode: "A1", headword: "walk", ipaUk: "wɔːk", ipaUs: "wɑːk", pos: "verb", translationRu: "идти пешком, гулять", exampleEn: "I walk to work.", exampleRu: "Я хожу на работу пешком.", topic: "verbs", frequencyRank: 149, kind: "WORD" },
  { levelCode: "A1", headword: "run", ipaUk: "rʌn", ipaUs: "rʌn", pos: "verb", translationRu: "бегать", exampleEn: "I run in the morning.", exampleRu: "Я бегаю по утрам.", topic: "verbs", frequencyRank: 150, kind: "WORD" },

  // ---------- Частые прилагательные ----------
  { levelCode: "A1", headword: "bad", ipaUk: "bæd", ipaUs: "bæd", pos: "adj.", translationRu: "плохой", exampleEn: "The weather is bad.", exampleRu: "Погода плохая.", topic: "adjectives", frequencyRank: 151, kind: "WORD" },
  { levelCode: "A1", headword: "new", ipaUk: "njuː", ipaUs: "nuː", pos: "adj.", translationRu: "новый", exampleEn: "I have a new phone.", exampleRu: "У меня новый телефон.", topic: "adjectives", frequencyRank: 152, kind: "WORD" },
  { levelCode: "A1", headword: "old", ipaUk: "əʊld", ipaUs: "oʊld", pos: "adj.", translationRu: "старый", exampleEn: "This house is old.", exampleRu: "Этот дом старый.", topic: "adjectives", frequencyRank: 153, kind: "WORD" },
  { levelCode: "A1", headword: "hot", ipaUk: "hɒt", ipaUs: "hɑːt", pos: "adj.", translationRu: "горячий, жаркий", exampleEn: "The tea is hot.", exampleRu: "Чай горячий.", topic: "adjectives", frequencyRank: 154, kind: "WORD" },
  { levelCode: "A1", headword: "cold", ipaUk: "kəʊld", ipaUs: "koʊld", pos: "adj.", translationRu: "холодный", exampleEn: "The water is cold.", exampleRu: "Вода холодная.", topic: "adjectives", frequencyRank: 155, kind: "WORD" },
  { levelCode: "A1", headword: "easy", ipaUk: "ˈiːzi", ipaUs: "ˈiːzi", pos: "adj.", translationRu: "лёгкий, простой", exampleEn: "English is easy for me.", exampleRu: "Английский для меня лёгкий.", topic: "adjectives", frequencyRank: 156, kind: "WORD" },
  { levelCode: "A1", headword: "difficult", ipaUk: "ˈdɪfɪkəlt", ipaUs: "ˈdɪfɪkəlt", pos: "adj.", translationRu: "трудный, сложный", exampleEn: "This word is difficult.", exampleRu: "Это слово трудное.", topic: "adjectives", frequencyRank: 157, kind: "WORD" },
  { levelCode: "A1", headword: "beautiful", ipaUk: "ˈbjuːtɪfl", ipaUs: "ˈbjuːtɪfl", pos: "adj.", translationRu: "красивый", exampleEn: "What a beautiful day!", exampleRu: "Какой красивый день!", topic: "adjectives", frequencyRank: 158, kind: "WORD" },
  { levelCode: "A1", headword: "fast", ipaUk: "fɑːst", ipaUs: "fæst", pos: "adj.", translationRu: "быстрый", exampleEn: "This car is very fast.", exampleRu: "Эта машина очень быстрая.", topic: "adjectives", frequencyRank: 159, kind: "WORD" },
  { levelCode: "A1", headword: "slow", ipaUk: "sləʊ", ipaUs: "sloʊ", pos: "adj.", translationRu: "медленный", exampleEn: "The bus is slow today.", exampleRu: "Автобус сегодня медленный.", topic: "adjectives", frequencyRank: 160, kind: "WORD" },
  { levelCode: "A1", headword: "tired", ipaUk: "ˈtaɪəd", ipaUs: "ˈtaɪərd", pos: "adj.", translationRu: "усталый", exampleEn: "I am very tired.", exampleRu: "Я очень устал.", topic: "adjectives", frequencyRank: 161, kind: "WORD" },
  { levelCode: "A1", headword: "hungry", ipaUk: "ˈhʌŋɡri", ipaUs: "ˈhʌŋɡri", pos: "adj.", translationRu: "голодный", exampleEn: "I am hungry.", exampleRu: "Я голоден.", topic: "adjectives", frequencyRank: 162, kind: "WORD" },
  { levelCode: "A1", headword: "nice", ipaUk: "naɪs", ipaUs: "naɪs", pos: "adj.", translationRu: "приятный, милый", exampleEn: "She is a nice person.", exampleRu: "Она приятный человек.", topic: "adjectives", frequencyRank: 163, kind: "WORD" },

  // ---------- Цвета ----------
  { levelCode: "A1", headword: "red", ipaUk: "red", ipaUs: "red", pos: "adj.", translationRu: "красный", exampleEn: "I have a red bag.", exampleRu: "У меня красная сумка.", topic: "colors", frequencyRank: 164, kind: "WORD" },
  { levelCode: "A1", headword: "blue", ipaUk: "bluː", ipaUs: "bluː", pos: "adj.", translationRu: "синий, голубой", exampleEn: "The sky is blue.", exampleRu: "Небо синее.", topic: "colors", frequencyRank: 165, kind: "WORD" },
  { levelCode: "A1", headword: "green", ipaUk: "ɡriːn", ipaUs: "ɡriːn", pos: "adj.", translationRu: "зелёный", exampleEn: "The grass is green.", exampleRu: "Трава зелёная.", topic: "colors", frequencyRank: 166, kind: "WORD" },
  { levelCode: "A1", headword: "black", ipaUk: "blæk", ipaUs: "blæk", pos: "adj.", translationRu: "чёрный", exampleEn: "He has a black car.", exampleRu: "У него чёрная машина.", topic: "colors", frequencyRank: 167, kind: "WORD" },
  { levelCode: "A1", headword: "white", ipaUk: "waɪt", ipaUs: "waɪt", pos: "adj.", translationRu: "белый", exampleEn: "I want a white shirt.", exampleRu: "Я хочу белую рубашку.", topic: "colors", frequencyRank: 168, kind: "WORD" },
  { levelCode: "A1", headword: "yellow", ipaUk: "ˈjeləʊ", ipaUs: "ˈjeloʊ", pos: "adj.", translationRu: "жёлтый", exampleEn: "The sun is yellow.", exampleRu: "Солнце жёлтое.", topic: "colors", frequencyRank: 169, kind: "WORD" },
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
    `✅ Словарь A1 (batch 1): добавлено ${created}, всего слов A1 в базе — ${total}.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed словаря A1:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
