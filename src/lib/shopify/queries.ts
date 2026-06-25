export const PRODUCTS_QUERY = `
  query Products {
    products(first: 50) {
      edges {
        node {
          id title handle description descriptionHtml availableForSale productType tags
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          images(first: 1) {
            edges { node { url altText width height } }
          }
          variants(first: 10) {
            edges { node { id title price { amount currencyCode } availableForSale selectedOptions { name value } } }
          }
        }
      }
    }
  }
`

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id title handle description descriptionHtml availableForSale productType tags
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      images(first: 5) {
        edges { node { url altText width height } }
      }
      variants(first: 50) {
        edges { node { id title price { amount currencyCode } compareAtPrice { amount currencyCode } availableForSale selectedOptions { name value } image { url altText } } }
      }
    }
  }
`

export const COLLECTIONS_QUERY = `
  query Collections {
    collections(first: 20) {
      edges { node { id title handle description image { url altText } } }
    }
  }
`

export const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id title handle description image { url altText }
      products(first: 50) {
        edges { node { id title handle description availableForSale priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } } images(first: 1) { edges { node { url altText } } } } }
      }
    }
  }
`

export const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { id checkoutUrl totalQuantity cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } lines(first: 10) { edges { node { id quantity cost { totalAmount { amount currencyCode } } merchandise { id title product { title handle } image { url altText } selectedOptions { name value } price { amount currencyCode } } } } } }
      userErrors { field message }
    }
  }
`

export const CART_ADD_LINE_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl totalQuantity cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } lines(first: 10) { edges { node { id quantity cost { totalAmount { amount currencyCode } } merchandise { id title product { title handle } image { url altText } selectedOptions { name value } price { amount currencyCode } } } } } }
      userErrors { field message }
    }
  }
`

export const CART_REMOVE_LINE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id checkoutUrl totalQuantity cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } lines(first: 10) { edges { node { id quantity cost { totalAmount { amount currencyCode } } merchandise { id title product { title handle } image { url altText } selectedOptions { name value } price { amount currencyCode } } } } } }
      userErrors { field message }
    }
  }
`

export const CART_QUERY = `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      id checkoutUrl totalQuantity cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } lines(first: 10) { edges { node { id quantity cost { totalAmount { amount currencyCode } } merchandise { id title product { title handle } image { url altText } selectedOptions { name value } price { amount currencyCode } } } } }
    }
  }
`
