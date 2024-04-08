import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
   return <main className="flex min-h-page flex-col items-center justify-center px-5 py-10">{children}</main>;
}
