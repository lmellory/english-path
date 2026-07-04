import { signOut } from "@/auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button
        type="submit"
        className="inline-flex h-9 items-center rounded-lg border bg-card px-3 text-sm font-medium text-card-foreground transition-colors hover:bg-muted"
      >
        Выйти
      </button>
    </form>
  );
}
