FROM node:18

RUN mkdir /dashboard
WORKDIR /dashboard

COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm i
COPY . .
COPY .env.example .env.local

ENV HOST 0.0.0.0
EXPOSE 3000

RUN pnpm run build

ENTRYPOINT ["pnpm", "run", "start"]
