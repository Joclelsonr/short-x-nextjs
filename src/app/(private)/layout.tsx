import { Navbar } from "@/components/navbar";
import "../../global/globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      {children}
    </main>
  );
}
