"use client";

import type { UseFormReturn } from "react-hook-form";
import { Ban, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "~/components";
import { api } from "~/trpc/react";
import { cn } from "~/lib";

export interface UsernameProps {
   // eslint-disable-next-line
   registerForm: UseFormReturn<{ username: string } & any, any, undefined>;
   userId?: string;
}

export function Username({ registerForm, userId }: UsernameProps) {
   const [username, setUsername] = useState(registerForm.getValues("username") as string);
   const watchUsername = registerForm.watch("username") as string;

   useEffect(() => {
      const timeout = setTimeout(() => {
         setUsername(watchUsername);
      }, 750);
      return () => clearTimeout(timeout);
   }, [watchUsername]);

   const { data, isFetching, isError } = api.user.checkUniqueUsername.useQuery(
      { username, userId },
      { enabled: !!username, retry: 2 }
   );

   return (
      <FormField
         control={registerForm.control}
         name="username"
         render={({ field }) => (
            <FormItem>
               <FormLabel>User Name</FormLabel>
               <FormControl>
                  <Input placeholder="e.g. johndoe" {...field} />
               </FormControl>
               <FormDescription>Only numbers, letters and underscore is allowed</FormDescription>
               {/* eslint-disable-next-line */}
               <FormMessage className={cn({ "text-green-500": data?.success || isFetching, "text-destructive": isError })}>
                  {isFetching ? (
                     "Loading ...."
                  ) : data?.success ? (
                     <span className="flex items-center gap-2">
                        <CheckCircle className="size-5" /> {username} is available
                     </span>
                  ) : isError ? (
                     <span className="flex items-center gap-2">
                        <Ban className="size-5" /> {username} is already taken
                     </span>
                  ) : null}
               </FormMessage>
            </FormItem>
         )}
      />
   );
}
