"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { CalendarIcon, Copy, LoaderIcon, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { REDIRECT_URL } from "@/constants";
import { User } from "@/types";

export const urlSchema = z.object({
  url: z.string().url("URL inválida").min(1, "URL é obrigatória"),
  title: z.string().optional(),
  description: z.string().optional(),
  expiresAt: z
    .date()
    .optional()
    .refine((date) => !date || date > new Date(), {
      message: "A data de expiração deve ser no futuro",
    }),
});

export type UrlSchema = z.infer<typeof urlSchema>;

interface UrlShortenerFormProps {
  user?: User;
}

export function UrlShortenerForm({ user }: UrlShortenerFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");

  const form = useForm<UrlSchema>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async (values: UrlSchema) => {
    const response = await fetch("api/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: values.url }),
    });
    if (response.ok) {
      const data = await response.json();
      setShortenedUrl(`${REDIRECT_URL}/${data.shortCode}`);
      form.reset();
    } else {
      const errorData = await response.json();
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
                  <TooltipContent>
                    <p>
                      Para usuários registrados: personalize seu link, adicione
                      título, descrição e defina uma data de expiração.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {showAdvanced && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Título da sua URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição (opcional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descrição da sua URL"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="expiresAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de expiração (opcional)</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal bg-muted/50"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                                  {field.value
                                    ? format(field.value, "PPP", {
                                        locale: ptBR,
                                      })
                                    : "Selecionar data"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date <= new Date()}
                                locale={ptBR}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <LoaderIcon className="animate-spin h-5 w-5" />
                ) : (
                  "Encurtar URL"
                )}
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

            {/* {qrCodeUrl && (
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
            )} */}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
