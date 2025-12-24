import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SKK GANTO 30 - Recap Kita",
  description: "Galeri Recap SKK GANTO ANGKATAN 30.",
  keywords: ["gallery", "photo gallery", "google drive", "vault gallery"],
  authors: [{ name: "VaultGallery" }],
  openGraph: {
    title: "VaultGallery - Recap Kita",
    description: "Galeri foto dan video yang terintegrasi dengan Google Drive",
    type: "website",
  },
  icons: {
    icon: '/ICONE.png',
    shortcut: '/ICONE.png',
    apple: '/ICONE.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
