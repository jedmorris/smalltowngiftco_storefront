import "./_bootstrap";

import { shopifyAdminFetch } from "../src/lib/shopify/admin";
import { COLLECTIONS } from "./_collections-config";
import { parseArgs } from "./_args";

const PUBLICATIONS_QUERY = /* GraphQL */ `
  query Publications {
    publications(first: 20) {
      edges { node { id name } }
    }
  }
`;

const COLLECTION_BY_HANDLE = /* GraphQL */ `
  query CollByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      resourcePublicationsV2(first: 20) {
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

const PRODUCTS_NEEDING_PUBLISH = /* GraphQL */ `
  query ProductsNeedingPublish($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: UPDATED_AT, reverse: true) {
      edges {
        cursor
        node {
          id
          title
          resourcePublications(first: 20) {
            edges {
              node {
                publication { id name }
                isPublished
              }
            }
          }
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const PUBLISHABLE_PUBLISH = /* GraphQL */ `
  mutation Publish($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      publishable { ... on Collection { id } ... on Product { id } }
      userErrors { field message }
    }
  }
`;

// Channels to publish to. Online Store = hosted storefront. Shop = Shop app.
// "My Store Headless" is the Hydrogen/headless channel that the Storefront API
// token is bound to — without it, the Next.js Vercel app can't see products.
const TARGET_CHANNELS = ["Online Store", "Shop", "My Store Headless"];

async function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log(`Mode: ${args.commit ? "COMMIT" : "DRY-RUN"}`);
  console.log(`Target channels: ${TARGET_CHANNELS.join(", ")}`);

  // Resolve publication IDs.
  const pubs = await shopifyAdminFetch<{
    publications: { edges: Array<{ node: { id: string; name: string } }> };
  }>({ query: PUBLICATIONS_QUERY });
  const pubIdByName = new Map<string, string>();
  for (const e of pubs.publications.edges) pubIdByName.set(e.node.name, e.node.id);

  const targetPubIds: Array<{ publicationId: string }> = [];
  for (const name of TARGET_CHANNELS) {
    const id = pubIdByName.get(name);
    if (!id) {
      console.error(`Channel "${name}" not found — skipping`);
      continue;
    }
    targetPubIds.push({ publicationId: id });
    console.log(`  · ${name.padEnd(24)} ${id}`);
  }
  if (targetPubIds.length === 0) {
    console.error("No target channels resolved. Aborting.");
    process.exit(1);
  }

  // ── Publish products ──
  console.log(`\nAuditing products for missing channel publications…`);
  let prodPublished = 0;
  let prodSkipped = 0;
  let prodFailed = 0;
  let prodTotal = 0;
  let after: string | undefined;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const page = await shopifyAdminFetch<{
      products: {
        edges: Array<{
          cursor: string;
          node: {
            id: string;
            title: string;
            resourcePublications: {
              edges: Array<{
                node: { publication: { id: string; name: string }; isPublished: boolean };
              }>;
            };
          };
        }>;
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    }>({ query: PRODUCTS_NEEDING_PUBLISH, variables: { first: 100, after } });

    for (const e of page.products.edges) {
      prodTotal++;
      const n = e.node;
      const alreadyPublishedTo = new Set(
        n.resourcePublications.edges
          .filter((x) => x.node.isPublished)
          .map((x) => x.node.publication.name)
      );
      const toPublish = targetPubIds.filter((p) => {
        const name = TARGET_CHANNELS.find((n) => pubIdByName.get(n) === p.publicationId);
        return name && !alreadyPublishedTo.has(name);
      });
      if (toPublish.length === 0) {
        prodSkipped++;
        continue;
      }
      if (!args.commit) {
        prodPublished++;
        continue;
      }
      const res = await shopifyAdminFetch<{
        publishablePublish: {
          publishable: { id: string } | null;
          userErrors: Array<{ field: string[] | null; message: string }>;
        };
      }>({ query: PUBLISHABLE_PUBLISH, variables: { id: n.id, input: toPublish } });

      if (res.publishablePublish.userErrors.length > 0) {
        prodFailed++;
        console.error(
          `  ✗ ${n.title.slice(0, 50)} — ${res.publishablePublish.userErrors.map((e) => e.message).join("; ")}`
        );
      } else {
        prodPublished++;
        if (prodPublished % 50 === 0) {
          console.log(`  ✓ published ${prodPublished} products so far`);
        }
      }
    }

    if (!page.products.pageInfo.hasNextPage) break;
    after = page.products.pageInfo.endCursor ?? undefined;
  }
  console.log(
    `  Products: ${prodPublished} published / ${prodSkipped} already OK / ${prodFailed} failed (${prodTotal} scanned)`
  );

  // ── Publish collections ──
  console.log(`\nPublishing ${COLLECTIONS.length} collection(s):`);
  let published = 0;
  let skipped = 0;
  let failed = 0;

  for (const spec of COLLECTIONS) {
    const data = await shopifyAdminFetch<{
      collectionByHandle: {
        id: string;
        title: string;
        resourcePublicationsV2: {
          edges: Array<{
            node: { publication: { id: string; name: string }; isPublished: boolean };
          }>;
        };
      } | null;
    }>({ query: COLLECTION_BY_HANDLE, variables: { handle: spec.handle } });
    const coll = data.collectionByHandle;
    if (!coll) {
      console.log(`  ${spec.handle}: not found, skipping`);
      continue;
    }

    const alreadyPublishedTo = new Set(
      coll.resourcePublicationsV2.edges
        .filter((e) => e.node.isPublished)
        .map((e) => e.node.publication.name)
    );

    const toPublish = targetPubIds.filter((p) => {
      const name = TARGET_CHANNELS.find((n) => pubIdByName.get(n) === p.publicationId);
      return name && !alreadyPublishedTo.has(name);
    });

    if (toPublish.length === 0) {
      skipped++;
      console.log(`  ${spec.handle.padEnd(16)} already on ${[...alreadyPublishedTo].join(", ") || "(nothing)"} — skip`);
      continue;
    }

    if (!args.commit) {
      console.log(`  ${spec.handle.padEnd(16)} would publish to ${toPublish.length} channel(s)`);
      continue;
    }

    const result = await shopifyAdminFetch<{
      publishablePublish: {
        publishable: { id: string } | null;
        userErrors: Array<{ field: string[] | null; message: string }>;
      };
    }>({
      query: PUBLISHABLE_PUBLISH,
      variables: { id: coll.id, input: toPublish },
    });

    if (result.publishablePublish.userErrors.length > 0) {
      failed++;
      console.error(
        `  ✗ ${spec.handle} — ${result.publishablePublish.userErrors
          .map((e) => e.message)
          .join("; ")}`
      );
      continue;
    }
    published++;
    console.log(`  ✓ ${spec.handle.padEnd(16)} published to ${toPublish.length} channel(s)`);
  }

  console.log(`\nDone. Published: ${published}, Already-published (skipped): ${skipped}, Failed: ${failed}`);
  if (!args.commit) {
    console.log(`Dry-run. Re-run with --commit to actually publish.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
