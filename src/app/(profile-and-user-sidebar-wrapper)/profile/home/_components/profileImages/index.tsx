import { User } from "lucide-react";
import Image from "next/image";

import type { ProfileImagesProps } from "./types";
import UploadImages from "./uploadImages";

export default function ProfileImages(props: ProfileImagesProps) {
   return (
      <section className="flex flex-wrap items-center justify-center gap-6">
         <div className="mb-4">
            {props.profileSecureUrl ? (
               <Image
                  src={props.profileSecureUrl}
                  alt="Profile Picture"
                  width={192}
                  height={192}
                  placeholder="empty"
                  loading="lazy"
                  className="rounded-full border-2"
               />
            ) : (
               <User className="size-48" strokeWidth="1" />
            )}
         </div>
         <UploadImages {...props} />
      </section>
   );
}
