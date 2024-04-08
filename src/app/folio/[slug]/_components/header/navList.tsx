import { Menu } from "lucide-react";
import Link from "next/link";

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components";

const links = [
   { title: "Home", path: "" },
   { title: "About", path: "about" },
   { title: "Experience", path: "experience" },
   { title: "Project", path: "projects" },
   { title: "Skill", path: "skills" },
   { title: "Education", path: "education" },
   { title: "Contact", path: "contact" },
];

export default function NavList() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full border-[1px] border-neutral-600">
               <Menu className="size-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            {links.map(({ path, title }) => (
               <DropdownMenuItem key={title} asChild className="w-36">
                  <Link href={`#${path}`}>{title}</Link>
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
