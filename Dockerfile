# Stage 1: build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./prisma ./prisma

RUN npx prisma generate

COPY . .

RUN npm run build

# Stage 2: production image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# copy palettes.json needed for fs local storage from:
COPY ./src/data ./src/data


EXPOSE 4000

CMD ["npm", "run", "start/linux:4000"]
