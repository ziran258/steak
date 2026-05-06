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

The project includes a standalone Next.js Dockerfile, a local `docker-compose.yml`, and a production-oriented `docker-compose.vps.yml` for the first no-domain VPS deployment. Use `scripts/deploy-vps.sh` to bootstrap Docker on Ubuntu, clone the GitHub repo, create server-side production environment variables, and run a smoke test. Later, connect the GitHub repository in Dokploy, set environment variables, and point the domain through Cloudflare DNS.
