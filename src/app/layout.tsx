import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Lái xe hộ Đà Nẵng Rincar",
  description: "Dịch vụ tài xế lái xe hộ an toàn, chuyên nghiệp tại Đà Nẵng. Đặt tài xế 24/7.",
  keywords: "lái xe hộ đà nẵng, tài xế lái xe hộ, thuê tài xế đà nẵng, rincar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
