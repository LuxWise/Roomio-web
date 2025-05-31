# Etapa 1: Build
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .  
RUN npm run build  # 👈 Genera el contenido en .next/

# Etapa 2: Producción
FROM node:24-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

ENV NODE_ENV=production
EXPOSE 3000

CMD [ "npm", "run", "start" ]
