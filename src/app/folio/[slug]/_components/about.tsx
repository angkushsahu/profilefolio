import Link from "next/link";

import { UnderlinedHeading } from "~/components";

export interface AboutSectionProps {
   nameOfUser: string;
   headline: string;
   location: string | null | undefined;
   phone: string | null | undefined;
   about: string | null | undefined;
   websiteLinks: Array<{ key: string; value: string }>;
   currentPosition: string | null | undefined;
}

export default function AboutSection(props: AboutSectionProps) {
   return (
      <section className="py-10" id="about">
         <UnderlinedHeading>About Me</UnderlinedHeading>
         <div className="flex flex-col gap-x-10 gap-y-2 lg:flex-row">
            <div>
               {props.about ? (
                  <div className="my-6 space-y-4 leading-relaxed">
                     {props.about?.split("\n").map((para, idx) => <p key={`About-me-para-${idx + 1}`}>{para}</p>)}
                  </div>
               ) : null}
            </div>
            <div className="space-y-4 lg:min-w-96">
               {props.location ? (
                  <div>
                     <p>Location</p>
                     <p className="mt-1 text-muted-foreground">{props.location}</p>
                  </div>
               ) : null}
               {props.phone ? (
                  <div>
                     <p>Phone</p>
                     <p className="mt-1 text-muted-foreground">{props.phone}</p>
                  </div>
               ) : null}
               {props.websiteLinks ? (
                  <div>
                     {props.websiteLinks.map((obj) => (
                        <p key={obj.key}>
                           <span>{obj.key}: </span>
                           <Link href={obj.value} target="_blank" rel="noopener noreferrer" className="text-muted-foreground">
                              {obj.value}
                           </Link>
                        </p>
                     ))}
                  </div>
               ) : null}
            </div>
         </div>
      </section>
   );
}
