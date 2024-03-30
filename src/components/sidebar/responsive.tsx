"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { Button, Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui";
import Contents from "./contents";

export default function Responsive() {
   const [open, setOpen] = useState(false);

   return (
      <Sheet open={open} onOpenChange={setOpen} defaultOpen={false}>
         <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full border-[1px] border-neutral-600">
               <Menu />
            </Button>
         </SheetTrigger>
         <SheetContent>
            <SheetHeader />
            <aside className="flex h-full flex-col justify-between">
               <Contents setOpen={setOpen} />
            </aside>
         </SheetContent>
      </Sheet>
   );
}
