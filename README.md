# Bookmark Dashboard made with Next.js & NextUI

Showcase: [website](https://next-dashboard.tzgyn.com) hosted on linode using docker

## Preview

<details>
  <summary>Show</summary>

### Homepage

![homepage](./doc/assets/homepage.png)

### Bookmarks

![homepage](./doc/assets/bookmarks.png)

### Bookmark Categories

![homepage](./doc/assets/category.png)

</details>

## Requirements

-   [Nodejs](https://nodejs.org/en)
-   [Postgres](https://www.postgresql.org/)
-   [Docker](https://www.docker.com/) to self host

## Environments

Copy .env.example to .env.local before building

```bash
DATABASE_URL=postgres://{postgres}:{password}@127.0.0.1:5432/next-dashboard
ENVIRONMENT=prod

```

# Next.js & NextUI Template

This is a template for creating applications using Next.js 13 (app directory) and NextUI (v2).

## Technologies Used

-   [Next.js 13](https://nextjs.org/docs/getting-started)
-   [NextUI v2](https://nextui.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Tailwind Variants](https://tailwind-variants.org)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Framer Motion](https://www.framer.com/motion/)
-   [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm run dev
```

### Deployment (Docker)

You can deploy using docker-compose, container name: next_dashboard (can be modified in docker-compose.yml)

```bash
docker-compose up -d --build

```
