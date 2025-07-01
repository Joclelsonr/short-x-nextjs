"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/input-password";
import { loginSchema, LoginSchema } from "../schema";
import { LoaderIcon } from "lucide-react";

export function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: LoginSchema) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      form.reset();
      redirect("/dashboard");
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      toast.error(errorData.message || "Erro ao fazer login");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jhondoe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <InputPassword<LoginSchema> control={form.control} name="password" />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderIcon className="animate-spin h-5 w-5" />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
