# Agent Instructions — itsmejessicajean / Small Town Gift Co.

**Stack:** Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 4 + Shopify Hydrogen React

**Architecture:**
- `src/app/` — Next.js App Router (pages, API routes, layouts)
- `src/components/` — React components (layout, product, cart, analytics, ui)
- `src/context/` — Client-side state (CartContext, AuthContext, WishlistContext, QuickViewContext)
- `src/lib/shopify/` — Shopify **Storefront** API client (customer-facing reads, cart, account ops)
- `src/lib/shopify/admin/` — Shopify **Admin** API client (GraphQL + REST). Server-only via `import "server-only"`. Consumed only by Node scripts in `scripts/` — never imported from `src/app/` or any client component.
- `src/lib/printify/` — Printify API client. Server-only. Used by `scripts/printify-*.ts` to replicate the POD catalog from the Etsy-connected Printify shop into the Shopify-connected Printify shop (then Printify pushes products live to Shopify). Rate-limited to ~9 req/s under Printify's 600/min cap.
- `scripts/` — One-off admin/ops scripts run via `tsx`. Admin API: `admin:auth`, `admin:list-products`, `admin:update-inventory`. Catalog replication + collections: `printify:list-shops`, `printify:audit`, `printify:replicate`, `printify:publish`, `shopify:create-collections`, `shopify:assign-collections`. All writes default to dry-run (pass `--commit` to actually write). Loads `.env.local` via `dotenv`. See `scripts/README.md`.
- `scripts/daily-sync.ts` (`npm run sync:daily`) — orchestrator that runs the full replicate → publish → assign → revalidate pipeline and appends to `.tmp/daily-sync.log`. Registered as a Claude Code scheduled task (`smalltowngiftco-daily-sync`, cron `0 2 * * *` local TZ) that fires every morning at 2 AM PT. Runs only when Claude Code is active on the Mac.
- `src/lib/` — Utilities (analytics, consent, sanitize, token-crypto, sentry)
- `public/` — Static assets, manifest.json, robots.txt

**Deployment:** Vercel (`smalltowngiftco.vercel.app`)

**Key Patterns:**
- ISR with 3600s revalidation + on-demand revalidation via `/api/revalidate` webhook
- `NEXT_PUBLIC_*` env vars must use static literal access (no dynamic `process.env[name]`)
- Admin API token (`SHOPIFY_ADMIN_ACCESS_TOKEN`) is server-only — never prefix with `NEXT_PUBLIC_`, never import `@/lib/shopify/admin` from a client component (`server-only` will fail the build if you try).
- Auth tokens encrypted with AES-GCM before localStorage; cookie flag for middleware SSR check
- Reviews stored server-side in `.tmp/reviews.json`
- Sentry for error monitoring (config in `sentry.*.config.ts`)
- GA4 + Meta Pixel for analytics (consent-gated)

**File System:**
- `.tmp/`: Ephemeral data (reviews, intermediates). Git-ignored.
- `.env.local`: Secrets. Git-ignored.

**Mandate:** Use Opus-4.6 for everything while building.
