/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'standalone',
eslint: {
    // Ignorar errores de ESLint durante el build para ahorrar memoria
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorar errores de TS durante el build para ahorrar memoria
    ignoreBuildErrors: true,
  },
  /* opciones de configuración aquí si las necesitas */
};

export default nextConfig;