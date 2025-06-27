FROM node:20-alpine

WORKDIR /app

# Instala solo dependencias necesarias para desarrollo
COPY package*.json ./
RUN npm install

# Copia el resto del código (si no se usa volumen)
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]