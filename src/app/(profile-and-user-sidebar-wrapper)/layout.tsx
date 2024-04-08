import type { PropsWithChildren } from "react";
import { Sidebar } from "~/components";

export default function Profile({ children }: PropsWithChildren) {
   return (
      <main className="lg:flex">
         <Sidebar />
         <div className="flex-1 px-5 py-8 lg:pl-72 xl:pl-[22rem]">{children}</div>
      </main>
   );
}
