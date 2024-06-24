# Use uma imagem oficial do Node.js como imagem base
FROM node:16

# Crie e defina o diretório de trabalho da aplicação
WORKDIR /app

# Copie os arquivos de configuração e dependências
COPY backend/package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY backend .

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
