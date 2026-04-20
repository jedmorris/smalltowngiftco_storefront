import "./_bootstrap";

import { listShops } from "../src/lib/printify";

async function main() {
  const shops = await listShops();
  if (shops.length === 0) {
    console.log("No Printify shops found. Connect a sales channel in Printify first.");
    return;
  }
  console.table(
    shops.map((s) => ({
      id: s.id,
      title: s.title,
      sales_channel: s.sales_channel,
    }))
  );
  console.log(`\n${shops.length} shop(s).`);
  console.log(
    `\nSet PRINTIFY_SOURCE_SHOP_ID (live/Etsy shop) and PRINTIFY_TARGET_SHOP_ID (Shopify shop) in .env.local.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
