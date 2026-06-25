import { notFound } from 'next/navigation'
import Image from 'next/image'
import { shopifyFetch } from '@/lib/shopify/client'
import { PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify/queries'
import type { ShopifyProduct } from '@/lib/shopify/types'
import ProductDetailClient from './ProductDetailClient'

interface ProductPageProps {
  params: Promise<{ handle: string }>
}

export const dynamic = 'force-dynamic'

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params
  let product: ShopifyProduct | null = null

  try {
    const result = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle }
    )
    product = result.data?.productByHandle ?? null
  } catch (e) {
    console.error('Shopify product fetch error:', e)
  }

  if (!product) {
    notFound()
  }

  const images = product.images.edges.map((e) => e.node)
  const variants = product.variants.edges.map((e) => e.node)
  const firstImage = images[0]

  return (
    <div className="container-main py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          {firstImage ? (
            <div className="aspect-[4/5] bg-[var(--color-deixis-warm)] overflow-hidden">
              <Image src={firstImage.url} alt={firstImage.altText || product.title} width={800} height={1000} className="w-full h-full object-cover" priority />
            </div>
          ) : (
            <div className="aspect-[4/5] bg-[var(--color-deixis-warm)] flex items-center justify-center text-[var(--color-deixis-stone)]">No image available</div>
          )}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {images.map((img, i) => (
                <div key={i} className="w-20 h-20 flex-shrink-0 bg-[var(--color-deixis-warm)] overflow-hidden border border-transparent hover:border-[var(--color-deixis-black)] transition-colors cursor-pointer">
                  <Image src={img.url} alt={img.altText || `${product.title} ${i + 1}`} width={80} height={80} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="font-serif text-3xl md:text-4xl mb-2">{product.title}</h1>
          {product.productType && (
            <p className="text-xs tracking-widest uppercase text-[var(--color-deixis-stone)] mb-6">{product.productType}</p>
          )}
          <div className="prose prose-sm max-w-none text-[var(--color-deixis-stone)] mb-8" dangerouslySetInnerHTML={{ __html: product.descriptionHtml || `<p>${product.description}</p>` }} />
          <ProductDetailClient variants={variants} />
          {product.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[var(--color-deixis-stone)]/10">
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <span key={tag} className="text-[10px] tracking-widest uppercase px-3 py-1 border border-[var(--color-deixis-stone)]/20 text-[var(--color-deixis-stone)]">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
