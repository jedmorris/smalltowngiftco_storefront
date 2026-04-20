import "./_bootstrap";

import {
  listAllProducts,
  getProduct,
  createProduct,
  type PrintifyProduct,
} from "../src/lib/printify";
import { matchCollections } from "./_collections-config";
import { parseArgs } from "./_args";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return v;
}

// Fields we strip before POSTing to target shop — Printify rejects these on create.
const STRIP_KEYS = new Set([
  "id",
  "shop_id",
  "user_id",
  "created_at",
  "updated_at",
  "visible",
  "is_locked",
  "external",
  "sales_channel_properties",
  "images", // product-level mockup images — Printify regenerates from print_areas
  "options", // option definitions are derived from blueprint + selected variants
]);

function normalizePrintAreas(
  printAreas: PrintifyProduct["print_areas"]
): unknown[] {
  if (!Array.isArray(printAreas)) return [];
  const normalized = printAreas
    .map((area) => {
      const placeholders = (area.placeholders ?? [])
        .map((ph) => ({
          position: ph.position,
          images: (ph.images ?? [])
            .filter((img) => img && img.id)
            .map((img) => {
              // Printify's create endpoint only accepts: id, x, y, scale, angle.
              const out: Record<string, unknown> = { id: img.id };
              if (typeof img.x === "number") out.x = img.x;
              if (typeof img.y === "number") out.y = img.y;
              if (typeof img.scale === "number") out.scale = img.scale;
              if (typeof img.angle === "number") out.angle = img.angle;
              return out;
            }),
        }))
        // Printify rejects placeholders with empty images arrays.
        .filter((ph) => ph.images.length > 0);
      return {
        variant_ids: area.variant_ids,
        placeholders,
        ...(area.background ? { background: area.background } : {}),
      };
    })
    // Drop areas left with no placeholders after filtering.
    .filter((area) => area.placeholders.length > 0);
  return normalized;
}

function buildCreateInput(src: PrintifyProduct): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(src)) {
    if (STRIP_KEYS.has(k)) continue;
    out[k] = v;
  }
  // Variants: keep only create-relevant fields.
  if (Array.isArray(src.variants)) {
    out.variants = src.variants.map((v) => ({
      id: v.id,
      price: v.price,
      is_enabled: v.is_enabled,
      ...(v.sku ? { sku: v.sku } : {}),
    }));
  }
  // print_areas: strip read-only image metadata that Printify POST rejects.
  out.print_areas = normalizePrintAreas(src.print_areas);
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourceShopId = requireEnv("PRINTIFY_SOURCE_SHOP_ID");
  const targetShopId = requireEnv("PRINTIFY_TARGET_SHOP_ID");

  console.log(
    `Mode: ${args.commit ? "COMMIT" : "DRY-RUN"}${args.limit ? ` (limit ${args.limit})` : ""}`
  );
  console.log(`Source shop: ${sourceShopId}  →  Target shop: ${targetShopId}`);
  if (args.collection) console.log(`Collection filter: ${args.collection}`);

  console.log(`\nFetching source products…`);
  const source = await listAllProducts(sourceShopId, (n, total) => {
    process.stdout.write(`\r  fetched ${n}/${total}`);
  });
  process.stdout.write("\n");

  console.log(`Fetching target shop's existing products (for idempotency)…`);
  const target = await listAllProducts(targetShopId, (n, total) => {
    process.stdout.write(`\r  fetched ${n}/${total}`);
  });
  process.stdout.write("\n");
  const targetTitles = new Set(target.map((p) => p.title.trim().toLowerCase()));

  const candidates = source.filter((p) => {
    const handles = matchCollections({
      title: p.title,
      tags: p.tags,
      description: p.description,
    });
    if (handles.length === 0) return false;
    if (args.collection && !handles.includes(args.collection)) return false;
    return true;
  });

  const toReplicate: PrintifyProduct[] = [];
  for (const p of candidates) {
    if (targetTitles.has(p.title.trim().toLowerCase())) continue;
    toReplicate.push(p);
    if (args.limit && toReplicate.length >= args.limit) break;
  }

  console.log(
    `\nCandidates: ${candidates.length} (matched any collection)`
  );
  console.log(
    `Skipped (already in target): ${candidates.length - toReplicate.length}`
  );
  console.log(`Will replicate: ${toReplicate.length}`);
  if (args.verbose) {
    for (const p of toReplicate) console.log(`  - ${p.title}`);
  }

  if (!args.commit) {
    console.log(`\nDry-run complete. Re-run with --commit to actually create.`);
    return;
  }

  let created = 0;
  let failed = 0;
  for (const summary of toReplicate) {
    try {
      const full = await getProduct(sourceShopId, summary.id);
      const input = buildCreateInput(full);
      const result = await createProduct(targetShopId, input);
      created++;
      console.log(
        `  ✓ ${created}/${toReplicate.length}  ${result.id}  ${summary.title.slice(0, 60)}`
      );
    } catch (err) {
      failed++;
      console.error(`  ✗ ${summary.title.slice(0, 60)} — ${String(err).slice(0, 600)}`);
    }
  }
  console.log(`\nDone. Created: ${created}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
