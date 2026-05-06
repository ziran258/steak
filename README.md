# Steak Wiki

A bilingual, structured steak and beef knowledge wiki. The v1 scope focuses on display-only pages for cuts, glossary terms, origins, grades, and trade topic placeholders.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- PostgreSQL schema with Drizzle ORM
- Docker-ready for Dokploy deployment on a Ubuntu VPS
- Static placeholder images in `public/images/placeholders`

## Local development

```bash
pnpm install
pnpm dev
```

## Database

The app currently renders from seed data in `src/data/wiki.ts` while the Drizzle schema and seed script prepare the PostgreSQL path.

```bash
cp .env.example .env
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

## Deployment notes

The project includes a standalone Next.js Dockerfile and a `docker-compose.yml` with PostgreSQL for local or VPS smoke testing. In Dokploy, connect the GitHub repository, set environment variables, and point the domain through Cloudflare DNS.
