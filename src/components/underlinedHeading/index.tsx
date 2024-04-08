import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "~/lib";

export type UnderlinedHeadingProps = PropsWithChildren & HTMLAttributes<HTMLHeadElement>;

export function UnderlinedHeading({ children, className }: UnderlinedHeadingProps) {
   return (
      <h2 className={cn(className)}>
         <span className="relative after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-3/4 after:bg-primary">
            {children}
         </span>
      </h2>
   );
}
