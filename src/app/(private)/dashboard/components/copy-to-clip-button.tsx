"use client";

import { Button } from "@/components/ui/button";
import { REDIRECT_URL } from "@/constants";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function CopyToClipButton({ url }: { url: { shortUrl: string } }) {
  const copyToClipboard = async (shortCode: string) => {
    const url = `${REDIRECT_URL}/${shortCode}`;
    await navigator.clipboard.writeText(url);
    toast.success("URL copiada para a área de transferência.");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => copyToClipboard(url.shortUrl)}
    >
      <Copy className="h-4 w-4" />
    </Button>
  );
}
