'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import type { ShopifyVariant } from '@/lib/shopify/types'

interface AddToCartButtonProps {
  variant: ShopifyVariant | null
  disabled?: boolean
}

export default function AddToCartButton({ variant, disabled }: AddToCartButtonProps) {
  const { addToCart, loading } = useCart()
  const [added, setAdded] = useState(false)

  if (!variant) {
    return <button disabled className="w-full py-3 px-6 text-sm tracking-widest uppercase border border-gray-200 text-gray-300 cursor-not-allowed">Select Options</button>
  }

  if (!variant.availableForSale) {
    return <button disabled className="w-full py-3 px-6 text-sm tracking-widest uppercase border border-gray-200 text-gray-300 cursor-not-allowed">Sold Out</button>
  }

  const handleClick = async () => {
    await addToCart(variant.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || disabled}
      className={`w-full py-3 px-6 text-sm tracking-widest uppercase border transition-all ${
        added
          ? 'bg-green-900 text-white border-green-900'
          : 'bg-[var(--color-deixis-black)] text-[var(--color-deixis-white)] border-[var(--color-deixis-black)] hover:bg-[var(--color-deixis-stone)] hover:border-[var(--color-deixis-stone)]'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? 'Adding\u2026' : added ? 'Added!' : 'Add to Cart'}
    </button>
  )
}
