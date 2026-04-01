# Briefly

Anonymous URL shortener built with Next.js, TypeScript, Tailwind CSS, Prisma, and SQLite for local development.

## Features

- Create short URLs without creating an account
- Optional custom alias
- Private manage URL shown once after link creation
- Edit destination URL later from the private manage page
- Disable or delete links
- Basic click counting and click event storage

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- SQLite locally, easy to switch to PostgreSQL later

## Getting Started

1. Copy `.env.example` to `.env`
2. Install dependencies with `npm install`
3. Generate Prisma client with `npm run prisma:generate`
4. Create the local SQLite database with `npm run db:init`
5. Start the app with `npm run dev`

## Environment Variables

- `DATABASE_URL`: Prisma connection string
- `NEXT_PUBLIC_APP_URL`: public app base URL
- `REDIS_URL`: reserved for future distributed rate limiting

## Notes

- This starter uses Prisma for queries and ships with a local `db:init` fallback because Prisma's schema engine can be unreliable in some Windows sandboxed environments.
- For production, switch the datasource to PostgreSQL and use proper Prisma migrations in CI or your deployment pipeline.

## Next Steps

- Replace the in-memory rate limiter with Redis
- Move from SQLite to PostgreSQL for production
- Add QR code generation
- Add abuse detection and blocked domain checks
- Add richer analytics charts
