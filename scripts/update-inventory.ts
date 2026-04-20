import "./_bootstrap";

import {
  findVariantBySku,
  getPrimaryLocation,
  adjustInventoryRest,
} from "../src/lib/shopify/admin";

interface Args {
  sku?: string;
  delta?: number;
}

function parseArgs(argv: string[]): Args {
  const out: Args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--variant-sku" || arg === "--sku") out.sku = argv[++i];
    else if (arg === "--delta") out.delta = Number(argv[++i]);
  }
  return out;
}

async function main() {
  const { sku, delta } = parseArgs(process.argv.slice(2));
  if (!sku || delta === undefined || Number.isNaN(delta)) {
    console.error(
      "Usage: npm run admin:update-inventory -- --variant-sku <sku> --delta <signed-int>"
    );
    process.exit(2);
  }

  const variant = await findVariantBySku(sku);
  if (!variant) {
    console.error(`No variant found with sku="${sku}"`);
    process.exit(1);
  }

  const location = await getPrimaryLocation();
  if (!location) {
    console.error("No active location found");
    process.exit(1);
  }

  console.log(
    `Variant: ${variant.product.title} / ${variant.title} (sku=${variant.sku})`
  );
  console.log(`  Before: inventoryQuantity=${variant.inventoryQuantity}`);
  console.log(`  Location: ${location.name}`);
  console.log(`  Delta: ${delta >= 0 ? "+" : ""}${delta}`);

  const res = await adjustInventoryRest({
    inventoryItemId: variant.inventoryItem.id,
    locationId: location.id,
    delta,
  });

  console.log(`  After: available=${res.inventory_level.available}`);
  console.log(`  Updated at: ${res.inventory_level.updated_at}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
