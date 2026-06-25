const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!

const SHOPIFY_API_URL = `https://${STORE_DOMAIN}/api/2024-01/graphql.json`

export async function shopifyQuery(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(SHOPIFY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })
  return res.json()
}