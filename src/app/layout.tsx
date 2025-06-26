import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
