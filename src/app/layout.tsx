import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../global/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EncurtaURL - Encurtador de URLs Gratuito",
  description:
    "Encurte suas URLs gratuitamente, acompanhe cliques e estatísticas detalhadas. Crie códigos personalizados e QR codes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
