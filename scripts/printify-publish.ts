import "./_bootstrap";

import {
  listAllProducts,
  getProduct,
  publishProduct,
  publishingSucceeded,
} from "../src/lib/printify";
import { parseArgs } from "./_args";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return v;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function pollForExternal(
  shopId: string,
  productId: string,
  timeoutMs = 120_000
): Promise<{ id: string; handle: string } | null> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const p = await getProduct(shopId, productId);
    if (p.external?.id) {
      return { id: p.external.id, handle: p.external.handle ?? "" };
    }
    await sleep(5000);
  }
  return null;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const targetShopId = requireEnv("PRINTIFY_TARGET_SHOP_ID");

  console.log(`Mode: ${args.commit ? "COMMIT" : "DRY-RUN"}`);
  console.log(`Target shop: ${targetShopId}`);

  console.log(`\nFetching target shop's products…`);
  const products = await listAllProducts(targetShopId, (n, total) => {
    process.stdout.write(`\r  fetched ${n}/${total}`);
  });
  process.stdout.write("\n");

  const toPublish = products.filter((p) => !p.external?.id);
  const limited = args.limit ? toPublish.slice(0, args.limit) : toPublish;

  console.log(`Products: ${products.length}`);
  console.log(`Already published: ${products.length - toPublish.length}`);
  console.log(`Will publish: ${limited.length}`);

  if (!args.commit) {
    console.log(`\nDry-run complete. Re-run with --commit to publish.`);
    return;
  }

  let published = 0;
  let failed = 0;
  for (const p of limited) {
    try {
      await publishProduct(targetShopId, p.id);
      const ext = await pollForExternal(targetShopId, p.id);
      if (!ext) {
        failed++;
        console.error(
          `  ✗ ${p.title.slice(0, 60)} — timed out waiting for Shopify external id`
        );
        continue;
      }
      await publishingSucceeded(targetShopId, p.id, ext);
      published++;
      console.log(
        `  ✓ ${published}/${limited.length}  ${ext.id}  ${p.title.slice(0, 60)}`
      );
    } catch (err) {
      failed++;
      console.error(
        `  ✗ ${p.title.slice(0, 60)} — ${String(err).slice(0, 200)}`
      );
    }
  }
  console.log(`\nDone. Published: ${published}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
