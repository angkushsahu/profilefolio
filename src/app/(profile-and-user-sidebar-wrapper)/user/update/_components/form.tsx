"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "~/components";
import { type UpdateAccountType, updateAccountSchema } from "~/validations";
import { Username } from "~/components";
import { api } from "~/trpc/react";

export interface UpdateAccountFormProps {
   email: string;
   name: string;
   username: string;
   userId: string | undefined;
}

export default function UpdateAccountForm({ email, name, userId, username }: UpdateAccountFormProps) {
   const updateAccountForm = useForm<UpdateAccountType>({
      resolver: zodResolver(updateAccountSchema),
      defaultValues: { email, name, username },
   });

   const { mutate: updateAccount, isLoading } = api.user.updateUser.useMutation({
      async onSuccess(data) {
         toast({ title: data.message });
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onAccountUpdate(values: UpdateAccountType) {
      if (isLoading) return;
      updateAccount(values);
   }

   return (
      <Form {...updateAccountForm}>
         <form onSubmit={updateAccountForm.handleSubmit(onAccountUpdate)} className="space-y-6">
            <FormField
               control={updateAccountForm.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Full Name</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={updateAccountForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>User E-mail</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. johndoe@gmail.com" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Username registerForm={updateAccountForm} userId={userId} />
            <Button type="submit" className="w-full" disabled={isLoading}>
               Update
            </Button>
         </form>
      </Form>
   );
}
