export function validateEnv() {
  const required = [
    ['NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN', process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN],
    ['NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN', process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN],
    ['NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL],
    ['NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY],
  ] as const

  const missing = required.filter(([, value]) => !value).map(([name]) => name)

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`)
    console.warn('Set them in .env.local before deploying to production.')
  }

  return missing.length === 0
}

export const env = {
  SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
} as const
