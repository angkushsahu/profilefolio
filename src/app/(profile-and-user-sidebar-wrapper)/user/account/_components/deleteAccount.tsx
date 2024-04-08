"use client";

import { signOut } from "next-auth/react";
import { Trash2 } from "lucide-react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription } from "~/components";
import { AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, toast } from "~/components";
import { loginUrl } from "~/constants";
import { api } from "~/trpc/react";

export default function DeleteAccount() {
   const { mutate: deleteAccount, isLoading } = api.user.deleteUser.useMutation({
      async onSuccess(data) {
         await signOut({ redirect: true, callbackUrl: loginUrl });
         toast({ title: data.message });
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onAccountDeletion() {
      if (isLoading) return;
      deleteAccount();
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <article className="cursor-pointer border bg-destructive px-4 py-5 shadow-sm">
               <div className="flex items-center gap-x-3">
                  <Trash2 className="size-7 text-muted-foreground" /> <span className="text-xl font-medium">Delete Account</span>
               </div>
               <p className="ml-10 mt-3 text-muted-foreground">Please don{"'"}t leave us behind</p>
            </article>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={onAccountDeletion} disabled={isLoading}>
                  Delete my Account
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
