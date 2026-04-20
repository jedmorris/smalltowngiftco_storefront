import "./_bootstrap";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { exec } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

/**
 * One-time OAuth capture for the Shopify Dev Dashboard app.
 *
 * Flow:
 *   1. Start localhost HTTP server on SHOPIFY_APP_OAUTH_PORT.
 *   2. Open browser to Shopify's OAuth authorize URL.
 *   3. Merchant approves install → Shopify redirects to our callback with ?code=…&hmac=…&state=….
 *   4. We verify HMAC + state, exchange code for an offline access token.
 *   5. Write SHOPIFY_ADMIN_ACCESS_TOKEN into .env.local and exit.
 *
 * After this runs once, all other admin scripts use the token via X-Shopify-Access-Token.
 */

// Admin API scopes — edit this list to match what you configured in the Dev Dashboard app.
const SCOPES = [
  "read_products",
  "write_products",
  "read_product_listings",
  "write_product_listings",
  "read_inventory",
  "write_inventory",
  "read_locations",
  "read_orders",
  "write_orders",
  "read_draft_orders",
  "write_draft_orders",
  "read_fulfillments",
  "write_fulfillments",
  "read_assigned_fulfillment_orders",
  "write_assigned_fulfillment_orders",
  "read_merchant_managed_fulfillment_orders",
  "write_merchant_managed_fulfillment_orders",
  "read_customers",
  "write_customers",
  "read_discounts",
  "write_discounts",
  "read_price_rules",
  "write_price_rules",
  "read_content",
  "write_content",
  "read_online_store_pages",
  "write_online_store_pages",
  "read_online_store_navigation",
  "write_online_store_navigation",
  "read_themes",
  "write_themes",
  "read_files",
  "write_files",
  "read_translations",
  "write_translations",
  "read_metaobjects",
  "write_metaobjects",
  "read_metaobject_definitions",
  "write_metaobject_definitions",
  "read_shipping",
  "write_shipping",
  "read_checkouts",
  "write_checkouts",
].join(",");

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return v;
}

function openBrowser(url: string): void {
  const cmd =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;
  exec(cmd, () => {
    /* ignore */
  });
}

function verifyHmac(params: URLSearchParams, secret: string): boolean {
  const provided = params.get("hmac");
  if (!provided) return false;
  const pairs: string[] = [];
  for (const [k, v] of params.entries()) {
    if (k === "hmac" || k === "signature") continue;
    pairs.push(`${k}=${v}`);
  }
  pairs.sort();
  const message = pairs.join("&");
  const digest = createHmac("sha256", secret).update(message).digest("hex");
  const a = Buffer.from(digest, "utf8");
  const b = Buffer.from(provided, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

async function exchangeCodeForToken(params: {
  shop: string;
  clientId: string;
  clientSecret: string;
  code: string;
}): Promise<{ access_token: string; scope: string }> {
  const res = await fetch(`https://${params.shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: params.clientId,
      client_secret: params.clientSecret,
      code: params.code,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Token exchange failed: ${res.status} ${res.statusText} ${body}`);
  }
  return (await res.json()) as { access_token: string; scope: string };
}

async function writeTokenToEnvLocal(token: string): Promise<string> {
  const envPath = new URL("../.env.local", import.meta.url);
  const fsPath = envPath.pathname;
  let contents = "";
  if (existsSync(fsPath)) {
    contents = await readFile(envPath, "utf8");
  }

  const line = `SHOPIFY_ADMIN_ACCESS_TOKEN=${token}`;
  const re = /^SHOPIFY_ADMIN_ACCESS_TOKEN=.*$/m;
  let next: string;
  if (re.test(contents)) {
    next = contents.replace(re, line);
  } else {
    next = contents.length && !contents.endsWith("\n") ? `${contents}\n${line}\n` : `${contents}${line}\n`;
  }

  await writeFile(envPath, next, { mode: 0o600 });
  return fsPath;
}

async function main() {
  const shop =
    process.env.SHOPIFY_APP_SHOP_DOMAIN ??
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!shop) {
    console.error(
      "Missing shop domain. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN (e.g. knk1ka-kt.myshopify.com) in .env.local"
    );
    process.exit(1);
  }
  const clientId = requireEnv("SHOPIFY_APP_CLIENT_ID");
  const clientSecret = requireEnv("SHOPIFY_APP_CLIENT_SECRET");
  const port = Number(process.env.SHOPIFY_APP_OAUTH_PORT ?? 3456);
  const redirectUri = `http://localhost:${port}/oauth/callback`;
  const state = randomBytes(16).toString("hex");

  const authorizeUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("scope", SCOPES);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", state);
  // `grant_options[]=` omitted → offline access token (what we want for scripts)

  const token = await new Promise<string>((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url ?? "/", `http://localhost:${port}`);
        if (url.pathname !== "/oauth/callback") {
          res.writeHead(404).end("Not found");
          return;
        }

        const returnedState = url.searchParams.get("state");
        if (returnedState !== state) {
          res.writeHead(400).end("State mismatch — aborting.");
          reject(new Error("OAuth state mismatch"));
          return;
        }

        if (!verifyHmac(url.searchParams, clientSecret)) {
          res.writeHead(400).end("HMAC verification failed — aborting.");
          reject(new Error("OAuth HMAC verification failed"));
          return;
        }

        const code = url.searchParams.get("code");
        const returnedShop = url.searchParams.get("shop");
        if (!code || !returnedShop) {
          res.writeHead(400).end("Missing code or shop parameter");
          reject(new Error("Missing code or shop"));
          return;
        }

        const exchange = await exchangeCodeForToken({
          shop: returnedShop,
          clientId,
          clientSecret,
          code,
        });

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(
          `<!doctype html><html><body style="font:16px system-ui;padding:2rem">
            <h1>✓ Token captured</h1>
            <p>You can close this tab and return to the terminal.</p>
          </body></html>`
        );

        server.close();
        resolve(exchange.access_token);
      } catch (err) {
        res.writeHead(500).end(String(err));
        reject(err);
      }
    });

    server.on("error", reject);
    server.listen(port, "127.0.0.1", () => {
      console.log(`\nListening on ${redirectUri}`);
      console.log(`Opening browser to authorize…`);
      console.log(`If it doesn't open, visit this URL manually:\n  ${authorizeUrl.toString()}\n`);
      openBrowser(authorizeUrl.toString());
    });
  });

  const envPath = await writeTokenToEnvLocal(token);
  console.log(`✓ Offline access token written to ${envPath}`);
  console.log(`  SHOPIFY_ADMIN_ACCESS_TOKEN=${token.slice(0, 10)}…${token.slice(-4)}`);
  console.log(`\nNext: npm run admin:list-products`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
