import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações básicas e estáveis para Vercel
  compress: true,
  
  // Configuração mínima para imagens
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
