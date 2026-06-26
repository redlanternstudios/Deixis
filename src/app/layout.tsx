import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Deixis — Contemporary Art Gallery",
  description: "A curated consignment art gallery connecting collectors with emerging artists in Barrio Logan, San Diego.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/deixis-mark.png", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deixis.gallery",
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Deixis" />
        <link rel="apple-touch-icon" href="/deixis-mark.png" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
