"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function Linkbutton({ url }: { url: { originalUrl: string } }) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
        <ExternalLink className="h-4 w-4" />
      </a>
    </Button>
  );
}
