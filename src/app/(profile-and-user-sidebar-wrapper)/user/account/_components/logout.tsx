"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription } from "~/components";
import { AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, toast } from "~/components";
import { loginUrl } from "~/constants";

export default function Logout() {
   async function onLogout() {
      await signOut({ redirect: true, callbackUrl: loginUrl });
      toast({ title: "User logged out successfully" });
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <article className="cursor-pointer border border-destructive bg-card px-4 py-5 shadow-sm">
               <div className="flex items-center gap-x-3">
                  <LogOut className="size-7 text-muted-foreground" />{" "}
                  <span className="text-xl font-medium text-destructive">Logout</span>
               </div>
               <p className="ml-10 mt-3 text-muted-foreground">Logout of your account</p>
            </article>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>Are you sure you want to logout of your account ?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={onLogout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
