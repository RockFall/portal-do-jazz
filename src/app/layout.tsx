import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Portal Jazz BH — A cena jazzística de Belo Horizonte",
  description:
    "Descubra shows, artistas e lugares da cena jazzística de Belo Horizonte. Agenda atualizada, mapa de locais e feed cultural.",
  keywords: "jazz, belo horizonte, BH, shows, agenda, música ao vivo, cultura",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Jazz BH",
  },
  openGraph: {
    title: "Portal Jazz BH",
    description: "A agenda da cena jazzística de Belo Horizonte",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col bg-[#0a0a0a] text-[#e8e8e8]">
        <Header />
        {/* pb-16 leaves room for bottom nav on mobile */}
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <div className="hidden md:block">
          <Footer />
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
