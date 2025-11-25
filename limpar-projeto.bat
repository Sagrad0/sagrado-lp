@echo off
echo ================================
echo Limpeza Completa do Projeto
echo ================================

echo.
echo 1. Removendo node_modules...
rmdir /s /q node_modules

echo.
echo 2. Removendo .next...
rmdir /s /q .next

echo.
echo 3. Removendo .turbo...
rmdir /s /q .turbo 2>nul

echo.
echo 4. Removendo package-lock.json...
del package-lock.json 2>nul

echo.
echo 5. Limpando cache do npm...
npm cache clean --force

echo.
echo ================================
echo Limpeza concluída!
echo Agora execute: npm install
echo ================================
pause