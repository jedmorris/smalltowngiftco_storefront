import "./_bootstrap";

import { getCollectionByHandle } from "../src/lib/shopify/admin";

async function main() {
  for (const h of ["teacher", "fourth-of-july", "pride", "bachelorette"]) {
    const c = await getCollectionByHandle(h);
    console.log(h.padEnd(16), c?.productsCount?.count ?? "?");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
