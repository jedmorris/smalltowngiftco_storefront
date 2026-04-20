export interface CollectionSpec {
  handle: string;
  title: string;
  description: string;
  keywords: string[];
}

export const COLLECTIONS: CollectionSpec[] = [
  {
    handle: "teacher",
    title: "Teacher Gifts",
    description:
      "Gifts for teachers — end-of-year, back-to-school, and teacher appreciation.",
    keywords: [
      "teacher",
      "teach",
      "school",
      "classroom",
      "educator",
      "principal",
      "teacher appreciation",
      "teacher gift",
      "back to school",
      "end of year teacher",
      "paraprofessional",
    ],
  },
  {
    handle: "fourth-of-july",
    title: "4th of July",
    description:
      "Patriotic shirts and gifts for Independence Day and summer cookouts.",
    keywords: [
      "4th of july",
      "fourth of july",
      "independence day",
      "patriotic",
      "america",
      "american",
      "usa",
      "red white blue",
      "stars and stripes",
      "july 4",
      "freedom",
      "merica",
    ],
  },
  {
    handle: "pride",
    title: "Pride",
    description: "LGBTQ+ pride shirts and gifts — celebrate year-round.",
    keywords: [
      "pride",
      "lgbtq",
      "lgbt",
      "rainbow",
      "gay",
      "lesbian",
      "queer",
      "love is love",
      "transgender",
      "bisexual",
      "pride month",
      "pride ally",
    ],
  },
  {
    handle: "bachelorette",
    title: "Bachelorette",
    description:
      "Bachelorette party shirts — bride tribe, last fling, and more.",
    keywords: [
      "bachelorette",
      "bride tribe",
      "bride",
      "bride squad",
      "bridesmaid",
      "last fling",
      "hen party",
      "bach party",
      "team bride",
      "wifey",
      "miss to mrs",
    ],
  },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const KEYWORD_REGEXES: Map<string, RegExp[]> = new Map(
  COLLECTIONS.map((c) => [
    c.handle,
    c.keywords.map((k) => new RegExp(`\\b${escapeRegex(k.toLowerCase())}\\b`, "i")),
  ])
);

export function matchCollections(product: {
  title: string;
  tags?: string[];
  productType?: string;
  description?: string;
}): string[] {
  const haystack = [
    product.title,
    ...(product.tags ?? []),
    product.productType ?? "",
    (product.description ?? "").slice(0, 500),
  ]
    .join(" ")
    .toLowerCase();
  const matched: string[] = [];
  for (const c of COLLECTIONS) {
    const regexes = KEYWORD_REGEXES.get(c.handle)!;
    if (regexes.some((r) => r.test(haystack))) matched.push(c.handle);
  }
  return matched;
}

export function getCollection(handle: string): CollectionSpec | undefined {
  return COLLECTIONS.find((c) => c.handle === handle);
}
