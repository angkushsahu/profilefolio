"use client";

import Link from "next/link";

import { ProfileDetailsLoading } from "./loading";
import ProfileImages from "./profileImages";
import DetailsForm from "./detailsForm";
import { api } from "~/trpc/react";

export type WebsiteLinkType = Array<{ key: string; value: string }>;

export default function ProfileDetails() {
   const { data, error, isError, isLoading } = api.profile.getProfile.useQuery();
   if (isError) throw new Error(error.message);
   if (isLoading) return <ProfileDetailsLoading />;

   return (
      <section>
         {/* banner and profile picture -- start */}
         {data?.profile ? <ProfileImages {...data.profile} /> : null}
         <section className="mb-8 mt-12">
            <div className="space-y-4">
               <div>
                  <p className="text-lg font-medium">Headline</p>
                  <p className="text-muted-foreground">{data?.profile.headline}</p>
               </div>
               {data?.profile.currentPosition ? (
                  <div>
                     <p className="text-lg font-medium">Current Position</p>
                     <p className="text-muted-foreground">{data.profile.currentPosition}</p>
                  </div>
               ) : null}
               {data?.profile.location ? (
                  <div>
                     <p className="text-lg font-medium">Location</p>
                     <p className="text-muted-foreground">{data.profile.location}</p>
                  </div>
               ) : null}
               {data?.profile.phone ? (
                  <div>
                     <p className="text-lg font-medium">Phone</p>
                     <p className="text-muted-foreground">{data?.profile.phone}</p>
                  </div>
               ) : null}
               {data?.profile.about ? (
                  <div>
                     <p className="mb-2 text-lg font-medium">About You</p>
                     <div className="space-y-4 text-muted-foreground">
                        {data.profile.about.split("\n").map((para, idx) => (
                           <p key={`About-para-${idx + 1}`}>{para}</p>
                        ))}
                     </div>
                  </div>
               ) : null}
               {data?.profile.websiteLinks ? (
                  <div>
                     <p className="mb-2 text-lg font-medium">Other websites</p>
                     <div className="space-y-1.5">
                        {(data.profile.websiteLinks as WebsiteLinkType)?.map(({ key, value }) => (
                           <p key={key}>
                              <span className="font-medium">{key}: </span>
                              <Link href={value} rel="noopener noreferrer" target="_blank" className="text-muted-foreground">
                                 {value}
                              </Link>
                           </p>
                        ))}
                     </div>
                  </div>
               ) : null}
            </div>
         </section>
         <DetailsForm
            currentPosition={data?.profile.currentPosition ?? ""}
            headline={data?.profile.headline ?? ""}
            location={data?.profile.location ?? ""}
            phone={data?.profile.phone ?? ""}
            about={data?.profile.about ?? ""}
            websiteLinks={(data?.profile.websiteLinks as WebsiteLinkType) ?? []}
            id={data?.profile.id ?? ""}
            publicUrl={""}
            secureUrl={""}
         />
      </section>
   );
}
