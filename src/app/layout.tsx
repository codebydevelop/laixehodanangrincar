import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.laixehodanangrincar.com"),
  title: "Lái xe hộ Đà Nẵng Rincar",
  description: "Dịch vụ tài xế lái xe hộ an toàn, chuyên nghiệp tại Đà Nẵng. Đặt tài xế 24/7.",
  keywords: "lái xe hộ đà nẵng, tài xế lái xe hộ, thuê tài xế đà nẵng, rincar",
  verification: {
    google: "Y-hgzCVgoyKuD8o07QvdMWwwGMV17DW8OZa41o3eo78",
  },
  openGraph: {
    title: 'Lái xe hộ Đà Nẵng Rincar',
    description: 'Dịch vụ tài xế lái xe hộ an toàn, chuyên nghiệp tại Đà Nẵng. Đặt tài xế 24/7.',
    url: 'https://www.laixehodanangrincar.com',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Lái xe hộ Đà Nẵng Rincar",
              image: "https://www.laixehodanangrincar.com/images/logoRincar.png",
              "@id": "https://www.laixehodanangrincar.com",
              url: "https://www.laixehodanangrincar.com",
              telephone: "0906499078",
              address: {
                "@type": "PostalAddress",
                streetAddress: "37 Nguyễn Phan Vinh, Phường Sơn Trà",
                addressLocality: "Đà Nẵng",
                addressRegion: "Đà Nẵng",
                addressCountry: "VN"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 16.0544,
                longitude: 108.2022
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
