# Agent Instructions — itsmejessicajean / Small Town Gift Co.

**Stack:** Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 4 + Shopify Hydrogen React

**Architecture:**
- `src/app/` — Next.js App Router (pages, API routes, layouts)
- `src/components/` — React components (layout, product, cart, analytics, ui)
- `src/context/` — Client-side state (CartContext, AuthContext, WishlistContext, QuickViewContext)
- `src/lib/shopify/` — Shopify Storefront API client, queries, mutations, types, normalization
- `src/lib/` — Utilities (analytics, consent, sanitize, token-crypto, sentry)
- `public/` — Static assets, manifest.json, robots.txt

**Deployment:** Vercel (`smalltowngiftco.vercel.app`)

**Key Patterns:**
- ISR with 3600s revalidation + on-demand revalidation via `/api/revalidate` webhook
- `NEXT_PUBLIC_*` env vars must use static literal access (no dynamic `process.env[name]`)
- Auth tokens encrypted with AES-GCM before localStorage; cookie flag for middleware SSR check
- Reviews stored server-side in `.tmp/reviews.json`
- Sentry for error monitoring (config in `sentry.*.config.ts`)
- GA4 + Meta Pixel for analytics (consent-gated)

**File System:**
- `.tmp/`: Ephemeral data (reviews, intermediates). Git-ignored.
- `.env.local`: Secrets. Git-ignored.

**Mandate:** Use Opus-4.6 for everything while building.
