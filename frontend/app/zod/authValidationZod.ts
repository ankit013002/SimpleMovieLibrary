import * as z from "zod";

export const UserZodSchema = z.object({
  name: z.string().min(1),
  email: z
    .email()
    .regex(/\S+\@\S+\.\S+/)
    .lowercase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    ),
});
