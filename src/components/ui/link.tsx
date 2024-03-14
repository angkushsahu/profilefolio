import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

import { cn } from "~/lib";

export interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, PropsWithChildren {}

export function CustomLink({ children, className, href, ...props }: CustomLinkProps) {
   return (
      <Link
         href={href as Url}
         className={cn(
            "relative after:absolute after:left-0 after:top-[110%] after:h-0.5 after:w-3/4 after:rounded-full after:bg-primary after:transition-all hover:after:w-full",
            className
         )}
         {...props}
      >
         {children}
      </Link>
   );
}
