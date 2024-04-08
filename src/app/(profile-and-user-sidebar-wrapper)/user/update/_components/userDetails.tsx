"use client";

import UpdateAccountForm from "./form";
import { api } from "~/trpc/react";
import Loading from "./loading";

export default function UserDetails({ userId }: { userId: string | undefined }) {
   const { data, error, isError, isLoading } = api.user.getUser.useQuery();
   if (isError) throw new Error(error.message);
   if (isLoading) return <Loading />;

   return <UpdateAccountForm email={data.user.email} name={data.user.name} username={data.user.username} userId={userId} />;
}
