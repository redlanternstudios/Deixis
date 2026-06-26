import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Deixis — Contemporary Art Gallery",
  description: "A curated consignment art gallery connecting collectors with emerging artists in Barrio Logan, San Diego.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/deixis-mark.png", type: "image/png" },
    ],
    apple: [{ url: "/deixis-mark.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deixisgallery.com",
    title: "Deixis — Contemporary Art Gallery",
    description: "A curated consignment art gallery connecting collectors with emerging artists in Barrio Logan, San Diego.",
    siteName: "Deixis",
    images: [
      {
        url: "/deixis-mark.png",
        width: 600,
        height: 600,
        alt: "Deixis Gallery Mark",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deixis — Contemporary Art Gallery",
    description: "A curated consignment art gallery connecting collectors with emerging artists in Barrio Logan, San Diego.",
    images: ["/deixis-mark.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Deixis",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
