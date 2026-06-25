import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Deixis — Contemporary Art Gallery",
  description: "A curated consignment art gallery and online store. Barrio Logan, San Diego.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
