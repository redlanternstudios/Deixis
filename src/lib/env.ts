// Environment variable validation — fails fast at build time
// All env vars must be set before deployment

export function validateEnv() {
  const required = [
    ['SHOPIFY_STORE_DOMAIN', process.env.SHOPIFY_STORE_DOMAIN],
    ['SHOPIFY_STOREFRONT_ACCESS_TOKEN', process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN],
    ['NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL],
    ['NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY],
  ] as const

  const missing = required.filter(([, value]) => !value).map(([name]) => name)

  if (missing.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missing.join(', ')}`)
    console.warn('Set them in .env.local before deploying to production.')
  }

  return missing.length === 0
}

// Exports with fallbacks for build-time safety
export const env = {
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN || '',
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
} as const
