import "./_bootstrap";

import { listProducts } from "../src/lib/shopify/admin";

async function main() {
  const first = Number(process.argv[2] ?? 25);
  const connection = await listProducts(first);
  const rows = connection.edges.map(({ node }) => ({
    id: node.id.replace("gid://shopify/Product/", ""),
    handle: node.handle,
    title: node.title.slice(0, 50),
    status: node.status,
    inventory: node.totalInventory,
    variants: node.variants.edges.length,
  }));
  console.table(rows);
  console.log(
    `\n${rows.length} product(s)${
      connection.pageInfo.hasNextPage ? " (more available — paginate with cursor)" : ""
    }`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
