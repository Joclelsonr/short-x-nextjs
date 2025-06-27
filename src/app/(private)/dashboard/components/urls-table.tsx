"use client";

import { useState } from "react";
import { formatDateBRL } from "@/lib/format-date.brl";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DeleteUrlButton } from "./delete-url-button";
import { CopyToClipButton } from "./copy-to-clip-button";
import { StaticsDialog } from "./statics-dialog";
import { Linkbutton } from "./link-button";
import { REDIRECT_URL } from "@/constants";
import { Url } from "@/types";

type UrlsTableProps = {
  urls: Url[];
};

export function UrlsTable({ urls }: UrlsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUrls = urls?.filter(
    (url) =>
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <Input
          placeholder="Buscar URLs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {filteredUrls.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm
              ? "Nenhuma URL encontrada."
              : "Você ainda não criou nenhuma URL."}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL Original</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Cliques</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUrls.map((url) => (
              <TableRow key={url.id}>
                <TableCell>
                  <div className="max-w-xs">
                    <div className="font-medium truncate">
                      {url.originalUrl}
                    </div>
                    {url.originalUrl && (
                      <div className="text-sm text-muted-foreground truncate">
                        {`${REDIRECT_URL}/${url.shortUrl}`}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    {url.shortUrl}
                  </code>
                </TableCell>
                <TableCell>{url.clicks}</TableCell>
                <TableCell>{formatDateBRL(url.createdAt)}</TableCell>
                <TableCell>
                  {url.deletedAt && new Date(url.deletedAt) ? (
                    <Badge variant="destructive">Expirada</Badge>
                  ) : (
                    <Badge variant="default">Ativa</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <CopyToClipButton url={url} />

                    <Linkbutton url={url} />

                    <StaticsDialog url={url} />

                    <DeleteUrlButton url={url} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
