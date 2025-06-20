import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must not exceed 128 characters"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
