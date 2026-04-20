import "server-only";

export const PRODUCTS_LIST = /* GraphQL */ `
  query ProductsList($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: UPDATED_AT, reverse: true) {
      edges {
        cursor
        node {
          id
          title
          handle
          status
          totalInventory
          variants(first: 50) {
            edges {
              cursor
              node {
                id
                sku
                title
                inventoryQuantity
                inventoryItem {
                  id
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
              startCursor
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

export const VARIANT_BY_SKU = /* GraphQL */ `
  query VariantBySku($query: String!) {
    productVariants(first: 1, query: $query) {
      edges {
        node {
          id
          sku
          title
          inventoryQuantity
          inventoryItem {
            id
          }
          product {
            id
            title
            handle
          }
        }
      }
    }
  }
`;

export const PRIMARY_LOCATION = /* GraphQL */ `
  query PrimaryLocation {
    locations(first: 10, includeInactive: false) {
      edges {
        node {
          id
          name
          isActive
        }
      }
    }
  }
`;

export const PRODUCTS_LIST_WITH_TAGS = /* GraphQL */ `
  query ProductsListWithTags($first: Int!, $after: String) {
    products(first: $first, after: $after, sortKey: UPDATED_AT, reverse: true) {
      edges {
        cursor
        node {
          id
          title
          handle
          status
          tags
          vendor
          productType
          description
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
`;

export const COLLECTION_BY_HANDLE_ADMIN = /* GraphQL */ `
  query CollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      handle
      title
      productsCount {
        count
      }
    }
  }
`;
