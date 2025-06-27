"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteUrlButton({ url }: { url: { id: string } }) {
  const deleteUrl = async (id: string) => {
    const response = await fetch(`/api/url/${id}`, {
      method: "DELETE",
      next: { tags: ["urls"] },
    });
    if (response.ok) {
      const data = await response.json();
      toast.success(data.message);
    } else {
      toast.error("Erro ao excluir a URL.");
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={() => deleteUrl(url.id)}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
