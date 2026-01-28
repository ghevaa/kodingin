import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "Kodingin - Professional Website Development & SaaS Solutions",
  description: "Transform your ideas into stunning, high-performance websites and SaaS applications. Expert web development, automation, and SEO services in Semarang, Indonesia.",
  keywords: ["web development", "website builder", "SaaS", "automation", "SEO", "Next.js", "React", "Semarang", "Indonesia", "kodingin"],
  authors: [{ name: "Kodingin" }],
  creator: "Kodingin",
  publisher: "Kodingin",
  metadataBase: new URL("https://kodingin.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kodingin.com",
    siteName: "Kodingin",
    title: "Kodingin - Professional Website Development & SaaS Solutions",
    description: "Transform your ideas into stunning, high-performance websites and SaaS applications. Expert web development, automation, and SEO services.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kodingin - Website Development & SaaS Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodingin - Professional Website Development & SaaS Solutions",
    description: "Transform your ideas into stunning, high-performance websites and SaaS applications.",
    images: ["/og-image.png"],
    creator: "@kodingin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "408CIn_edRwzxWqh7w1yBTFNVwDMYU5vo-BfHrgKLn4",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
