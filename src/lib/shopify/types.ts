export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  productType: string
  tags: string[]
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
    maxVariantPrice: { amount: string; currencyCode: string }
  }
  images: { edges: Array<{ node: { url: string; altText: string | null; width: number; height: number } }> }
  variants: { edges: Array<{ node: ShopifyVariant }> }
}

export interface ShopifyVariant {
  id: string
  title: string
  price: { amount: string; currencyCode: string }
  compareAtPrice: { amount: string; currencyCode: string } | null
  availableForSale: boolean
  selectedOptions: Array<{ name: string; value: string }>
  image: { url: string; altText: string | null } | null
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: { amount: string; currencyCode: string }
    totalAmount: { amount: string; currencyCode: string }
  }
  lines: { edges: Array<{ node: ShopifyCartLine }> }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  cost: {