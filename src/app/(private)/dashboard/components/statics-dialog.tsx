"use client";

import { useState } from "react";
import { formatDateBRL } from "@/lib/format-date.brl";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { Url } from "@/types";

export function StaticsDialog({ url }: { url: Partial<Url> }) {
  const [selectedUrl, setSelectedUrl] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setSelectedUrl(url.originalUrl!);
          }}
        >
          <BarChart3 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Estatísticas da URL</DialogTitle>
          <DialogDescription>
            Visualize as estatísticas detalhadas da URL selecionada.
          </DialogDescription>
        </DialogHeader>
        {selectedUrl && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Informações Gerais</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">
                    Total de cliques:
                  </span>
                  <div className="font-semibold">{url.clicks}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Criada em:</span>
                  <div className="font-semibold">
                    {formatDateBRL(url.createdAt!)}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">QR Code</h3>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
