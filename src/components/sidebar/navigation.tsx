"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { profileEducationUrl, profileExperienceUrl, profileHomeUrl, profileProjectsUrl, profileSkillsUrl } from "~/constants";
import { cn } from "~/lib";

export default function Navigation() {
   const pathName = usePathname();

   const navLinks = [
      { title: "Home", path: profileHomeUrl, isActive: pathName === profileHomeUrl },
      { title: "Experience", path: profileExperienceUrl, isActive: pathName === profileExperienceUrl },
      { title: "Skills", path: profileSkillsUrl, isActive: pathName === profileSkillsUrl },
      { title: "Projects", path: profileProjectsUrl, isActive: pathName === profileProjectsUrl },
      { title: "Education", path: profileEducationUrl, isActive: pathName === profileEducationUrl },
   ];

   return (
      <nav className="flex flex-col gap-2">
         {navLinks.map((link) => (
            <Link
               key={link.title}
               href={link.path}
               className={cn("rounded px-3 py-2 transition-colors delay-75 hover:bg-primary/30", {
                  "bg-primary text-white": link.isActive,
               })}
            >
               {link.title}
            </Link>
         ))}
      </nav>
   );
}
