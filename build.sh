#!/bin/bash

# Sagrado LP - Script de Build Otimizado
echo "🚀 Iniciando build otimizado do Sagrado LP..."

# Limpeza anterior
echo "🧹 Limpando cache anterior..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf dist

# Instalar dependências com cache limpo
echo "📦 Instalando dependências..."
npm ci --no-cache --force

# Build com configurações otimizadas
echo "🔨 Executando build..."
NODE_OPTIONS='--max-old-space-size=4096' npm run build

# Verificar se o build foi bem-sucedido
if [ $? -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Arquivos gerados em .next/"
else
    echo "❌ Erro durante o build!"
    exit 1
fi