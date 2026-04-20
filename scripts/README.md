# Admin scripts

Node scripts (run via `tsx`) that hit the **live Shopify store** using the Admin API.

## Setup

We use the new **Shopify Dev Dashboard** app (the legacy "Custom Apps" flow is deprecated). Auth is one-time OAuth — a local script captures an offline access token and writes it to `.env.local`.

1. **In the Dev Dashboard app** (`dev dashboard → Small Town Gift Co Admin`):
   - **Settings → App setup → Redirect URLs:** add `http://localhost:3456/oauth/callback`
   - **Settings → Access scopes:** enable the Admin API scopes you want. The scope list in `scripts/auth.ts` must match (or be a subset).
   - **Settings → Client credentials:** copy **Client ID** and **Client secret**.

2. **Add to `.env.local`:**

   ```
   SHOPIFY_APP_CLIENT_ID=<client id>
   SHOPIFY_APP_CLIENT_SECRET=<client secret>
   SHOPIFY_ADMIN_API_VERSION=2025-01
   ```

   (`NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` is reused from existing config.)

3. **Run the one-time OAuth capture:**

   ```
   npm run admin:auth
   ```

   Browser opens → approve the install → script writes `SHOPIFY_ADMIN_ACCESS_TOKEN` into `.env.local` and exits. Rerun any time you change scopes.

## Running

```
npm run admin:list-products           # list 25 most recently updated products
npm run admin:list-products -- 100    # change the page size

npm run admin:update-inventory -- --variant-sku ABC-123 --delta 1
npm run admin:update-inventory -- --variant-sku ABC-123 --delta -1
```

Generic form: `npm run script -- scripts/<file>.ts`

## Scripts

| Script                      | API                | Purpose                                             |
| --------------------------- | ------------------ | --------------------------------------------------- |
| `auth.ts`                   | Shopify OAuth      | One-time Admin API token capture                    |
| `list-products.ts`          | Shopify GraphQL    | List products with inventory + SKUs                 |
| `update-inventory.ts`       | Shopify GraphQL+REST | Adjust inventory at primary location              |
| `printify-list-shops.ts`    | Printify           | List Printify shops (find source/target shop IDs)   |
| `printify-audit.ts`         | Printify           | Dry-run: match source products → target collections |
| `printify-replicate.ts`     | Printify           | Clone source-shop products into target (Shopify) shop |
| `printify-publish.ts`       | Printify           | Push target-shop products live to Shopify           |
| `create-collections.ts`     | Shopify GraphQL    | Create the 4 target collections (idempotent)        |
| `assign-collections.ts`     | Shopify GraphQL    | Keyword-match products → assign to collections + tag |
| `publish-to-channels.ts`    | Shopify GraphQL    | Ensure collections published to Online Store + Shop channels |
| `daily-sync.ts`             | All of the above   | Full pipeline orchestrator + Vercel revalidate + log |

## Daily sync routine

`scripts/daily-sync.ts` chains all three write operations plus a Vercel cache revalidate, designed to run unattended at 2 AM PT via a Claude Code scheduled task (`smalltowngiftco-daily-sync`, cron `0 2 * * *` local TZ).

- Invoke manually: `npm run sync:daily`
- Log: `.tmp/daily-sync.log` (append-only, timestamped blocks per run)
- Each step is idempotent — reruns are safe and cheap when nothing new has landed in Printify
- Uses `PRINTIFY_MIN_GAP_MS=1500` throughout to ride through Printify's publish-endpoint rate limits
- Tail the log to see the latest run's summary: `tail -80 .tmp/daily-sync.log`

## Printify → Shopify replication flow

Separate concern from Admin API setup. Requires connecting Shopify as a sales channel inside Printify first.

### Setup

1. **Printify dashboard** → store dropdown → **+ Add new store** → **Shopify** → connect `knk1ka-kt.myshopify.com`.
2. **Printify → My Profile → Connections** → generate an API token.
3. Add to `.env.local`:
   ```
   PRINTIFY_API_TOKEN=<token>
   PRINTIFY_SOURCE_SHOP_ID=<Etsy shop id>
   PRINTIFY_TARGET_SHOP_ID=<Shopify shop id>
   ```
   Use `npm run printify:list-shops` to discover the IDs.

### Runbook

```
npm run printify:list-shops                              # discover shop IDs
npm run printify:audit                                   # dry-run: match source products to collections
npm run printify:audit -- --collection teacher           # focus on one collection
npm run printify:replicate                               # dry-run clone plan
npm run printify:replicate -- --commit --limit 5         # small batch
npm run printify:replicate -- --commit                   # full run
npm run printify:publish -- --commit                     # push Printify products to Shopify
npm run shopify:create-collections                       # create 4 collections (idempotent)
npm run shopify:assign-collections                       # dry-run matcher
npm run shopify:assign-collections -- --commit           # assign + tag products
```

All `--commit` commands default to dry-run when the flag is absent.

## Debug

- `SHOPIFY_ADMIN_DEBUG=1` — logs GraphQL cost + REST rate-limit headers.
- `PRINTIFY_DEBUG=1` — logs each Printify request method/path/status.

## Safety

- Scripts operate against **live** stores (Shopify + Printify). Default behaviour is dry-run for any write; explicit `--commit` required.
- Tokens are server-only — never commit `.env.local`, never prefix with `NEXT_PUBLIC_`, never import `@/lib/shopify/admin` or `@/lib/printify` from client components.
