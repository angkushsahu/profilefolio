import { z } from "zod";

export const registerSchema = z
   .object({
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
      password: z.string().min(1, { message: "Required field" }).max(16, { message: "Cannot exceed 16 characters" }),
      confirmPassword: z.string().min(1, { message: "Required field" }).max(16, { message: "Cannot exceed 16 characters" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export type RegisterType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
   email: z
      .string()
      .min(1, { message: "Required field" })
      .email({ message: "Please enter a valid e-mail" })
      .max(200, { message: "Cannot exceed 200 characters" }),
   password: z.string().min(1, { message: "Required field" }).max(16, { message: "Cannot exceed 16 characters" }),
});

export type LoginType = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
   email: z
      .string()
      .min(1, { message: "Required field" })
      .email({ message: "Please enter a valid e-mail" })
      .max(200, { message: "Cannot exceed 200 characters" }),
});

export const forgotPasswordTrpcSchema = z.intersection(forgotPasswordSchema, z.object({ originUrl: z.string() }));

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
   .object({
      password: z.string().min(1, { message: "Required field" }).max(16, { message: "Cannot exceed 16 characters" }),
      confirmPassword: z.string().min(1, { message: "Required field" }).max(16, { message: "Cannot exceed 16 characters" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export const resetPasswordTrpcSchema = z.intersection(resetPasswordSchema, z.object({ resetId: z.string() }));
