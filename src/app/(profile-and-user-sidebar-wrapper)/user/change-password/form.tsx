"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "~/components";
import { changePasswordSchema, type ChangePasswordType } from "~/validations";
import { api } from "~/trpc/react";

export default function ChangePasswordForm() {
   const [showPassword, setShowPassword] = useState(false);
   const [showOldPassword, setShowOldPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const changePasswordForm = useForm<ChangePasswordType>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: { confirmPassword: "", oldPassword: "", password: "" },
   });

   const { mutate: changePassword, isLoading } = api.user.changePassword.useMutation({
      async onSuccess(data) {
         toast({ title: data.message });
         changePasswordForm.reset();
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onPasswordChange(values: ChangePasswordType) {
      if (isLoading) return;
      changePassword(values);
   }

   return (
      <Form {...changePasswordForm}>
         <form onSubmit={changePasswordForm.handleSubmit(onPasswordChange)} className="space-y-6">
            <FormField
               control={changePasswordForm.control}
               name="oldPassword"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Enter old password</FormLabel>
                     <div className="relative isolate">
                        <FormControl>
                           <Input
                              placeholder="Enter old password"
                              {...field}
                              type={showOldPassword ? "text" : "password"}
                              className="pr-10"
                           />
                        </FormControl>
                        <span
                           className="absolute left-auto right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                           onClick={() => setShowOldPassword((prev) => !prev)}
                        >
                           {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                     </div>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={changePasswordForm.control}
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
               control={changePasswordForm.control}
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
               Change
            </Button>
         </form>
      </Form>
   );
}
