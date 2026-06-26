"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface BrandedHeaderProps {
  links?: Array<{ href: string; label: string }>
  subLabel?: string
}

export default function BrandedHeader({ links, subLabel }: BrandedHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/deixis-mark.png"
            alt="Deixis mark"
            width={28}
            height={28}
            className="flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity"
            priority
          />
          <span className="text-xl font-title tracking-tight leading-none">
            DEIXIS
            {subLabel && (
              <span className="ml-1.5 text-xs text-gray-400 font-normal font-body">{subLabel}</span>
            )}
          </span>
        </Link>

        {/* Desktop nav */}
        {links && links.length > 0 && (
          <nav className="hidden md:flex gap-8 text-xs tracking-[0.18em]">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-deixis-gold transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile hamburger */}
        {links && links.length > 0 && (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-full h-px bg-deixis-black transition-all duration-200 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-full h-px bg-deixis-black transition-all duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-full h-px bg-deixis-black transition-all duration-200 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Mobile nav drawer */}
      {links && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ${
            mobileOpen ? "max-h-96 border-t border-gray-100" : "max-h-0"
          }`}
        >
          <nav className="bg-white">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-4 text-xs tracking-[0.2em] border-b border-gray-100 hover:bg-[#F5F0E8] transition-colors uppercase"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
