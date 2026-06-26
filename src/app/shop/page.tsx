"use client"

import { useState } from "react"
import BrandedHeader from "@/components/branded-header"

const NAV_LINKS = [
  { href: "/shop", label: "SHOP" },
  { href: "/salon", label: "SALON" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
]

type Medium = "All" | "Painting" | "Photography" | "Print" | "Sculpture"
type PriceRange = "All" | "Under $500" | "$500–$2,000" | "$2,000+"

interface Artwork {
  id: number
  title: string
  artist: string
  medium: Exclude<Medium, "All">
  price: number
  dimensions: string
  aspectRatio: string
  bgTone: string
}

const ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: "Puente Rojo",
    artist: "Carmen Villanueva",
    medium: "Painting",
    price: 1800,
    dimensions: '36" × 48"',
    aspectRatio: "aspect-[3/4]",
    bgTone: "bg-[#D9CFC4]",
  },
  {
    id: 2,
    title: "Logans Vigil",
    artist: "Marcus Adefope",
    medium: "Photography",
    price: 450,
    dimensions: '20" × 24"',
    aspectRatio: "aspect-[4/5]",
    bgTone: "bg-[#C8C4BC]",
  },
  {
    id: 3,
    title: "Tierra y Cielo",
    artist: "Rosa Mendez",
    medium: "Print",
    price: 280,
    dimensions: '18" × 24"',
    aspectRatio: "aspect-square",
    bgTone: "bg-[#E2D8CC]",
  },
  {
    id: 4,
    title: "Border Frequencies",
    artist: "Teo Ramirez",
    medium: "Sculpture",
    price: 3400,
    dimensions: '12" × 8" × 8"',
    aspectRatio: "aspect-[3/4]",
    bgTone: "bg-[#BFBAB3]",
  },
  {
    id: 5,
    title: "Mural Study No. 7",
    artist: "Carmen Villanueva",
    medium: "Painting",
    price: 920,
    dimensions: '24" × 30"',
    aspectRatio: "aspect-[4/5]",
    bgTone: "bg-[#CCC5B9]",
  },
  {
    id: 6,
    title: "Sixth Street",
    artist: "Marcus Adefope",
    medium: "Photography",
    price: 600,
    dimensions: '16" × 20"',
    aspectRatio: "aspect-square",
    bgTone: "bg-[#D4CEC6]",
  },
]

function priceInRange(price: number, range: PriceRange): boolean {
  if (range === "All") return true
  if (range === "Under $500") return price < 500
  if (range === "$500–$2,000") return price >= 500 && price <= 2000
  return price > 2000
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price)
}

export default function ShopPage() {
  const [selectedMedium, setSelectedMedium] = useState<Medium>("All")
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>("All")
  const [activeId, setActiveId] = useState<number | null>(null)

  const mediums: Medium[] = ["All", "Painting", "Photography", "Print", "Sculpture"]
  const priceRanges: PriceRange[] = ["All", "Under $500", "$500–$2,000", "$2,000+"]

  const filtered = ARTWORKS.filter(
    (a) =>
      (selectedMedium === "All" || a.medium === selectedMedium) &&
      priceInRange(a.price, selectedPrice)
  )

  const activeArtwork = activeId !== null ? ARTWORKS.find((a) => a.id === activeId) : null

  return (
    <div className="min-h-screen bg-deixis-cream">
      <BrandedHeader links={NAV_LINKS} />

      {/* Page title */}
      <div className="max-w-6xl mx-auto px-8 pt-14 pb-8">
        <p className="text-xs tracking-[0.2em] uppercase text-deixis-gold mb-4">Available Works</p>
        <h1 className="font-title text-4xl">Shop</h1>
      </div>

      {/* Filter bar */}
      <div className="border-t border-b border-black/10 bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-4 flex flex-wrap gap-6 items-center">
          {/* Medium filter */}
          <div className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase">
            <span className="text-deixis-gray mr-1">Medium</span>
            {mediums.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMedium(m)}
                className={`px-3 py-1 border transition-colors ${
                  selectedMedium === m
                    ? "bg-deixis-black text-white border-deixis-black"
                    : "border-black/20 text-deixis-gray hover:border-deixis-black hover:text-deixis-black"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-black/15 hidden md:block" />

          {/* Price filter */}
          <div className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase">
            <span className="text-deixis-gray mr-1">Price</span>
            {priceRanges.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedPrice(r)}
                className={`px-3 py-1 border transition-colors ${
                  selectedPrice === r
                    ? "bg-deixis-black text-white border-deixis-black"
                    : "border-black/20 text-deixis-gray hover:border-deixis-black hover:text-deixis-black"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {filtered.length === 0 ? (
          <p className="text-deixis-gray text-sm py-16 text-center">No works match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((artwork) => (
              <article
                key={artwork.id}
                className="group cursor-pointer"
                onClick={() => setActiveId(artwork.id)}
              >
                <div
                  className={`${artwork.aspectRatio} ${artwork.bgTone} overflow-hidden mb-4 flex items-end`}
                >
                  <div className="w-full p-3 bg-white/0 group-hover:bg-white/10 transition-colors" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-title text-base leading-snug">{artwork.title}</p>
                    <p className="text-xs text-deixis-gray mt-0.5">{artwork.artist}</p>
                  </div>
                  <p className="font-title text-base shrink-0">{formatPrice(artwork.price)}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs tracking-[0.12em] uppercase border border-black/20 px-2 py-0.5 text-deixis-gray">
                    {artwork.medium}
                  </span>
                  <span className="text-xs text-deixis-gray">{artwork.dimensions}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Artwork detail modal */}
      {activeArtwork && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8"
          onClick={() => setActiveId(null)}
        >
          <div
            className="bg-deixis-cream max-w-2xl w-full flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${activeArtwork.aspectRatio} ${activeArtwork.bgTone} md:w-1/2 shrink-0`} />
            <div className="p-8 flex flex-col gap-4 justify-between">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-deixis-gold mb-3">{activeArtwork.medium}</p>
                <h2 className="font-title text-3xl mb-1">{activeArtwork.title}</h2>
                <p className="text-deixis-gray text-sm mb-6">{activeArtwork.artist}</p>
                <p className="font-title text-2xl mb-2">{formatPrice(activeArtwork.price)}</p>
                <p className="text-xs text-deixis-gray">{activeArtwork.dimensions}</p>
              </div>
              <div className="flex flex-col gap-3">
                <button className="bg-deixis-black text-white px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-deixis-gray transition-colors">
                  INQUIRE ABOUT THIS WORK
                </button>
                <button
                  onClick={() => setActiveId(null)}
                  className="text-xs text-deixis-gray tracking-wide underline underline-offset-2 text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-black/10 px-8 py-8 text-center text-xs text-deixis-gray tracking-wide">
        © 2026 Deixis Gallery. Barrio Logan, San Diego.
      </footer>
    </div>
  )
}
