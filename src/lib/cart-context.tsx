'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { shopifyFetch } from './shopify/client'
import {
  CART_CREATE_MUTATION, CART_ADD_LINE_MUTATION, CART_REMOVE_LINE_MUTATION, CART_QUERY,
} from './shopify/queries'
import type { ShopifyCart } from './shopify/types'

const CART_ID_KEY = 'deixis_cart_id'

interface CartContextValue {
  cart: ShopifyCart | null
  itemCount: number
  checkoutUrl: string | null
  loading: boolean
  addToCart: (variantId: string, quantity?: number) => Promise<void>
  removeFromCart: (lineId: string) => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

function getStoredCartId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CART_ID_KEY)
}
function storeCartId(id: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_ID_KEY, id)
}
function clearCartId() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_ID_KEY)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [loading, setLoading] = useState(false)

  const loadCart = useCallback(async () => {
    const cartId = getStoredCartId()
    if (!cartId) return
    try {
      const result = await shopifyFetch<{ cart: ShopifyCart | null }>(CART_QUERY, { cartId })
      if (result.data?.cart) {
        setCart(result.data.cart)
      } else {
        clearCartId()
        setCart(null)
      }
    } catch {
      clearCartId()
      setCart(null)
    }
  }, [])

  useEffect(() => { loadCart() }, [loadCart])

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setLoading(true)
    try {
      let cartId = getStoredCartId()
      if (!cartId) {
        const result = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>(
          CART_CREATE_MUTATION,
          { input: { lines: [{ merchandiseId: variantId, quantity }] } }
        )
        const newCart = result.data.cartCreate.cart
        storeCartId(newCart.id)
        setCart(newCart)
      } else {
        const result = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>(
          CART_ADD_LINE_MUTATION,
          { cartId, lines: [{ merchandiseId: variantId, quantity }] }
        )
        setCart(result.data.cartLinesAdd.cart)
      }
    } catch (err) {
      console.error('Failed to add to cart:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const removeFromCart = useCallback(async (lineId: string) => {
    const cartId = getStoredCartId()
    if (!cartId) return
    setLoading(true)
    try {
      const result = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>(
        CART_REMOVE_LINE_MUTATION,
        { cartId, lineIds: [lineId] }
      )
      setCart(result.data.cartLinesRemove.cart)
    } catch (err) {
      console.error('Failed to remove from cart:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <CartContext.Provider value={{
      cart,
      itemCount: cart?.totalQuantity ?? 0,
      checkoutUrl: cart?.checkoutUrl ?? null,
      loading,
      addToCart,
      removeFromCart,
      refreshCart: loadCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
