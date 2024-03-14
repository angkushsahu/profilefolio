import { accountUrl, homeUrl } from "~/constants";
import { ToggleTheme } from "./toggleTheme";
import Navigation from "./navigation";
import { CustomLink } from "../ui";

export default function Contents() {
   return (
      <>
         <section>
            <div className="mb-6">
               <CustomLink href={homeUrl} className="text-2xl font-semibold after:h-1">
                  ProfileFolio
               </CustomLink>
            </div>
            <Navigation />
         </section>
         <section>
            <div className="flex items-center justify-between text-sm">
               <CustomLink href="/" target="_blank" rel="noopener noreferrer">
                  Preview
               </CustomLink>
               <CustomLink href={accountUrl}>Account</CustomLink>
               <ToggleTheme />
            </div>
         </section>
      </>
   );
}
