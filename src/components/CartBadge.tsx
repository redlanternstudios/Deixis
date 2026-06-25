'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export default function CartBadge() {
  const { itemCount } = useCart()
  return (
    <Link href="/cart" className="relative hover:text-[var(--color-deixis-gold)] transition-colors">
      Cart
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-4 bg-[var(--color-deixis-black)] text-[var(--color-deixis-white)] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  )
}
