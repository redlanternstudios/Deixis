'use client'

import { useState } from 'react'
import VariantSelector from '@/components/VariantSelector'
import AddToCartButton from '@/components/AddToCartButton'
import type { ShopifyVariant } from '@/lib/shopify/types'

interface ProductDetailClientProps {
  variants: ShopifyVariant[]
}

export default function ProductDetailClient({ variants }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(
    variants.find((v) => v.availableForSale) ?? variants[0] ?? null
  )

  return (
    <div>
      <VariantSelector variants={variants} selectedVariant={selectedVariant} onSelect={setSelectedVariant} />
      <div className="mt-6">
        <AddToCartButton variant={selectedVariant} />
      </div>
    </div>
  )
}
