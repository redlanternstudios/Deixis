import { createStorefrontClient } from '@shopify/hydrogen-react'

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN!
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!

export const shopifyClient = createStorefrontClient({
  storeDomain,
  storefrontToken,
  storefrontApiVersion: '2024-07',
})

export async function shopifyQuery<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(
    `https://${storeDomain}/api/2024-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
    }
  )

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`)
  }

  return response.json()
}
