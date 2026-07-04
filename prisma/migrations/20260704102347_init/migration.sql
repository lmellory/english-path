-- CreateEnum
CREATE TYPE "LevelCode" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1');

-- CreateEnum
CREATE TYPE "ModuleType" AS ENUM ('VOCAB', 'GRAMMAR', 'SPEAKING', 'LISTENING', 'WRITING', 'READING', 'SLANG_IDIOMS');

-- CreateEnum
CREATE TYPE "Register" AS ENUM ('FORMAL', 'NEUTRAL', 'INFORMAL', 'SLANG');

-- CreateEnum
CREATE TYPE "VocabKind" AS ENUM ('WORD', 'IDIOM', 'PHRASAL_VERB', 'ABBREVIATION');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('MCQ', 'FILL_BLANK', 'MATCHING', 'WORD_ORDER', 'SPEAKING', 'LISTENING', 'WRITING', 'READING_Q');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Accent" AS ENUM ('UK', 'US');

-- CreateEnum
CREATE TYPE "ThemePref" AS ENUM ('LIGHT', 'DARK', 'SYSTEM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "currentLevel" "LevelCode" NOT NULL DEFAULT 'A1',
    "placementDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" "ThemePref" NOT NULL DEFAULT 'SYSTEM',
    "accent" "Accent" NOT NULL DEFAULT 'UK',
    "dailyGoalMinutes" INTEGER NOT NULL DEFAULT 20,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "cefrCanDo" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "levelCode" TEXT NOT NULL,
    "type" "ModuleType" NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "estMinutes" INTEGER NOT NULL DEFAULT 15,
    "intro" TEXT,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabItem" (
    "id" TEXT NOT NULL,
    "levelCode" TEXT NOT NULL,
    "lessonId" TEXT,
    "headword" TEXT NOT NULL,
    "ipaUk" TEXT,
    "ipaUs" TEXT,
    "pos" TEXT,
    "translationRu" TEXT NOT NULL,
    "exampleEn" TEXT,
    "exampleRu" TEXT,
    "topic" TEXT,
    "frequencyRank" INTEGER,
    "register" "Register" NOT NULL DEFAULT 'NEUTRAL',
    "kind" "VocabKind" NOT NULL DEFAULT 'WORD',

    CONSTRAINT "VocabItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrammarPoint" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "theoryMd" TEXT NOT NULL,
    "examples" JSONB,

    CONSTRAINT "GrammarPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "prompt" JSONB NOT NULL,
    "answer" JSONB NOT NULL,
    "explanation" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dialogue" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "title" TEXT,
    "lines" JSONB NOT NULL,

    CONSTRAINT "Dialogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingText" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT,
    "levelCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "questions" JSONB NOT NULL,

    CONSTRAINT "ReadingText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListeningTask" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "scriptEn" TEXT NOT NULL,
    "questions" JSONB NOT NULL,

    CONSTRAINT "ListeningTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "condition" JSONB,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "LessonProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "status" "ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "score" INTEGER,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "userAnswer" JSONB,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExerciseAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SrsCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vocabItemId" TEXT NOT NULL,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewedAt" TIMESTAMP(3),

    CONSTRAINT "SrsCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacementResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "determinedLevel" "LevelCode" NOT NULL,
    "score" INTEGER NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlacementResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "levelCode" "LevelCode" NOT NULL,
    "score" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "minutesStudied" INTEGER NOT NULL DEFAULT 0,
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "wordsLearned" INTEGER NOT NULL DEFAULT 0,
    "reviewsDone" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DailyActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Streak" (
    "userId" TEXT NOT NULL,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3),

    CONSTRAINT "Streak_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "achievementCode" TEXT NOT NULL,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Level_order_key" ON "Level"("order");

-- CreateIndex
CREATE INDEX "Module_levelCode_idx" ON "Module"("levelCode");

-- CreateIndex
CREATE UNIQUE INDEX "Module_levelCode_type_key" ON "Module"("levelCode", "type");

-- CreateIndex
CREATE INDEX "Lesson_moduleId_idx" ON "Lesson"("moduleId");

-- CreateIndex
CREATE INDEX "VocabItem_levelCode_idx" ON "VocabItem"("levelCode");

-- CreateIndex
CREATE INDEX "VocabItem_lessonId_idx" ON "VocabItem"("lessonId");

-- CreateIndex
CREATE INDEX "GrammarPoint_lessonId_idx" ON "GrammarPoint"("lessonId");

-- CreateIndex
CREATE INDEX "Exercise_lessonId_idx" ON "Exercise"("lessonId");

-- CreateIndex
CREATE INDEX "Dialogue_lessonId_idx" ON "Dialogue"("lessonId");

-- CreateIndex
CREATE INDEX "ReadingText_lessonId_idx" ON "ReadingText"("lessonId");

-- CreateIndex
CREATE INDEX "ReadingText_levelCode_idx" ON "ReadingText"("levelCode");

-- CreateIndex
CREATE INDEX "ListeningTask_lessonId_idx" ON "ListeningTask"("lessonId");

-- CreateIndex
CREATE INDEX "LessonProgress_userId_idx" ON "LessonProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LessonProgress_userId_lessonId_key" ON "LessonProgress"("userId", "lessonId");

-- CreateIndex
CREATE INDEX "ExerciseAttempt_userId_idx" ON "ExerciseAttempt"("userId");

-- CreateIndex
CREATE INDEX "ExerciseAttempt_exerciseId_idx" ON "ExerciseAttempt"("exerciseId");

-- CreateIndex
CREATE INDEX "SrsCard_userId_dueDate_idx" ON "SrsCard"("userId", "dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "SrsCard_userId_vocabItemId_key" ON "SrsCard"("userId", "vocabItemId");

-- CreateIndex
CREATE INDEX "PlacementResult_userId_idx" ON "PlacementResult"("userId");

-- CreateIndex
CREATE INDEX "ExamResult_userId_idx" ON "ExamResult"("userId");

-- CreateIndex
CREATE INDEX "DailyActivity_userId_idx" ON "DailyActivity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyActivity_userId_date_key" ON "DailyActivity"("userId", "date");

-- CreateIndex
CREATE INDEX "UserAchievement_userId_idx" ON "UserAchievement"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementCode_key" ON "UserAchievement"("userId", "achievementCode");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_levelCode_fkey" FOREIGN KEY ("levelCode") REFERENCES "Level"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabItem" ADD CONSTRAINT "VocabItem_levelCode_fkey" FOREIGN KEY ("levelCode") REFERENCES "Level"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabItem" ADD CONSTRAINT "VocabItem_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrammarPoint" ADD CONSTRAINT "GrammarPoint_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dialogue" ADD CONSTRAINT "Dialogue_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingText" ADD CONSTRAINT "ReadingText_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingText" ADD CONSTRAINT "ReadingText_levelCode_fkey" FOREIGN KEY ("levelCode") REFERENCES "Level"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListeningTask" ADD CONSTRAINT "ListeningTask_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseAttempt" ADD CONSTRAINT "ExerciseAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseAttempt" ADD CONSTRAINT "ExerciseAttempt_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SrsCard" ADD CONSTRAINT "SrsCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SrsCard" ADD CONSTRAINT "SrsCard_vocabItemId_fkey" FOREIGN KEY ("vocabItemId") REFERENCES "VocabItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementResult" ADD CONSTRAINT "PlacementResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyActivity" ADD CONSTRAINT "DailyActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Streak" ADD CONSTRAINT "Streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementCode_fkey" FOREIGN KEY ("achievementCode") REFERENCES "Achievement"("code") ON DELETE CASCADE ON UPDATE CASCADE;
