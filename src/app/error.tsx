"use client";

import { Frown, RotateCcwIcon } from "lucide-react";
import { Button } from "~/components";

export interface ErrorProps {
   error: Error & { digest?: string };
   reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
   return (
      <main className="flex min-h-page flex-col items-center justify-center gap-y-6 p-5">
         <Frown size="200" strokeWidth="0.75" className="text-muted-foreground" />
         <h1 className="text-center">
            <span className="font-semibold">{error.name}</span> - {error.message}
         </h1>
         <Button type="button" onClick={reset} className="w-40">
            <RotateCcwIcon className="mr-2 h-4 w-4" /> Try again
         </Button>
      </main>
   );
}
