import { ModuleLessonList } from "@/components/lessons/ModuleLessonList";

export default function ReadingPage() {
  return (
    <ModuleLessonList
      moduleType="READING"
      title="Чтение"
      description="Адаптированные тексты по уровням с вопросами на понимание."
    />
  );
}
