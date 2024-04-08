import { ExternalLink, GitBranch, Pencil } from "lucide-react";
import Link from "next/link";

import type { ProjectType } from "~/validations";
import ConfirmDeletion from "../confirmDeletion";
import ProjectImage from "./projectImage";
import { Button } from "~/components";
import ProjectModal from "../edit";

export default function ProjectBox(props: ProjectType) {
   return (
      <article className="w-full max-w-md rounded-[8px] border p-5">
         <ProjectImage {...props} />
         <div className="mt-6 space-y-4">
            <h3>{props.projectName}</h3>
            {props.skills ? (
               <p>
                  <span>Skills:</span> <span className="text-muted-foreground">{props.skills}</span>
               </p>
            ) : null}
            {props.startDate || props.endDate ? (
               <p>
                  {props.startDate?.month && props.startDate.year ? (
                     <span>
                        {props.startDate?.month}, {props.startDate?.year}
                     </span>
                  ) : null}{" "}
                  {props.currentlyWorking ? (
                     <span> - Ongoing</span>
                  ) : props.endDate ? (
                     <>
                        - {props.endDate?.month}, {props.endDate?.year}
                     </>
                  ) : null}
               </p>
            ) : null}
            <div className="flex flex-wrap items-center gap-4 py-2">
               {props.projectLink ? (
                  <Link href={props.projectLink} target="_blank" rel="noopener noreferrer">
                     <Button type="button">
                        <ExternalLink className="mr-2 size-4" /> <span className="text-xs">View Project</span>
                     </Button>
                  </Link>
               ) : null}
               {props.githubLink ? (
                  <Link href={props.githubLink} target="_blank" rel="noopener noreferrer">
                     <Button type="button" variant="secondary">
                        <GitBranch className="mr-2 size-4" /> <span className="text-xs">Visit Github</span>
                     </Button>
                  </Link>
               ) : null}
            </div>
            {props.description ? (
               <div className="space-y-1.5">
                  <p>Description:</p>
                  {props.description.split("\n").map((para, idx) => (
                     <p key={`Project Description para ${idx + 1}`} className="text-sm text-muted-foreground">
                        {para}
                     </p>
                  ))}
               </div>
            ) : null}
         </div>
         <div className="mt-6 flex justify-end gap-4">
            <ProjectModal title="Update" values={props}>
               <Button type="button" variant="outline" size="icon" className="rounded-full">
                  <Pencil className="size-4" />
               </Button>
            </ProjectModal>
            <ConfirmDeletion id={props.id} />
         </div>
      </article>
   );
}
