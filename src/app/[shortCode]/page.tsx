import { redirect, notFound } from "next/navigation";
import { API_URL } from "@/constants";

interface PageProps {
  params: Promise<{ shortCode: string }>;
}

export default async function Page({ params }: PageProps) {
  const { shortCode } = await params;

  const response = await fetch(`${API_URL}/urls/${shortCode}`);
  if (!response.ok) notFound();

  const urlData = await response.json();
  redirect(urlData.originalUrl);
}
