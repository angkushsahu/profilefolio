import { Pencil } from "lucide-react";

import type { EducationType } from "~/validations";
import ConfirmDeletion from "./confirmDeletion";
import { Button } from "~/components";
import EducationModal from "./edit";

export default function EducationBox(props: EducationType) {
   return (
      <article className="w-full max-w-md rounded border p-5">
         <div className="space-y-2">
            <h3>{props.institute}</h3>
            {props.degree || props.fieldOfStudy ? (
               <p>
                  {props.degree && props.fieldOfStudy
                     ? `${props.degree}, ${props.fieldOfStudy}`
                     : // eslint-disable-next-line
                       props.degree || props.fieldOfStudy}
               </p>
            ) : null}
            <p className="text-sm">
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
            {props.grade ? (
               <p>
                  <span>Grade:</span> <span className="text-muted-foreground">{props.grade}</span>
               </p>
            ) : null}
            {props.activities ? (
               <p className="text-sm leading-relaxed">
                  <span>Activities and Socities:</span> <span className="text-muted-foreground">{props.activities}</span>
               </p>
            ) : null}
         </div>
         <div className="mt-4 flex justify-end gap-4">
            <EducationModal title="Update" values={props}>
               <Button type="button" variant="outline" size="icon" className="rounded-full">
                  <Pencil className="size-4" />
               </Button>
            </EducationModal>
            <ConfirmDeletion id={props.id} />
         </div>
      </article>
   );
}
