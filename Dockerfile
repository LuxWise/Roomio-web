FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

ENV NEXT_PUBLIC_MAPBOX=pk.eyJ1IjoibHV4d2lzZSIsImEiOiJjbTRoYXZzNXIwNHk2MmtvZ3IxeGduOHpxIn0.-C8Am0AAaFfr7okj8pCKag

COPY . .  
RUN npm run build  

# Etapa 2: Producción
FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

EXPOSE 3000

CMD [ "npm", "run", "start" ]
