"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "~/components";
import { type LoginType, loginSchema } from "~/validations";
import { accountUrl, forgotPasswordUrl } from "~/constants";
import { api } from "~/trpc/react";

export default function LoginForm() {
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl");

   const [showPassword, setShowPassword] = useState(false);

   const loginForm = useForm<LoginType>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "" },
   });

   const { mutate: loginUser, isLoading } = api.auth.login.useMutation({
      async onSuccess(data) {
         await signIn("credentials", { userId: data.userId, callbackUrl: callbackUrl ?? accountUrl });
         toast({ title: data.message });
         loginForm.reset();
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onLogin(values: LoginType) {
      if (isLoading) return;
      loginUser(values);
   }

   return (
      <Form {...loginForm}>
         <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
            <FormField
               control={loginForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Enter your e-mail</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. johndoe@gmail.com" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={loginForm.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Enter your password</FormLabel>
                     <div className="relative isolate">
                        <FormControl>
                           <Input
                              placeholder="Enter your password"
                              {...field}
                              type={showPassword ? "text" : "password"}
                              className="pr-10"
                           />
                        </FormControl>
                        <span
                           className="absolute left-auto right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                           onClick={() => setShowPassword((prev) => !prev)}
                        >
                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                     </div>
                     <FormMessage />
                     <div className="text-right">
                        <Link href={forgotPasswordUrl} className="text-xs text-muted-foreground">
                           Forgot Password ?
                        </Link>
                     </div>
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
               Login
            </Button>
         </form>
      </Form>
   );
}
