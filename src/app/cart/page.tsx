'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CartProvider, useCart } from '@/lib/cart-context'

function CartContent() {
  const { cart, itemCount, checkoutUrl, removeFromCart, loading } = useCart()

  if (itemCount === 0 || !cart) {
    return (
      <div className="container-main py-20 text-center">
        <h1 className="font-serif text-3xl mb-4">Your Cart</h1>
        <p className="text-[var(--color-deixis-stone)] mb-8">Your cart is empty.</p>
        <Link href="/shop" className="inline-block px-8 py-3 border-2 border-[var(--color-deixis-black)] text-sm tracking-widest uppercase hover:bg-[var(--color-deixis-black)] hover:text-white transition-colors">Continue Shopping</Link>
      </div>
    )
  }

  const lines = cart.lines.edges.map((e) => e.node)
  const subtotal = cart.cost.subtotalAmount

  return (
    <div className="container-main py-12">
      <h1 className="font-serif text-3xl mb-8">Your Cart ({itemCount})</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {lines.map((line) => (
            <div key={line.id} className="flex gap-4 pb-6 border-b border-[var(--color-deixis-stone)]/10">
              <div className="w-24 h-24 flex-shrink-0 bg-[var(--color-deixis-warm)] overflow-hidden">
                {line.merchandise.image ? (
                  <Image src={line.merchandise.image.url} alt={line.merchandise.image.altText || line.merchandise.title} width={96} height={96} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--color-deixis-stone)]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/shop/${line.merchandise.product.handle}`} className="font-serif text-lg hover:text-[var(--color-deixis-gold)] transition-colors">{line.merchandise.product.title}</Link>
                <p className="text-xs text-[var(--color-deixis-stone)] mt-1">{line.merchandise.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm">Qty: {line.quantity}</p>
                  <p className="text-sm">${parseFloat(line.cost.totalAmount.amount).toLocaleString()}</p>
                </div>
                <button onClick={() => removeFromCart(line.id)} disabled={loading} className="mt-2 text-xs tracking-widest uppercase text-[var(--color-deixis-stone)] hover:text-red-600 transition-colors disabled:opacity-50">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-28 border border-[var(--color-deixis-stone)]/20 p-6">
            <h2 className="font-serif text-xl mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm pb-4 border-b border-[var(--color-deixis-stone)]/10">
              <div className="flex justify-between"><span className="text-[var(--color-deixis-stone)]">Subtotal</span><span>${parseFloat(subtotal.amount).toLocaleString()} {subtotal.currencyCode}</span></div>
              <div className="flex justify-between"><span className="text-[var(--color-deixis-stone)]">Shipping</span><span>Calculated at checkout</span></div>
            </div>
            <a href={checkoutUrl || '#'} target="_blank" rel="noopener noreferrer" className="block w-full mt-6 py-3 px-6 text-sm tracking-widest uppercase text-center bg-[var(--color-deixis-black)] text-[var(--color-deixis-white)] border border-[var(--color-deixis-black)] hover:bg-[var(--color-deixis-stone)] hover:border-[var(--color-deixis-stone)] transition-colors">Proceed to Checkout</a>
            <p className="mt-4 text-[10px] text-[var(--color-deixis-stone)] text-center">Secure checkout powered by Shopify</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartContent />
    </CartProvider>
  )
}
