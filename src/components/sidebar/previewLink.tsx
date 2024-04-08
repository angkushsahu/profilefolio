"use client";

import { CustomLink, Skeleton } from "../ui";
import { api } from "~/trpc/react";

export default function PreviewLink() {
   const { data, error, isError, isLoading } = api.user.getUser.useQuery();
   if (isLoading) return <Skeleton className="h-5 w-14 bg-gray-600" />;
   if (isError) throw new Error(error.message);

   return (
      <CustomLink href={`/${data.user.username}`} target="_blank" rel="noopener noreferrer">
         Preview
      </CustomLink>
   );
}
