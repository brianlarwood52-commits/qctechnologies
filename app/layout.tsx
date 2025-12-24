import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PWARegister from "./pwa-register";
import InstallPWA from "@/components/InstallPWA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QC Technologies | Automotive LED Lights & Toolboxes | Bayswater WA",
  description: "Premium LED lights and trade toolboxes for trucks, 4WDs, caravans, and trailers. Located in Bayswater, Western Australia.",
  keywords: "LED lights, automotive lights, toolboxes, 4WD accessories, truck accessories, Bayswater WA",
  authors: [{ name: "QC Technologies" }],
  openGraph: {
    title: "QC Technologies | LED Lights & Toolboxes",
    description: "Premium LED lights and trade toolboxes for trucks, 4WDs, caravans, and trailers",
    type: "website",
    locale: "en_AU",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#dc2626",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-gray-950 text-gray-50`}
      >
        <PWARegister />
        <InstallPWA />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
