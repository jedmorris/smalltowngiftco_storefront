import "./_bootstrap";

import {
  getCollectionByHandle,
  createCollection,
} from "../src/lib/shopify/admin";
import { COLLECTIONS } from "./_collections-config";

async function main() {
  let created = 0;
  let existing = 0;
  let failed = 0;

  for (const spec of COLLECTIONS) {
    const found = await getCollectionByHandle(spec.handle);
    if (found) {
      existing++;
      console.log(
        `  · exists  ${spec.handle.padEnd(16)} ${found.id}  (${found.productsCount?.count ?? 0} products)`
      );
      continue;
    }

    const result = await createCollection({
      title: spec.title,
      handle: spec.handle,
      descriptionHtml: `<p>${spec.description}</p>`,
      seo: { title: spec.title, description: spec.description },
    });

    if (result.userErrors.length > 0) {
      failed++;
      console.error(
        `  ✗ ${spec.handle} — ${result.userErrors.map((e) => e.message).join("; ")}`
      );
      continue;
    }

    if (result.collection) {
      created++;
      console.log(
        `  ✓ created ${spec.handle.padEnd(16)} ${result.collection.id}`
      );
    }
  }

  console.log(`\nCreated: ${created}, Existing: ${existing}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
