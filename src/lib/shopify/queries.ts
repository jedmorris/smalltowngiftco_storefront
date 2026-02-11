const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    seo {
      title
      description
    }
    updatedAt
  }
`;

const COLLECTION_FRAGMENT = `
  fragment CollectionFields on Collection {
    id
    handle
    title
    description
    image {
      url
      altText
      width
      height
    }
    seo {
      title
      description
    }
    updatedAt
  }
`;

export const GET_FEATURED_PRODUCTS = `
  ${PRODUCT_FRAGMENT}
  query GetFeaturedProducts($first: Int!) {
    collection(handle: "frontpage") {
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = `
  ${PRODUCT_FRAGMENT}
  query GetAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          ...ProductFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

export const GET_ALL_COLLECTIONS = `
  ${COLLECTION_FRAGMENT}
  query GetAllCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionFields
        }
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  query GetCollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      ...CollectionFields
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS = `
  ${PRODUCT_FRAGMENT}
  query SearchProducts($query: String!, $first: Int!) {
    search(query: $query, first: $first, types: [PRODUCT]) {
      edges {
        node {
          ... on Product {
            ...ProductFields
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_HANDLES = `
  query GetProductHandles($first: Int!) {
    products(first: $first) {
      edges {
        node {
          handle
          updatedAt
        }
      }
    }
  }
`;

export const GET_COLLECTION_HANDLES = `
  query GetCollectionHandles($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          handle
          updatedAt
        }
      }
    }
  }
`;
