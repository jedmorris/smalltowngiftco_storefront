import "./_bootstrap";

import {
  listAllProductsWithTags,
  getCollectionByHandle,
  addProductsToCollection,
  updateProductTags,
  type AdminProductWithTags,
} from "../src/lib/shopify/admin";
import { COLLECTIONS, matchCollections } from "./_collections-config";
import { parseArgs } from "./_args";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const targetHandles = args.collection
    ? COLLECTIONS.filter((c) => c.handle === args.collection).map((c) => c.handle)
    : COLLECTIONS.map((c) => c.handle);

  if (targetHandles.length === 0) {
    console.error(`No collection matches --collection ${args.collection}`);
    process.exit(1);
  }

  console.log(`Mode: ${args.commit ? "COMMIT" : "DRY-RUN"}`);
  console.log(`Target collections: ${targetHandles.join(", ")}`);

  console.log(`\nResolving collection IDs…`);
  const collectionIds = new Map<string, string>();
  for (const handle of targetHandles) {
    const c = await getCollectionByHandle(handle);
    if (!c) {
      console.error(
        `  ✗ collection '${handle}' not found — run \`npm run shopify:create-collections\` first`
      );
      process.exit(1);
    }
    collectionIds.set(handle, c.id);
    console.log(`  · ${handle.padEnd(16)} ${c.id}`);
  }

  console.log(`\nFetching Shopify products…`);
  const products = await listAllProductsWithTags((n) => {
    process.stdout.write(`\r  fetched ${n}`);
  });
  process.stdout.write("\n");

  const byCollection = new Map<string, AdminProductWithTags[]>();
  for (const handle of targetHandles) byCollection.set(handle, []);

  // Skip products that already have the `collection:<handle>` bookkeeping tag
  // from a prior assign run — Shopify's collectionAddProducts errors on duplicates.
  let alreadyAssigned = 0;
  for (const p of products) {
    const matched = matchCollections({
      title: p.title,
      tags: p.tags,
      productType: p.productType,
      description: p.description,
    });
    for (const h of matched) {
      if (!byCollection.has(h)) continue;
      if (p.tags.includes(`collection:${h}`)) {
        alreadyAssigned++;
        continue;
      }
      byCollection.get(h)!.push(p);
    }
  }
  if (alreadyAssigned > 0) {
    console.log(
      `\nSkipped ${alreadyAssigned} product/collection pair(s) already tagged from prior run.`
    );
  }

  console.log(`\nMatch summary:`);
  for (const handle of targetHandles) {
    const matched = byCollection.get(handle)!;
    console.log(`  ${handle.padEnd(16)} ${matched.length} product(s)`);
    if (args.verbose) {
      for (const p of matched) console.log(`    - ${p.title}`);
    }
  }

  if (!args.commit) {
    console.log(`\nDry-run complete. Re-run with --commit to assign + tag.`);
    return;
  }

  let totalAssigned = 0;
  let totalTagged = 0;
  let failures = 0;

  for (const handle of targetHandles) {
    const collectionId = collectionIds.get(handle)!;
    const matched = byCollection.get(handle)!;
    if (matched.length === 0) continue;

    console.log(`\nAssigning ${matched.length} product(s) to '${handle}'…`);
    for (const batch of chunk(matched, 250)) {
      const ids = batch.map((p) => p.id);
      const result = await addProductsToCollection(collectionId, ids);
      if (result.userErrors.length > 0) {
        failures++;
        console.error(
          `  ✗ addProducts batch of ${batch.length}: ${result.userErrors.map((e) => e.message).join("; ")}`
        );
        continue;
      }
      totalAssigned += batch.length;
      console.log(
        `  ✓ added batch of ${batch.length} (collection now has ${result.collection?.productsCount?.count ?? "?"})`
      );
    }

    const tag = `collection:${handle}`;
    for (const p of matched) {
      if (p.tags.includes(tag)) continue;
      const nextTags = Array.from(new Set([...p.tags, tag]));
      const errs = await updateProductTags(p.id, nextTags);
      if (errs.length > 0) {
        failures++;
        console.error(
          `  ✗ tag ${p.title.slice(0, 50)}: ${errs.map((e) => e.message).join("; ")}`
        );
      } else {
        totalTagged++;
      }
    }
  }

  console.log(
    `\nDone. Assigned: ${totalAssigned}, Tagged: ${totalTagged}, Failures: ${failures}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
