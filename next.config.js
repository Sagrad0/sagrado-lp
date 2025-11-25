/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações básicas e estáveis
  compress: true,
  
  // Configuração mínima para imagens
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 31536000, // 1 ano
  },
}

module.exports = nextConfig
