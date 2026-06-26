"use client"

import Link from "next/link"

/**
 * Inline SVG gyroscope mark — concentric orbital ellipses with a central dot.
 * Rendered in black on a transparent background, sized to 28px height.
 * No external file dependency.
 */
function GyroscopeMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      height="28"
      width="28"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      {/* Outer orbital ellipse — tilted ~30° */}
      <ellipse
        cx="14"
        cy="14"
        rx="12"
        ry="5"
        transform="rotate(-30 14 14)"
        stroke="black"
        strokeWidth="1.25"
        fill="none"
      />
      {/* Middle orbital ellipse — tilted ~30° the other way */}
      <ellipse
        cx="14"
        cy="14"
        rx="12"
        ry="5"
        transform="rotate(30 14 14)"
        stroke="black"
        strokeWidth="1.25"
        fill="none"
      />
      {/* Inner orbital ellipse — nearly vertical */}
      <ellipse
        cx="14"
        cy="14"
        rx="12"
        ry="5"
        transform="rotate(90 14 14)"
        stroke="black"
        strokeWidth="1.25"
        fill="none"
      />
      {/* Central dot */}
      <circle cx="14" cy="14" r="1.75" fill="black" />
    </svg>
  )
}

interface BrandedHeaderProps {
  /** Optional extra nav links rendered to the right of the wordmark */
  links?: Array<{ href: string; label: string }>
  /** Sub-label shown next to the DEIXIS wordmark, e.g. "/ artists" */
  subLabel?: string
}

export default function BrandedHeader({ links, subLabel }: BrandedHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Wordmark + gyroscope mark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <GyroscopeMark className="flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="text-xl font-title tracking-tight leading-none">
            DEIXIS
            {subLabel && (
              <span className="ml-1.5 text-xs text-gray-400 font-normal">{subLabel}</span>
            )}
          </span>
        </Link>

        {/* Optional nav links */}
        {links && links.length > 0 && (
          <nav className="flex gap-6 text-sm tracking-wide">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-600 hover:text-black transition-colors"
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
