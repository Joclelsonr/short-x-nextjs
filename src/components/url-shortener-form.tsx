"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Copy, QrCode, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { API_URL, BASE_URL } from "@/constants";

export const urlSchema = z.object({
  url: z.string().url("URL inválida").min(1, "URL é obrigatória"),
});

export type UrlSchema = z.infer<typeof urlSchema>;

interface UrlShortenerFormProps {
  user?: unknown;
}

export function UrlShortenerForm({ user }: UrlShortenerFormProps) {
  const [customCode, setCustomCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expiresAt, setExpiresAt] = useState<Date>();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const form = useForm<UrlSchema>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: UrlSchema) => {
    console.log("Form values:", values);

    const response = await fetch(`${API_URL}/urls/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: values.url }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Shortened URL response:", data);
      setShortenedUrl(`${BASE_URL}/${data.shortCode}`);
      setQrCodeUrl(data.qrCodeUrl);
      form.reset();
    } else {
      const errorData = await response.json();
      console.error("Error shortening URL:", errorData);
      toast.error(errorData.message || "Erro ao encurtar URL");
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortenedUrl);
    toast.success("URL encurtada copiada para a área de transferência");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Encurtar URL</CardTitle>
          <CardDescription>
            Cole sua URL longa aqui e obtenha um link curto instantaneamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Original</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://exemplo.com/sua-url-muito-longa"
                          type="url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="advanced"
                  checked={showAdvanced}
                  onCheckedChange={setShowAdvanced}
                  disabled={!user}
                />
                <Tooltip>
                  <TooltipTrigger>
                    <Label
                      htmlFor="advanced"
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Opções avançadas
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent></TooltipContent>
                </Tooltip>
              </div>

              {showAdvanced && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <div className="space-y-2">
                    <Label htmlFor="custom">
                      Código personalizado (opcional)
                    </Label>
                    <Input
                      id="custom"
                      placeholder="meu-link"
                      value={customCode}
                      onChange={(e) =>
                        setCustomCode(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "")
                        )
                      }
                    />
                    <p className="text-sm text-muted-foreground">
                      Deixe vazio para gerar automaticamente
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Título (opcional)</Label>
                    <Input
                      id="title"
                      placeholder="Título da sua URL"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição (opcional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Descrição da sua URL"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Data de expiração (opcional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {expiresAt
                            ? format(expiresAt, "PPP", { locale: ptBR })
                            : "Selecionar data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={expiresAt}
                          onSelect={setExpiresAt}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Encurtando..." : "Encurtar URL"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {shortenedUrl && (
        <Card>
          <CardHeader>
            <CardTitle>URL Encurtada</CardTitle>
            <CardDescription>Sua URL foi criada com sucesso!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={shortenedUrl} readOnly />
              <Button onClick={copyToClipboard} size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {qrCodeUrl && (
              <div className="flex flex-col items-center space-y-2">
                <Label className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  QR Code
                </Label>
                <Image
                  src={qrCodeUrl || "/placeholder.svg"}
                  alt="QR Code"
                  className="border rounded"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
