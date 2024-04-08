import { ToggleTheme } from "../toggleTheme";
import Responsive from "./responsive";
import { homeUrl } from "~/constants";
import { CustomLink } from "../ui";
import Contents from "./contents";

export function Sidebar() {
   return (
      <>
         <header className="sticky top-0 z-50 flex items-center justify-between bg-muted px-5 py-4 lg:hidden">
            <CustomLink href={homeUrl} className="text-xl font-semibold after:h-1">
               ProfileFolio
            </CustomLink>
            <div className="flex items-center gap-3 sm:gap-5">
               <ToggleTheme />
               <Responsive />
            </div>
         </header>
         <aside className="fixed bottom-0 left-0 top-0 hidden h-full w-full max-w-64 flex-col justify-between bg-muted p-5 lg:flex xl:max-w-xs">
            <Contents />
         </aside>
      </>
   );
}
