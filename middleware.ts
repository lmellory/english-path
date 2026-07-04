import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Middleware работает на всех страницах, кроме API, статики и служебных файлов.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
