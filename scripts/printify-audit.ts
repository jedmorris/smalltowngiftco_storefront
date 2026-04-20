import "./_bootstrap";

import { listAllProducts } from "../src/lib/printify";
import { COLLECTIONS, matchCollections } from "./_collections-config";
import { parseArgs } from "./_args";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return v;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourceShopId = requireEnv("PRINTIFY_SOURCE_SHOP_ID");

  console.log(`Fetching products from Printify source shop ${sourceShopId}…`);
  const products = await listAllProducts(sourceShopId, (n, total) => {
    process.stdout.write(`\r  fetched ${n}/${total}`);
  });
  process.stdout.write("\n");

  const counts = new Map<string, number>();
  for (const c of COLLECTIONS) counts.set(c.handle, 0);
  let matched = 0;

  const rows = products.map((p) => {
    const handles = matchCollections({
      title: p.title,
      tags: p.tags,
      description: p.description,
    });
    for (const h of handles) counts.set(h, (counts.get(h) ?? 0) + 1);
    if (handles.length > 0) matched++;
    const filtered = args.collection
      ? handles.includes(args.collection)
      : true;
    if (!filtered) return null;
    return {
      id: p.id,
      title: p.title.slice(0, 60),
      tags: p.tags.slice(0, 3).join(", ").slice(0, 40),
      collections: handles.join(",") || "-",
      visible: p.visible ? "y" : "n",
    };
  });

  const toShow = rows.filter((r): r is NonNullable<typeof r> => r !== null);
  if (toShow.length) console.table(toShow);

  console.log(`\nTotal products: ${products.length}`);
  console.log(`Products matching ≥1 target collection: ${matched}`);
  for (const c of COLLECTIONS) {
    console.log(`  ${c.handle.padEnd(16)} ${counts.get(c.handle) ?? 0}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
