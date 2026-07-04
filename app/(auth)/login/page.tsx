import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">English Path</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Войдите в свой профиль
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
