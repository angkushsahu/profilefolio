"use client";

import { User } from "lucide-react";
import Image from "next/image";

import { api } from "~/trpc/react";
import { getDate } from "~/lib";
import Loading from "./loading";

export default function UserProfile() {
   const { data: userData, error: userError, isError: userIsError, isLoading: userLoading } = api.user.getUser.useQuery();
   const {
      data: profileData,
      error: profileError,
      isError: profileIsError,
      isLoading: profileLoading,
   } = api.profile.getProfile.useQuery();

   if (userIsError) throw new Error(userError.message);
   if (profileIsError) throw new Error(profileError.message);

   if (userLoading || profileLoading) return <Loading />;

   return (
      <section className="flex flex-col items-center justify-between gap-y-8 sm:flex-row">
         <section>
            {profileData.profile.profileSecureUrl ? (
               <Image
                  src={profileData.profile.profileSecureUrl}
                  alt="Profile Picture"
                  width={192}
                  height={192}
                  placeholder="empty"
                  loading="lazy"
                  className="rounded-full border-2"
               />
            ) : (
               <User className="size-48" strokeWidth="1" />
            )}
         </section>
         <section>
            <div className="space-y-2 text-center sm:text-left">
               <h1>{userData?.user.name}</h1>
               <p>@{userData?.user.username}</p>
               <p className="text-sm text-muted-foreground">{userData?.user.email}</p>
               <p className="text-sm text-muted-foreground">Joined on - {userData ? getDate(userData.user.createdAt) : null}</p>
            </div>
         </section>
      </section>
   );
}
