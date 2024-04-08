import { notFound } from "next/navigation";
import type { Metadata } from "next";

import * as Component from "./_components";
import { api } from "~/trpc/server";
import { parseSlug } from "~/lib";

export async function generateMetadata({ params }: { params: unknown }): Promise<Metadata> {
   const slug = parseSlug(params);
   const response = await api.portfolio.verifyUsername.query({ username: slug });
   return { title: response?.user ? response.user.name : "User Profile" };
}

export default async function PortfolioPage({ params }: { params: unknown }) {
   const slug = parseSlug(params);
   const response = await api.portfolio.verifyUsername.query({ username: slug });
   if (!response?.user) notFound();

   const { user } = response;
   const portfolioDetails = await api.portfolio.getPortfolioInfo.query({
      userId: user.id,
      username: user.username,
   });
   const {
      info: { educations, experiences, profile, projects, skills },
   } = portfolioDetails;

   const headerProps = { nameOfUser: user.name, profilePic: profile?.profileSecureUrl };
   const heroProps = {
      nameOfUser: user.name,
      headline: profile?.headline ?? `Hello, this is ${user.name}`,
      currentPosition: profile?.currentPosition,
      profilePic: profile?.profileSecureUrl,
   };
   const aboutProps = {
      nameOfUser: user.name,
      location: profile?.location,
      phone: profile?.phone,
      about: profile?.about,
      websiteLinks: profile?.websiteLinks as Array<{ key: string; value: string }>,
      headline: profile?.headline ?? `Hello, this is ${user.name}`,
      currentPosition: profile?.currentPosition,
   };

   return (
      <>
         <Component.Header {...headerProps} />
         <main className="mx-auto max-w-7xl scroll-smooth px-5">
            <Component.Hero {...heroProps} />
            <Component.About {...aboutProps} />
            <Component.Skills skills={skills} />
            <Component.Experience experiences={experiences} />
            <Component.Projects projects={projects} />
            <Component.Education educations={educations} />
            <Component.Contact email={user.email} />
         </main>
      </>
   );
}
