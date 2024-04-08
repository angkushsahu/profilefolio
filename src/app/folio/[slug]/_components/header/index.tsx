import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ToggleTheme } from "~/components";
import NavList from "./navList";

export interface HeaderProps {
   nameOfUser: string;
   profilePic: string | null | undefined;
}

export default function PortfolioHeader({ nameOfUser, profilePic }: HeaderProps) {
   return (
      <header className="sticky top-0 z-50 bg-background shadow-lg dark:shadow-gray-900">
         <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <Link href="#" className="flex items-center text-lg font-medium">
               {!profilePic ? (
                  <User className="size-6" />
               ) : (
                  <Image src={profilePic} alt={nameOfUser} width={35} height={35} className="rounded-full border-2" />
               )}
               <span className="ml-4 hidden sm:block">{nameOfUser}</span>
            </Link>
            <nav className="flex items-center gap-x-4">
               <ToggleTheme />
               <NavList />
            </nav>
         </div>
      </header>
   );
}
