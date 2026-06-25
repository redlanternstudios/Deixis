import { shopifyFetch } from '@/lib/shopify/client'
import { PRODUCTS_QUERY } from '@/lib/shopify/queries'
import type { ShopifyProduct } from '@/lib/shopify/types'
import ProductGrid from '@/components/ProductGrid'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
  let products: ShopifyProduct[] = []
  let error: string | null = null

  try {
    const result = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
      PRODUCTS_QUERY
    )
    products = result.data?.products?.edges?.map((e) => e.node) ?? []
  } catch (e) {
    console.error('Shopify fetch error:', e)
    error = 'Unable to load products at this time.'
  }

  return (
    <div className="container-main py-12">
      <div className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl mb-3">Shop</h1>
        <p className="text-[var(--color-deixis-stone)] max-w-lg">Original works and fine art prints from our collective of artists.</p>
      </div>
      {error ? (
        <div className="text-center py-20">
          <p className="text-[var(--color-deixis-stone)]">{error}</p>
          <p className="text-sm text-[var(--color-deixis-stone)] mt-2">Please check back later or contact the gallery.</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  )
}
