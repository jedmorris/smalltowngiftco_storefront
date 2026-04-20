import "server-only";

export const PRODUCT_CREATE = /* GraphQL */ `
  mutation ProductCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
        handle
        status
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export const PRODUCT_UPDATE = /* GraphQL */ `
  mutation ProductUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        title
        handle
        status
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export const INVENTORY_ADJUST_QUANTITIES = /* GraphQL */ `
  mutation InventoryAdjustQuantities($input: InventoryAdjustQuantitiesInput!) {
    inventoryAdjustQuantities(input: $input) {
      inventoryAdjustmentGroup {
        createdAt
        reason
        changes {
          name
          delta
          quantityAfterChange
        }
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export const COLLECTION_CREATE = /* GraphQL */ `
  mutation CollectionCreate($input: CollectionInput!) {
    collectionCreate(input: $input) {
      collection {
        id
        handle
        title
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const COLLECTION_ADD_PRODUCTS = /* GraphQL */ `
  mutation CollectionAddProducts($id: ID!, $productIds: [ID!]!) {
    collectionAddProducts(id: $id, productIds: $productIds) {
      collection {
        id
        handle
        productsCount {
          count
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const PRODUCT_UPDATE_TAGS = /* GraphQL */ `
  mutation ProductUpdateTags($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        tags
      }
      userErrors {
        field
        message
      }
    }
  }
`;
