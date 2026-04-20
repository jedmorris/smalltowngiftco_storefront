import "./_bootstrap";

import {
  listAllProducts,
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
  console.log(`Already published (has external id): ${products.length - toPublish.length}`);
  console.log(`Will publish: ${limited.length}`);

  if (!args.commit) {
    console.log(`\nDry-run complete. Re-run with --commit to publish.`);
    return;
  }

  // ── Phase 1: fire all publish calls (no polling). Printify pushes async to Shopify. ──
  console.log(`\nPhase 1 — firing ${limited.length} publish call(s)…`);
  const fired: string[] = [];
  let fireFail = 0;
  for (let i = 0; i < limited.length; i++) {
    const p = limited[i];
    try {
      await publishProduct(targetShopId, p.id);
      fired.push(p.id);
      if ((i + 1) % 25 === 0 || i === limited.length - 1) {
        console.log(`  fired ${i + 1}/${limited.length}`);
      }
    } catch (err) {
      fireFail++;
      console.error(
        `  ✗ publish ${p.title.slice(0, 60)} — ${String(err).slice(0, 200)}`
      );
    }
  }
  console.log(`Phase 1 done. Fired: ${fired.length}, Failed to fire: ${fireFail}`);

  // ── Phase 2: wait for Printify to finish pushing to Shopify. ──
  const waitSec = 90;
  console.log(`\nPhase 2 — waiting ${waitSec}s for Printify to populate Shopify external ids…`);
  await sleep(waitSec * 1000);

  // ── Phase 3: refresh product list; for each fired, ack with external id. ──
  console.log(`\nPhase 3 — refreshing product list to collect external ids…`);
  const firedSet = new Set(fired);
  const refreshed = await listAllProducts(targetShopId, (n, total) => {
    process.stdout.write(`\r  fetched ${n}/${total}`);
  });
  process.stdout.write("\n");

  const readyToAck = refreshed.filter(
    (p) => firedSet.has(p.id) && p.external?.id
  );
  const notReady = fired.length - readyToAck.length;

  console.log(`Ready to ack: ${readyToAck.length}`);
  if (notReady > 0) {
    console.log(`Still pending (no external id yet): ${notReady} — re-run later to ack these`);
  }

  let acked = 0;
  let ackFail = 0;
  for (const p of readyToAck) {
    try {
      await publishingSucceeded(targetShopId, p.id, {
        id: p.external!.id,
        handle: p.external!.handle ?? "",
      });
      acked++;
      if (acked % 25 === 0 || acked === readyToAck.length) {
        console.log(`  acked ${acked}/${readyToAck.length}`);
      }
    } catch (err) {
      ackFail++;
      console.error(
        `  ✗ ack ${p.title.slice(0, 60)} — ${String(err).slice(0, 200)}`
      );
    }
  }

  console.log(
    `\nDone. Fired: ${fired.length}, Fire failures: ${fireFail}, Acked: ${acked}, Ack failures: ${ackFail}, Pending: ${notReady}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
