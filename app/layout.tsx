import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hitaesh.com"),
  title: "Hitaesh Saravanarajan | Software Engineer",
  description: "Computer engineering student and software engineer building reliable fullstack, cloud, and systems software.",
  openGraph: {
    type: "website",
    siteName: "Hitaesh Saravanarajan",
    title: "Hitaesh Saravanarajan | Software Engineer",
    description: "Computer engineering student and software engineer building reliable fullstack, cloud, and systems software.",
    images: [{ url: "/share-image", width: 1200, height: 630, alt: "Hitaesh Saravanarajan — Software Engineer, Computer Engineering at Purdue University" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hitaesh Saravanarajan | Software Engineer",
    description: "Computer engineering student and software engineer building reliable fullstack, cloud, and systems software.",
    images: [{ url: "/share-image", alt: "Hitaesh Saravanarajan — Software Engineer, Computer Engineering at Purdue University" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.classList.toggle('dark',localStorage.getItem('portfolio-theme')==='dark')}catch{}` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
