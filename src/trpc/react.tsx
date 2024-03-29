"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { type PropsWithChildren, useState } from "react";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
   if (typeof window === "undefined") return createQueryClient();
   return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: PropsWithChildren) {
   const queryClient = getQueryClient();

   const [trpcClient] = useState(() =>
      api.createClient({
         transformer,
         links: [
            loggerLink({
               enabled: (op) => process.env.NODE_ENV === "development" || (op.direction === "down" && op.result instanceof Error),
            }),
            unstable_httpBatchStreamLink({
               url: getUrl(),
            }),
         ],
      })
   );

   return (
      <QueryClientProvider client={queryClient}>
         <api.Provider client={trpcClient} queryClient={queryClient}>
            {props.children}
         </api.Provider>
      </QueryClientProvider>
   );
}
