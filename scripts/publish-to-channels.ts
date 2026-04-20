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

const PUBLISHABLE_PUBLISH = /* GraphQL */ `
  mutation Publish($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      publishable { ... on Collection { id } ... on Product { id } }
      userErrors { field message }
    }
  }
`;

// Channels to publish to. "Online Store" is the main storefront; "Shop" surfaces in Shop app.
const TARGET_CHANNELS = ["Online Store", "Shop"];

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
