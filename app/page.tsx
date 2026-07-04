import { redirect } from "next/navigation";

// Middleware пускает сюда только вошедших; остальных перенаправляет на /login.
export default function Home() {
  redirect("/dashboard");
}
