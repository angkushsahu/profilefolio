import { Suspense } from "react";

import ButtonLoading from "./_components/loadButton";
import HeroButton from "./_components/heroButton";
import HomeImages from "./_components/images";

function HeroSectionButton() {
   return (
      <Suspense fallback={<ButtonLoading />}>
         <HeroButton />
      </Suspense>
   );
}

export default function Home() {
   return (
      <main className="container min-h-screen">
         <section className="flex flex-col items-center py-20">
            <div className="mb-8 flex flex-col items-start sm:items-center">
               <h1 className="sm:text-center">ProfileFolio - Showcasing Your Journey</h1>
               <h2 className="mt-6 text-2xl font-medium text-muted-foreground sm:max-w-[50ch] sm:text-center">
                  Empowering Software Engineers to Curate Compelling Personal Narratives and Professional Portfolios.
               </h2>
            </div>
            <HeroSectionButton />
            <HomeImages />
            <div className="mb-8 flex flex-col items-start sm:items-center">
               <h1 className="sm:text-center">What are you waiting for ?</h1>
               <h2 className="mt-6 text-2xl font-medium text-muted-foreground sm:text-center">
                  Start making your portfolio right away
               </h2>
            </div>
            <HeroSectionButton />
         </section>
      </main>
   );
}
