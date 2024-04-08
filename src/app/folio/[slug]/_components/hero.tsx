import Image from "next/image";

export interface HeroSectionProps {
   nameOfUser: string;
   headline: string;
   currentPosition: string | null | undefined;
   profilePic: string | null | undefined;
}

export default function HeroSection(props: HeroSectionProps) {
   const { currentPosition, headline, nameOfUser, profilePic } = props;

   return (
      <section className="flex items-center justify-center py-20" id="hero">
         <div className="max-w-[60ch] text-center">
            {profilePic ? (
               <div className="mb-10 flex items-center justify-center">
                  <Image src={profilePic} alt={nameOfUser} width={200} height={200} className="rounded-full border-2" />
               </div>
            ) : null}
            <h1>{nameOfUser}</h1>
            <p className="mt-8 text-xl leading-relaxed">{headline}</p>
            {currentPosition ? <p className="mt-5">{currentPosition}</p> : null}
         </div>
      </section>
   );
}
