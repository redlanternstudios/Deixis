import Link from "next/link"
import Image from "next/image"

export function BrandedHeader() {
  return (
    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <Image
        src="/deixis-mark.svg"
        alt="Deixis"
        width={28}
        height={28}
        priority
        className="flex-shrink-0"
      />
      <span className="text-lg font-serif font-semibold tracking-tight">DEIXIS</span>
    </Link>
  )
}
