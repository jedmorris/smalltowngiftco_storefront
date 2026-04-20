import "./_bootstrap";

import {
  shopifyAdminFetch,
  listAllProductsWithTags,
  getCollectionByHandle,
} from "../src/lib/shopify/admin";

const PUBLICATIONS_QUERY = /* GraphQL */ `
  query Publications {
    publications(first: 20) {
      edges { node { id name } }
    }
  }
`;

const PUBLICATION_STATS = /* GraphQL */ `
  query PublicationStats($id: ID!) {
    publication(id: $id) {
      id
      name
      productsCount: products(first: 1) { edges { node { id } } }
    }
  }
`;

const SAMPLE_PRODUCTS_PUB = /* GraphQL */ `
  query Sample($first: Int!) {
    products(first: $first, sortKey: UPDATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          status
          resourcePublicationsV2(first: 5) {
            edges {
              node {
                publication { id name }
                isPublished
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTION_PUBS = /* GraphQL */ `
  query CollPubs($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      resourcePublicationsV2(first: 10) {
        edges {
          node {
            publication { id name }
            isPublished
          }
        }
      }
    }
  }
`;

async function main() {
  console.log("— Publications (sales channels) —");
  const pubs = await shopifyAdminFetch<{
    publications: { edges: Array<{ node: { id: string; name: string } }> };
  }>({ query: PUBLICATIONS_QUERY });
  const pubMap = new Map<string, string>();
  for (const e of pubs.publications.edges) {
    pubMap.set(e.node.name, e.node.id);
    console.log(`  ${e.node.id}  ${e.node.name}`);
  }

  console.log("\n— Sample of 10 most recent products, per-publication —");
  const sample = await shopifyAdminFetch<{
    products: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          status: string;
          resourcePublicationsV2: {
            edges: Array<{
              node: { publication: { id: string; name: string }; isPublished: boolean };
            }>;
          };
        };
      }>;
    };
  }>({ query: SAMPLE_PRODUCTS_PUB, variables: { first: 10 } });
  for (const e of sample.products.edges) {
    const n = e.node;
    const pubs = n.resourcePublicationsV2.edges.map(
      (p) => `${p.node.isPublished ? "✓" : "✗"}${p.node.publication.name}`
    );
    console.log(`  [${n.status}] ${n.title.slice(0, 50).padEnd(52)} ${pubs.join(", ")}`);
  }

  console.log("\n— Collection publication state —");
  for (const h of ["teacher", "fourth-of-july", "pride", "bachelorette"]) {
    const c = await shopifyAdminFetch<{
      collectionByHandle: {
        id: string;
        title: string;
        resourcePublicationsV2: {
          edges: Array<{
            node: { publication: { id: string; name: string }; isPublished: boolean };
          }>;
        };
      } | null;
    }>({ query: COLLECTION_PUBS, variables: { handle: h } });
    const coll = c.collectionByHandle;
    if (!coll) {
      console.log(`  ${h}: not found`);
      continue;
    }
    const status = coll.resourcePublicationsV2.edges
      .map((p) => `${p.node.isPublished ? "✓" : "✗"}${p.node.publication.name}`)
      .join(", ");
    console.log(`  ${h.padEnd(16)} ${status}`);
  }

  console.log("\n— Total product count with ACTIVE status —");
  const prods = await listAllProductsWithTags();
  const active = prods.filter((p) => p.status === "ACTIVE").length;
  const archived = prods.filter((p) => p.status === "ARCHIVED").length;
  const draft = prods.filter((p) => p.status === "DRAFT").length;
  console.log(`  ACTIVE=${active}  DRAFT=${draft}  ARCHIVED=${archived}  TOTAL=${prods.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
