import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Стартовый набор A1 (демо). Полный словарь по уровням — в Части 8.
const words: Prisma.VocabItemUncheckedCreateInput[] = [
  { levelCode: "A1", headword: "hello", ipaUk: "həˈləʊ", ipaUs: "həˈloʊ", pos: "excl.", translationRu: "привет, здравствуйте", exampleEn: "Hello! How are you?", exampleRu: "Привет! Как дела?", topic: "greetings", frequencyRank: 1, kind: "WORD" },
  { levelCode: "A1", headword: "goodbye", ipaUk: "ˌɡʊdˈbaɪ", ipaUs: "ˌɡʊdˈbaɪ", pos: "excl.", translationRu: "до свидания", exampleEn: "Goodbye, see you tomorrow.", exampleRu: "До свидания, увидимся завтра.", topic: "greetings", frequencyRank: 2, kind: "WORD" },
  { levelCode: "A1", headword: "please", ipaUk: "pliːz", ipaUs: "pliːz", pos: "adv.", translationRu: "пожалуйста (при просьбе)", exampleEn: "A coffee, please.", exampleRu: "Кофе, пожалуйста.", topic: "polite", frequencyRank: 3, kind: "WORD" },
  { levelCode: "A1", headword: "thank you", ipaUk: "ˈθæŋk juː", ipaUs: "ˈθæŋk juː", pos: "phrase", translationRu: "спасибо", exampleEn: "Thank you very much.", exampleRu: "Большое спасибо.", topic: "polite", frequencyRank: 4, kind: "WORD" },
  { levelCode: "A1", headword: "yes", ipaUk: "jes", ipaUs: "jes", pos: "particle", translationRu: "да", exampleEn: "Yes, I agree.", exampleRu: "Да, я согласен.", topic: "basics", frequencyRank: 5, kind: "WORD" },
  { levelCode: "A1", headword: "no", ipaUk: "nəʊ", ipaUs: "noʊ", pos: "particle", translationRu: "нет", exampleEn: "No, thank you.", exampleRu: "Нет, спасибо.", topic: "basics", frequencyRank: 6, kind: "WORD" },
  { levelCode: "A1", headword: "name", ipaUk: "neɪm", ipaUs: "neɪm", pos: "noun", translationRu: "имя", exampleEn: "My name is Anna.", exampleRu: "Меня зовут Анна.", topic: "personal", frequencyRank: 7, kind: "WORD" },
  { levelCode: "A1", headword: "family", ipaUk: "ˈfæməli", ipaUs: "ˈfæməli", pos: "noun", translationRu: "семья", exampleEn: "I have a big family.", exampleRu: "У меня большая семья.", topic: "family", frequencyRank: 8, kind: "WORD" },
  { levelCode: "A1", headword: "mother", ipaUk: "ˈmʌðə", ipaUs: "ˈmʌðər", pos: "noun", translationRu: "мать, мама", exampleEn: "My mother is a teacher.", exampleRu: "Моя мама — учительница.", topic: "family", frequencyRank: 9, kind: "WORD" },
  { levelCode: "A1", headword: "father", ipaUk: "ˈfɑːðə", ipaUs: "ˈfɑːðər", pos: "noun", translationRu: "отец, папа", exampleEn: "His father works here.", exampleRu: "Его отец работает здесь.", topic: "family", frequencyRank: 10, kind: "WORD" },
  { levelCode: "A1", headword: "friend", ipaUk: "frend", ipaUs: "frend", pos: "noun", translationRu: "друг, подруга", exampleEn: "She is my best friend.", exampleRu: "Она моя лучшая подруга.", topic: "people", frequencyRank: 11, kind: "WORD" },
  { levelCode: "A1", headword: "water", ipaUk: "ˈwɔːtə", ipaUs: "ˈwɔːtər", pos: "noun", translationRu: "вода", exampleEn: "Can I have some water?", exampleRu: "Можно немного воды?", topic: "food", frequencyRank: 12, kind: "WORD" },
  { levelCode: "A1", headword: "food", ipaUk: "fuːd", ipaUs: "fuːd", pos: "noun", translationRu: "еда", exampleEn: "The food is delicious.", exampleRu: "Еда очень вкусная.", topic: "food", frequencyRank: 13, kind: "WORD" },
  { levelCode: "A1", headword: "house", ipaUk: "haʊs", ipaUs: "haʊs", pos: "noun", translationRu: "дом", exampleEn: "They live in a big house.", exampleRu: "Они живут в большом доме.", topic: "home", frequencyRank: 14, kind: "WORD" },
  { levelCode: "A1", headword: "book", ipaUk: "bʊk", ipaUs: "bʊk", pos: "noun", translationRu: "книга", exampleEn: "I am reading a book.", exampleRu: "Я читаю книгу.", topic: "objects", frequencyRank: 15, kind: "WORD" },
  { levelCode: "A1", headword: "eat", ipaUk: "iːt", ipaUs: "iːt", pos: "verb", translationRu: "есть, кушать", exampleEn: "We eat breakfast at eight.", exampleRu: "Мы завтракаем в восемь.", topic: "verbs", frequencyRank: 16, kind: "WORD" },
  { levelCode: "A1", headword: "drink", ipaUk: "drɪŋk", ipaUs: "drɪŋk", pos: "verb", translationRu: "пить", exampleEn: "I drink tea every morning.", exampleRu: "Я пью чай каждое утро.", topic: "verbs", frequencyRank: 17, kind: "WORD" },
  { levelCode: "A1", headword: "go", ipaUk: "ɡəʊ", ipaUs: "ɡoʊ", pos: "verb", translationRu: "идти, ехать", exampleEn: "Let us go home.", exampleRu: "Пойдём домой.", topic: "verbs", frequencyRank: 18, kind: "WORD" },
  { levelCode: "A1", headword: "like", ipaUk: "laɪk", ipaUs: "laɪk", pos: "verb", translationRu: "нравиться, любить", exampleEn: "I like coffee.", exampleRu: "Мне нравится кофе.", topic: "verbs", frequencyRank: 19, kind: "WORD" },
  { levelCode: "A1", headword: "have", ipaUk: "hæv", ipaUs: "hæv", pos: "verb", translationRu: "иметь, есть (у меня)", exampleEn: "I have two cats.", exampleRu: "У меня две кошки.", topic: "verbs", frequencyRank: 20, kind: "WORD" },
  { levelCode: "A1", headword: "good", ipaUk: "ɡʊd", ipaUs: "ɡʊd", pos: "adj.", translationRu: "хороший", exampleEn: "That is a good idea.", exampleRu: "Это хорошая идея.", topic: "adjectives", frequencyRank: 21, kind: "WORD" },
  { levelCode: "A1", headword: "big", ipaUk: "bɪɡ", ipaUs: "bɪɡ", pos: "adj.", translationRu: "большой", exampleEn: "It is a big city.", exampleRu: "Это большой город.", topic: "adjectives", frequencyRank: 22, kind: "WORD" },
  { levelCode: "A1", headword: "small", ipaUk: "smɔːl", ipaUs: "smɔːl", pos: "adj.", translationRu: "маленький", exampleEn: "She has a small dog.", exampleRu: "У неё маленькая собака.", topic: "adjectives", frequencyRank: 23, kind: "WORD" },
  { levelCode: "A1", headword: "happy", ipaUk: "ˈhæpi", ipaUs: "ˈhæpi", pos: "adj.", translationRu: "счастливый, довольный", exampleEn: "I am very happy today.", exampleRu: "Сегодня я очень счастлив.", topic: "adjectives", frequencyRank: 24, kind: "WORD" },
  { levelCode: "A1", headword: "day", ipaUk: "deɪ", ipaUs: "deɪ", pos: "noun", translationRu: "день", exampleEn: "Have a nice day!", exampleRu: "Хорошего дня!", topic: "time", frequencyRank: 25, kind: "WORD" },
  { levelCode: "A1", headword: "one", ipaUk: "wʌn", ipaUs: "wʌn", pos: "num.", translationRu: "один", exampleEn: "I have one brother.", exampleRu: "У меня один брат.", topic: "numbers", frequencyRank: 26, kind: "WORD" },
  { levelCode: "A1", headword: "two", ipaUk: "tuː", ipaUs: "tuː", pos: "num.", translationRu: "два", exampleEn: "Two coffees, please.", exampleRu: "Два кофе, пожалуйста.", topic: "numbers", frequencyRank: 27, kind: "WORD" },
  { levelCode: "A1", headword: "three", ipaUk: "θriː", ipaUs: "θriː", pos: "num.", translationRu: "три", exampleEn: "The film starts at three.", exampleRu: "Фильм начинается в три.", topic: "numbers", frequencyRank: 28, kind: "WORD" },
  { levelCode: "A1", headword: "cat", ipaUk: "kæt", ipaUs: "kæt", pos: "noun", translationRu: "кошка, кот", exampleEn: "The cat is sleeping.", exampleRu: "Кошка спит.", topic: "animals", frequencyRank: 29, kind: "WORD" },
  { levelCode: "A1", headword: "dog", ipaUk: "dɒɡ", ipaUs: "dɑːɡ", pos: "noun", translationRu: "собака", exampleEn: "My dog likes to run.", exampleRu: "Моя собака любит бегать.", topic: "animals", frequencyRank: 30, kind: "WORD" },
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
  const total = await prisma.vocabItem.count();
  console.log(
    `✅ Демо-словарь A1: добавлено ${created}, всего слов в базе — ${total}.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed словаря:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
