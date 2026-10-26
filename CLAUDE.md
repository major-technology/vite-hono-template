# App guide

This app is a pnpm workspace with a separate frontend and backend.

```
frontend/   Vite + React single-page app (static files, served from /)
backend/    Hono API, every route under /api
shared/     types used by both (optional: rename or delete it freely)
```

`pnpm dev` runs both: Vite on `$PORT`, the backend on 3002. Vite proxies `/api/*` to the backend, so the app behaves like production, where `/api/*` goes to the backend and every other path goes to the frontend.

## Frontend (`frontend/`)

- Call the backend with relative URLs: `fetch("/api/...")`. Never hardcode a host or port.
- Never put secrets in `VITE_*` variables. They are baked into the public JS bundle. Secrets belong in the backend.
- Do not change Vite's `base`, `build.outDir` or `build.assetsDir`. The platform serves `frontend/dist` with Vite's defaults (`/`, `dist`, `assets`).
- Any path without a file extension serves `index.html`, so client-side routes and deep links work.
- Style with Tailwind CSS 4 and the theme tokens (`bg-background`, `text-muted-foreground`, `bg-card`, `border`, `text-destructive`, ...). Never hardcode colors.
- Theme tokens live in `src/theme.css` (CSS variables) and `src/styles.css` maps them to Tailwind. Do not edit `src/theme.css` by hand.
- shadcn/ui is initialized (`components.json`). Add components from `frontend/`: `npx shadcn@latest add button`. They go to `src/components/ui/`.
- `@/` resolves to `frontend/src/`. Merge class names with `cn()` from `@/lib/utils`.

## Backend (`backend/`)

- `src/app.ts` builds the `OpenAPIHono` app with `.basePath("/api")`. `src/index.ts` only starts the server.
- Define every route with `createRoute` and zod schemas from `@hono/zod-openapi`, in a file under `src/routes/`, and register it in `src/app.ts`. The OpenAPI document is served at `/api/openapi.json`.
- `src/app.ts` registers `contextStorage()` before every route. Code outside a handler reads the current request with `getContext()` from `hono/context-storage`, so do not pass `c` down through helpers.
- Keep `GET /api/healthz`. The platform uses it as the health check.
- Get the signed-in user with `getCurrentUser()` from `src/lib/auth.ts`. It reads the `x-major-user-jwt` request header, which may be absent locally; then it falls back to `MAJOR_JWT_TOKEN`.
- The backend is stateless. Instances restart and scale at any time, so:
  - no local disk and no in-memory state that must survive a request; store data in a database or file storage resource;
  - no timers, intervals or background jobs; use workflows for scheduled or long-running work.

## Checking your work

- Run `pnpm lint` (oxlint plus a type check of every package) to validate changes.
- Do not run `vite build` or `pnpm build` while developing. The dev server is already running and the platform builds on deploy.
