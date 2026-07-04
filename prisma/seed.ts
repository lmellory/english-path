import { PrismaClient, ModuleType } from "@prisma/client";

const prisma = new PrismaClient();

// 5 уровней CEFR
const levels: {
  code: string;
  title: string;
  order: number;
  cefrCanDo: string;
}[] = [
  {
    code: "A1",
    title: "Beginner",
    order: 1,
    cefrCanDo:
      "Понимает и использует простые бытовые выражения, может представиться и задать базовые вопросы о человеке.",
  },
  {
    code: "A2",
    title: "Elementary",
    order: 2,
    cefrCanDo:
      "Общается в простых повседневных ситуациях, рассказывает о себе, семье, работе и ближайшем окружении.",
  },
  {
    code: "B1",
    title: "Intermediate",
    order: 3,
    cefrCanDo:
      "Справляется с большинством ситуаций в путешествии, связно рассказывает о событиях, мечтах и планах.",
  },
  {
    code: "B2",
    title: "Upper-Intermediate",
    order: 4,
    cefrCanDo:
      "Свободно общается с носителями, понимает сложные тексты, чётко выражает мнение по широкому кругу тем.",
  },
  {
    code: "C1",
    title: "Advanced",
    order: 5,
    cefrCanDo:
      "Гибко и точно использует язык в социальных, академических и профессиональных целях, улавливает нюансы.",
  },
];

// 7 модулей в каждом уровне
const modules: { type: ModuleType; title: string; order: number }[] = [
  { type: "VOCAB", title: "Vocabulary", order: 1 },
  { type: "GRAMMAR", title: "Grammar", order: 2 },
  { type: "SPEAKING", title: "Speaking", order: 3 },
  { type: "LISTENING", title: "Listening", order: 4 },
  { type: "WRITING", title: "Writing", order: 5 },
  { type: "READING", title: "Reading", order: 6 },
  { type: "SLANG_IDIOMS", title: "Slang & Idioms", order: 7 },
];

async function main() {
  for (const lvl of levels) {
    await prisma.level.upsert({
      where: { code: lvl.code },
      update: { title: lvl.title, order: lvl.order, cefrCanDo: lvl.cefrCanDo },
      create: lvl,
    });

    for (const m of modules) {
      await prisma.module.upsert({
        where: { levelCode_type: { levelCode: lvl.code, type: m.type } },
        update: { title: m.title, order: m.order },
        create: {
          levelCode: lvl.code,
          type: m.type,
          title: m.title,
          order: m.order,
        },
      });
    }
  }

  const levelCount = await prisma.level.count();
  const moduleCount = await prisma.module.count();
  console.log(
    `✅ Seed завершён: уровней — ${levelCount}, модулей — ${moduleCount}.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Ошибка seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
