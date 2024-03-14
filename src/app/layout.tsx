import "~/styles/globals.css";

import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";

import { Toaster, viewportMeta, webMeta } from "~/components";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/providers";
import { cn } from "~/lib";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport = viewportMeta;
export const metadata = webMeta;

export default function RootLayout({ children }: PropsWithChildren) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
            <TRPCReactProvider>
               <ThemeProvider>
                  <>{children}</>
               </ThemeProvider>
            </TRPCReactProvider>
            <Toaster />
         </body>
      </html>
   );
}
