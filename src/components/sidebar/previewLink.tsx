"use client";

import type { ToggleNavigationProps } from "./types";
import { CustomLink, Skeleton } from "../ui";
import { accountUrl } from "~/constants";
import { api } from "~/trpc/react";

export default function PreviewLink({ setOpen }: ToggleNavigationProps) {
   const { data, error, isError, isLoading } = api.user.getUser.useQuery();
   if (isError) throw new Error(error.message);

   function onLinkClickAction() {
      if (setOpen) setOpen(false);
   }

   return (
      <>
         {isLoading ? (
            <Skeleton className="h-5 w-14 bg-gray-600" />
         ) : (
            <CustomLink
               href={`/folio/${data.user.username}`}
               target="_blank"
               rel="noopener noreferrer"
               onClick={onLinkClickAction}
            >
               Preview
            </CustomLink>
         )}
         <CustomLink href={accountUrl} onClick={onLinkClickAction}>
            Account
         </CustomLink>
      </>
   );
}
