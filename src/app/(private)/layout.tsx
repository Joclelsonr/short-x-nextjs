import { Navbar } from "@/components/navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      {children}
    </main>
  );
}
