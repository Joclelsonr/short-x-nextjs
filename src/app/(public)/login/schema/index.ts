import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(128, "A senha não pode exceder 128 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
