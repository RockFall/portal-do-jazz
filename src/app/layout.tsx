import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Jazz BH — A cena jazzística de Belo Horizonte",
  description:
    "Descubra shows, artistas e lugares da cena jazzística de Belo Horizonte. Agenda atualizada, mapa de locais e feed cultural.",
  keywords: "jazz, belo horizonte, BH, shows, agenda, música ao vivo, cultura",
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
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
