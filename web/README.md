# ERPA · La Vie Nomade — web

Next.js App Router (**16**) + React 19 + Tailwind CSS 4 + **`next-intl`** (routes onder `/nl` en `/en`).

## Starten

```bash
cp .env.example .env           # DATABASE_URL staat naar SQLite `./dev.db` ( onder `prisma/`)
npm install                     # voert automatisch `prisma generate` uit
npm run db:push                # eerste keer schema naar SQLite
npm run dev
```

- Site: `/nl` (redirect vanaf `/`).
- **Request Access** slaat submissions op via **Prisma → SQLite** in development (`AccessRequest`).
- Basis-SEO: gegenereerde **`/sitemap.xml`** en **`/robots.txt`** (`NEXT_PUBLIC_SITE_URL`).

## Sanity Studio (`/studio`)

1. Kopieer `NEXT_PUBLIC_SANITY_PROJECT_ID` en `NEXT_PUBLIC_SANITY_DATASET` naar `.env` uit je Sanity-project.
2. Zet **beide** variabelen; zonder echte IDs redirect `/studio` terug naar de homepage.
3. Schema’s staan onder `sanity/schemaTypes/` (o.a. `siteSettings`, `eventArticle`).
4. Frontend-fetchers (`next-sanity`) kunnen hierna per sectie gekoppeld worden.

## Scripts

| Command              |                                                       |
| -------------------- | ----------------------------------------------------- |
| `npm run dev`        | Turbopack dev server                                  |
| `npm run build`      | Productie-build                                       |
| `npm run start`      | `next start`                                          |
| `npm run lint`       | ESLint                                                |
| `npm run db:push`    | SQLite schema pushen (`prisma db push`)               |

## Structuur (kern)

| Path                    | Rol                                          |
| ----------------------- | -------------------------------------------- |
| `app/[locale]/`         | Alle vertaalde pagina’s                      |
| `app/studio/`           | Sanity Studio (embedded)                     |
| `actions/`              | Server actions (Request Access intake)       |
| `sanity/schemaTypes/`   | Sanity document-schemas                       |
| `prisma/schema.prisma`  | Postgres-ready model (nu SQLite-url in env) |
| `i18n/` + `navigation.ts` | Taalrouting + `<Link>`                  |
