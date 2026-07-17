import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lái xe hộ Đà Nẵng Rincar",
  description: "Dịch vụ tài xế lái xe hộ an toàn, chuyên nghiệp tại Đà Nẵng. Đặt tài xế 24/7.",
  keywords: "lái xe hộ đà nẵng, tài xế lái xe hộ, thuê tài xế đà nẵng, rincar",
  openGraph: {
    title: 'Lái xe hộ Đà Nẵng Rincar',
    description: 'Dịch vụ tài xế lái xe hộ an toàn, chuyên nghiệp tại Đà Nẵng. Đặt tài xế 24/7.',
    url: 'https://laixehodanangrincar.vercel.app',
    siteName: 'Rincar',
    images: [
      {
        url: '/images/logoRincar.png', // Force Zalo/Facebook to ignore cache and fetch the new logo
        width: 800,
        height: 800,
        alt: 'Dịch vụ Lái Xe Hộ Rincar',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
