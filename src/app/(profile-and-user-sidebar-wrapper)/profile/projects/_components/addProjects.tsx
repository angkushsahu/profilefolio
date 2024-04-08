import { Plus } from "lucide-react";

import type { CreateProjectType } from "~/validations";
import { Button } from "~/components";
import ProjectModal from "./edit";

const defaultValues: CreateProjectType = {
   description: "",
   githubLink: "",
   projectLink: "",
   projectName: "",
   skills: "",
   startDate: { month: "", year: "" },
   endDate: { month: "", year: "" },
   currentlyWorking: false,
};

export default function AddProjects() {
   return (
      <ProjectModal title="Create" values={defaultValues}>
         <div className="flex justify-end">
            <Button>
               <Plus className="mr-2 size-5" />
               Add Project
            </Button>
         </div>
      </ProjectModal>
   );
}
