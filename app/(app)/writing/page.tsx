import { ModuleLessonList } from "@/components/lessons/ModuleLessonList";

export default function WritingPage() {
  return (
    <ModuleLessonList
      moduleType="WRITING"
      title="Письмо"
      description="Задания с шаблонами и чек-листами самопроверки."
    />
  );
}
