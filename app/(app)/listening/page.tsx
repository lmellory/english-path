import { ModuleLessonList } from "@/components/lessons/ModuleLessonList";

export default function ListeningPage() {
  return (
    <ModuleLessonList
      moduleType="LISTENING"
      title="Аудирование"
      description="Слушайте диалоги и отвечайте на вопросы. Текст можно открыть для проверки."
    />
  );
}
