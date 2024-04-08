"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "~/components";
import { type ForgotPasswordType, forgotPasswordSchema } from "~/validations";
import { api } from "~/trpc/react";

export default function ForgotPasswordForm() {
   const forgotPasswordForm = useForm<ForgotPasswordType>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: { email: "" },
   });

   const { mutate: forgotPassword, isLoading } = api.auth.forgotPassword.useMutation({
      onSuccess(data) {
         toast({ title: data.message });
         forgotPasswordForm.reset();
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onForgotPassword(values: ForgotPasswordType) {
      if (isLoading) return;
      forgotPassword({ email: values.email, originUrl: window.location.origin });
   }

   return (
      <Form {...forgotPasswordForm}>
         <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPassword)} className="space-y-6">
            <FormField
               control={forgotPasswordForm.control}
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
            <Button type="submit" className="w-full" disabled={isLoading}>
               Submit
            </Button>
         </form>
      </Form>
   );
}
