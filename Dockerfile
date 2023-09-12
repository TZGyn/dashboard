FROM node:18

RUN mkdir /dashboard
WORKDIR /dashboard

COPY package*.json ./
RUN npm i -g pnpm
RUN npm i -g bun
RUN pnpm i
COPY . .

ENV HOST 0.0.0.0
EXPOSE 3000

RUN bun x next telemetry disable
RUN bun run build

ENTRYPOINT ["bun", "run", "start"]
