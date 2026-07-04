import type { NextAuthConfig } from "next-auth";

// Edge-безопасная часть конфигурации (без Prisma и bcrypt) — используется в middleware.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [], // Реальный провайдер (Credentials) добавляется в auth.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");

      if (isOnLogin) {
        // Уже вошедших уводим на дашборд
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      // Все остальные страницы требуют входа
      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) {
        (token as any).id = (user as any).id;
        (token as any).username = (user as any).username;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token as any).id;
        session.user.username = (token as any).username;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
