import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compressão automática
  compress: true,
  
  // Otimização de imagens
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 ano
  },

  // DESATIVAR otimização CSS para evitar conflitos
  experimental: {
    optimizeCss: false,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Configuração robusta para resolver problemas de React Context
  webpack: (config, { isServer }) => {
    // Resolver problemas com contextos React - configuração mais robusta
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        // Forçar resolução de módulos React
        'react': require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
      };
    }
    
    // Resolver problemas de Module Federation e contextos
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: false,
      syncWebAssembly: true,
    };
    
    return config;
  },
};

export default nextConfig;
