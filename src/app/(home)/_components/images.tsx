import Image, { type StaticImageData } from "next/image";
import type { ImgHTMLAttributes } from "react";

import { cn } from "~/lib";

interface ImageBoxProps extends ImgHTMLAttributes<HTMLImageElement> {
   source: string | StaticImageData;
}

function ImageBox({ source, className }: ImageBoxProps) {
   return (
      <Image
         src={source}
         alt="Example"
         width={600}
         height={236}
         loading="lazy"
         placeholder="empty"
         className={cn("border-2", className)}
      />
   );
}

export default function HomeImages() {
   return (
      <div className="my-28 w-full">
         <div className="flex flex-col gap-8 overflow-hidden sm:p-20">
            <ImageBox
               source="https://res.cloudinary.com/dqu3uwiqt/image/upload/v1712581009/profilefolio/homeImages/hero-section_mzl9uw.jpg"
               className="-rotate-2"
            />
            <ImageBox
               source="https://res.cloudinary.com/dqu3uwiqt/image/upload/v1712581075/profilefolio/homeImages/about-section_ow7lf8.jpg"
               className="rotate-6 self-end"
            />
            <ImageBox
               source="https://res.cloudinary.com/dqu3uwiqt/image/upload/v1712581100/profilefolio/homeImages/skills-section_sg5mmf.jpg"
               className="-rotate-6"
            />
            <ImageBox
               source="https://res.cloudinary.com/dqu3uwiqt/image/upload/v1712581116/profilefolio/homeImages/experience-section_hnqam3.jpg"
               className="rotate-12 self-end"
            />
            <ImageBox
               source="https://res.cloudinary.com/dqu3uwiqt/image/upload/v1712581135/profilefolio/homeImages/project-section_nsskhe.jpg"
               className="rotate-6"
            />
            <ImageBox
               source="https://res.cloudinary.com/dqu3uwiqt/image/upload/v1712581154/profilefolio/homeImages/education-section_rkscsr.jpg"
               className="-rotate-2 self-end"
            />
         </div>
      </div>
   );
}
