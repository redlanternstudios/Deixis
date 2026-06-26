"use client"

import Image from "next/image"
import Link from "next/link"

interface BrandedHeaderProps {
  /** Optional extra nav links rendered to the right of the wordmark */
  links?: Array<{ href: string; label: string }>
  /** Sub-label shown next to the DEIXIS wordmark, e.g. "/ artists" */
  subLabel?: string
}

export default function BrandedHeader({ links, subLabel }: BrandedHeaderProps) {
  return (
      <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
        {/* Wordmark + gyroscope mark */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/deixis-mark.png"
            alt="Deixis mark"
            width={32}
            height={32}
            className="flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity"
            priority
          />
          <span className="text-2xl font-title tracking-tight leading-none">
            DEIXIS
            {subLabel && (
              <span className="ml-1.5 text-xs text-gray-400 font-normal">{subLabel}</span>
            )}
          </span>
        </Link>

        {/* Optional nav links */}
        {links && links.length > 0 && (
          <nav className="flex gap-8 text-sm tracking-wide">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-deixis-blue transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
