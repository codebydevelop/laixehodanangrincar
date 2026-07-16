import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingSocials />
    </>
  );
}
