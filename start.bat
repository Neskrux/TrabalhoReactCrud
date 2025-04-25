@echo off
echo Instalando dependencias do backend...
cd backend
npm install

echo Instalando dependencias do frontend...
cd ../frontend
npm install

echo Iniciando o backend...
start cmd /k "cd backend && npm start"

echo Iniciando o frontend...
start cmd /k "cd frontend && npm start"

echo Sistema iniciado! Acesse http://localhost:3000 no seu navegador. 