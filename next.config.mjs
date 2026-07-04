/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Не роняем сборку/деплой из-за стилевых правил ESLint.
    // Проверки типов TypeScript при этом остаются включёнными.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
