import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  RotateCcw,
  FileText,
  Headphones,
  PenLine,
  MessagesSquare,
  Trophy,
} from "lucide-react";
import { auth } from "@/auth";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SignOutButton } from "@/components/auth/SignOutButton";

const TILES = [
  { href: "/vocabulary", icon: BookOpen, color: "text-primary", title: "Словарь", desc: "Слова с транскрипцией и озвучкой." },
  { href: "/grammar", icon: GraduationCap, color: "text-accent", title: "Грамматика", desc: "Теория и упражнения с проверкой." },
  { href: "/reading", icon: FileText, color: "text-primary", title: "Чтение", desc: "Тексты с вопросами на понимание." },
  { href: "/listening", icon: Headphones, color: "text-accent", title: "Аудирование", desc: "Слушайте диалоги и отвечайте." },
  { href: "/writing", icon: PenLine, color: "text-primary", title: "Письмо", desc: "Задания с шаблонами и чек-листами." },
  { href: "/speaking", icon: MessagesSquare, color: "text-accent", title: "Разговорная речь", desc: "Диалоги с озвучкой — повторяйте вслух." },
  { href: "/review", icon: RotateCcw, color: "text-success", title: "Повторение", desc: "Интервальное повторение (SM-2)." },
  { href: "/exams/A1", icon: Trophy, color: "text-warning", title: "Итоговый тест A1", desc: "Проверьте себя перед переходом на A2." },
  { href: "/exams/A2", icon: Trophy, color: "text-warning", title: "Итоговый тест A2", desc: "Проверьте себя перед переходом на B1." },
];

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name ?? "друг";

  return (
    <main className="mx-auto max-w-4xl p-4 sm:p-6">
      <header className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          English Path
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </header>

      <div className="mt-10">
        <h1 className="text-3xl font-bold tracking-tight">Привет, {name}! 👋</h1>
        <p className="mt-2 text-muted-foreground">
          Продолжим учить английский. Выберите, с чего начать сегодня.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-2xl border bg-card p-5 transition-colors hover:bg-muted"
            >
              <Icon className={`h-6 w-6 ${t.color}`} />
              <h2 className="mt-3 text-lg font-semibold">{t.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Панель с прогрессом, streak и достижениями появится в следующих частях.
      </p>
    </main>
  );
}
