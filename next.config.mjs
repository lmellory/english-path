/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Prisma лучше не бандлить в серверные функции — иначе на Vercel
  // может не найтись движок запросов.
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
