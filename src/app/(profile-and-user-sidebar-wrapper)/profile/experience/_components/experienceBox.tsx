import { Pencil } from "lucide-react";

import type { ExperienceType } from "~/validations";
import ConfirmDeletion from "./confirmDeletion";
import { Button } from "~/components";
import ExperienceModal from "./edit";

export default function ExperienceBox(props: ExperienceType) {
   return (
      <article className="w-full max-w-md rounded border p-5">
         <div className="space-y-2">
            <h3>{props.companyName}</h3>
            <p>{props.jobTitle}</p>
            <p>
               <span>
                  {props.startDate.month}, {props.startDate.year}
               </span>
               {props.currentlyWorking ? (
                  <span> - Ongoing</span>
               ) : props.endDate ? (
                  <span>
                     {" "}
                     - {props.endDate?.month}, {props.endDate?.year}
                  </span>
               ) : null}
            </p>
            {props.industry ? <p className="text-sm text-muted-foreground">{props.industry}</p> : null}
            <p className="text-sm text-muted-foreground">{props.employmentType}</p>
            <p>
               {props.locationType}
               {props.location ? (
                  <>
                     {" "}
                     - <span className="text-muted-foreground">{props.location}</span>
                  </>
               ) : null}
            </p>
            {props.skills ? (
               <p>
                  <span>Skills:</span> <span className="text-muted-foreground">{props.skills}</span>
               </p>
            ) : null}
            {props.description ? (
               <p className="text-sm leading-relaxed">
                  <span>Description:</span> <span className="text-muted-foreground">{props.description}</span>
               </p>
            ) : null}
         </div>
         <div className="mt-4 flex justify-end gap-4">
            <ExperienceModal title="Update" values={props}>
               <Button type="button" variant="outline" size="icon" className="rounded-full">
                  <Pencil className="size-4" />
               </Button>
            </ExperienceModal>
            <ConfirmDeletion id={props.id} />
         </div>
      </article>
   );
}
