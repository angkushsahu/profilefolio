"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "~/components";
import { type ResetPasswordType, resetPasswordSchema } from "~/validations";
import { api } from "~/trpc/react";

export default function ResetPasswordForm({ resetId }: { resetId: string }) {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const resetPasswordForm = useForm<ResetPasswordType>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: { confirmPassword: "", password: "" },
   });

   const { mutate: resetPassword, isLoading } = api.auth.resetPassword.useMutation({
      onSuccess(data) {
         toast({ title: data.message });
         resetPasswordForm.reset();
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onResetPassword(values: ResetPasswordType) {
      if (isLoading) return;
      resetPassword({ ...values, resetId });
   }

   return (
      <Form {...resetPasswordForm}>
         <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-6">
            <FormField
               control={resetPasswordForm.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Enter a strong password</FormLabel>
                     <div className="relative isolate">
                        <FormControl>
                           <Input
                              placeholder="Enter a strong password"
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
                  </FormItem>
               )}
            />
            <FormField
               control={resetPasswordForm.control}
               name="confirmPassword"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Confirm password</FormLabel>
                     <div className="relative isolate">
                        <FormControl>
                           <Input
                              placeholder="Confirm password"
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              className="pr-10"
                           />
                        </FormControl>
                        <span
                           className="absolute left-auto right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                           onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                           {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                     </div>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
               Reset
            </Button>
         </form>
      </Form>
   );
}
