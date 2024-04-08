import { z } from "zod";

export const usernameSchema = z.object({
   username: z.string().min(1, { message: "Required field" }).max(50, { message: "Cannot exceed 50 characters" }),
   userId: z.string().optional(),
});

export type UsernameType = z.infer<typeof usernameSchema>;

export const updateAccountSchema = z.object({
   name: z.string().min(1, { message: "Required field" }).max(100, { message: "Cannot exceed 100 characters" }),
   username: z
      .string()
      .min(1, { message: "Required field" })
      .regex(/^[a-zA-Z0-9_]+$/)
      .max(50, { message: "Cannot exceed 50 characters" }),
   email: z
      .string()
      .min(1, { message: "Required field" })
      .email({ message: "Please enter a valid e-mail" })
      .max(200, { message: "Cannot exceed 200 characters" }),
});

export type UpdateAccountType = z.infer<typeof updateAccountSchema>;

export const changePasswordSchema = z
   .object({
      oldPassword: z.string().min(1, { message: "Required field" }).max(16, { message: "Cannot exceed 16 characters" }),
      password: z.string().min(1, { message: "Required field" }).max(16, { message: "Cannot exceed 16 characters" }),
      confirmPassword: z.string().min(1, { message: "Required field" }).max(16, { message: "Cannot exceed 16 characters" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
