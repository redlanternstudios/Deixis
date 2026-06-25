'use client'

import { useMemo } from 'react'
import type { ShopifyVariant } from '@/lib/shopify/types'

interface VariantSelectorProps {
  variants: ShopifyVariant[]
  selectedVariant: ShopifyVariant | null
  onSelect: (variant: ShopifyVariant) => void
}

export default function VariantSelector({ variants, selectedVariant, onSelect }: VariantSelectorProps) {
  const optionGroups = useMemo(() => {
    const groups: Record<string, Array<{ value: string; variant: ShopifyVariant }>> = {}
    for (const v of variants) {
      for (const opt of v.selectedOptions) {
        if (!groups[opt.name]) groups[opt.name] = []
        groups[opt.name].push({ value: opt.value, variant: v })
      }
    }
    return groups
  }, [variants])

  const optionNames = Object.keys(optionGroups)
  if (optionNames.length === 0) return null

  if (variants.length === 1) {
    return <div className="text-sm text-[var(--color-deixis-stone)] mb-4">{variants[0].title}</div>
  }

  return (
    <div className="space-y-4">
      {optionNames.map((name) => {
        const uniqueValues = Array.from(new Map(optionGroups[name].map((g) => [g.value, g])).values())
        return (
          <div key={name}>
            <label className="block text-xs tracking-widest uppercase text-[var(--color-deixis-stone)] mb-2">{name}</label>
            <div className="flex flex-wrap gap-2">
              {uniqueValues.map(({ value, variant }) => {
                const isSelected = selectedVariant?.id === variant.id
                const isAvailable = variant.availableForSale
                return (
                  <button
                    key={variant.id}
                    onClick={() => isAvailable && onSelect(variant)}
                    disabled={!isAvailable}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      isSelected
                        ? 'bg-[var(--color-deixis-black)] text-[var(--color-deixis-white)] border-[var(--color-deixis-black)]'
                        : isAvailable
                        ? 'border-[var(--color-deixis-stone)]/30 hover:border-[var(--color-deixis-black)] text-[var(--color-deixis-black)]'
                        : 'border-gray-100 text-gray-300 cursor-not-allowed line-through'
                    }`}
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
      {selectedVariant && (
        <div className="pt-2 border-t border-[var(--color-deixis-stone)]/10">
          <p className="text-sm text-[var(--color-deixis-stone)]">{selectedVariant.title}</p>
          <p className="font-serif text-xl mt-1">${parseFloat(selectedVariant.price.amount).toLocaleString()} {selectedVariant.price.currencyCode}</p>
        </div>
      )}
    </div>
  )
}
