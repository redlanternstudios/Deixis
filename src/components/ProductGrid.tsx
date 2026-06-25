import Image from 'next/image'
import Link from 'next/link'
import type { ShopifyProduct } from '@/lib/shopify/types'

interface ProductGridProps {
  products: ShopifyProduct[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[var(--color-deixis-stone)] text-lg">No works available yet.</p>
        <p className="text-[var(--color-deixis-stone)] text-sm mt-2">Check back soon for new arrivals.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => {
        const image = product.images.edges[0]?.node
        const minPrice = product.priceRange.minVariantPrice
        const maxPrice = product.priceRange.maxVariantPrice
        const isSinglePrice = minPrice.amount === maxPrice.amount
        return (
          <Link key={product.id} href={`/shop/${product.handle}`} className="group cursor-pointer">
            <div className="aspect-[4/5] bg-[var(--color-deixis-warm)] overflow-hidden mb-4">
              {image ? (
                <Image src={image.url} alt={image.altText || product.title} width={600} height={750} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-deixis-stone)]">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
              )}
            </div>
            <h3 className="font-serif text-lg mb-1 group-hover:text-[var(--color-deixis-gold)] transition-colors">{product.title}</h3>
            <p className="text-sm text-[var(--color-deixis-stone)]">
              {isSinglePrice
                ? `$${parseFloat(minPrice.amount).toLocaleString()} ${minPrice.currencyCode}`
                : `$${parseFloat(minPrice.amount).toLocaleString()} \u2013 $${parseFloat(maxPrice.amount).toLocaleString()} ${maxPrice.currencyCode}`
              }
            </p>
          </Link>
        )
      })}
    </div>
  )
}
