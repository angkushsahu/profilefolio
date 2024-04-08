import { ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { ProjectSchemaType } from "~/server/db/getSchema";
import { Button, UnderlinedHeading } from "~/components";

export interface ProjectsSectionProps {
   projects: Array<ProjectSchemaType>;
}

interface ProjectImageProps {
   secureUrl: string | null | undefined;
   projectName: string;
}

interface ProjectButtonProps {
   githubLink: string | null | undefined;
   projectLink: string | null | undefined;
}

interface ProjectDatesProps {
   startMonth: string | null | undefined;
   startYear: string | null | undefined;
   endMonth: string | null | undefined;
   endYear: string | null | undefined;
   currentlyWorking: boolean | null;
}

function ProjectImage({ secureUrl, projectName }: ProjectImageProps) {
   if (!secureUrl) return null;

   return (
      <div className="relative mb-5 aspect-[2/1] w-full rounded border">
         <Image src={secureUrl} fill alt={projectName} placeholder="empty" className="z-10 rounded object-contain" />
      </div>
   );
}

function ProjectButtons({ githubLink, projectLink }: ProjectButtonProps) {
   if (!githubLink || !projectLink) return null;

   return (
      <div className="my-3 flex flex-wrap items-center gap-4 py-2">
         {projectLink ? (
            <Link href={projectLink} target="_blank" rel="noopener noreferrer">
               <Button type="button">
                  <ExternalLink className="mr-2 size-4" /> <span className="text-xs">View Project</span>
               </Button>
            </Link>
         ) : null}
         {githubLink ? (
            <Link href={githubLink} target="_blank" rel="noopener noreferrer">
               <Button type="button" variant="secondary">
                  <GitBranch className="mr-2 size-4" /> <span className="text-xs">Visit Github</span>
               </Button>
            </Link>
         ) : null}
      </div>
   );
}

function ProjectDates(props: ProjectDatesProps) {
   const { currentlyWorking, endMonth, endYear, startMonth, startYear } = props;

   if (!startMonth && !startYear) return null;

   return (
      <p className="my-3">
         {startMonth}, {startYear} - {currentlyWorking ? "Present" : `${endMonth}, ${endYear}`}
      </p>
   );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
   return (
      <section className="pt-10" id="projects">
         <UnderlinedHeading>Projects</UnderlinedHeading>
         <div className="my-10 grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
               <article key={project.id} className="rounded-[8px] border p-5">
                  <ProjectImage projectName={project.projectName} secureUrl={project.secureUrl} />
                  <p className="text-xl font-semibold">{project.projectName}</p>
                  <ProjectButtons githubLink={project.githubLink} projectLink={project.projectLink} />
                  {project.skills ? (
                     <p className="my-2">
                        <span>Skills: </span>
                        <span className="text-muted-foreground">{project.skills}</span>
                     </p>
                  ) : null}
                  <ProjectDates {...project} />
                  {project.description ? (
                     <div className="mt-4 space-y-1.5">
                        {project.description.split("\n").map((para, idx) => (
                           <p className="text-muted-foreground" key={`${project.id}-Project-para-${idx + 1}`}>
                              {para}
                           </p>
                        ))}
                     </div>
                  ) : null}
               </article>
            ))}
         </div>
      </section>
   );
}
