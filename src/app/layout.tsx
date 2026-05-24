import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Herbal Nusantara - Solusi Herbal Alami untuk Kesehatan Anda",
  description:
    "Temukan produk herbal alami berkualitas tinggi. Terdaftar BPOM, 100% bahan alami. Madu, kunyit, habbatussauda, dan banyak lagi.",
  keywords: [
    "herbal",
    "herbal alami",
    "produk herbal",
    "jamu",
    "kesehatan",
    "BPOM",
    "madu",
    "kunyit",
  ],
  authors: [{ name: "Herbal Nusantara" }],
  icons: {
    icon: "/favicon-32.png",
    shortcut: "/favicon-16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Herbal Nusantara - Solusi Herbal Alami untuk Kesehatan Anda",
    description:
      "Temukan produk herbal alami berkualitas tinggi. Terdaftar BPOM, 100% bahan alami.",
    siteName: "Herbal Nusantara",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Herbal Nusantara - Solusi Herbal Alami",
    description:
      "Temukan produk herbal alami berkualitas tinggi. Terdaftar BPOM, 100% bahan alami.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
