import { Plus } from "lucide-react";

import type { CreateExperienceType } from "~/validations";
import { Button } from "~/components";
import ExperienceModal from "./edit";

const defaultValues: CreateExperienceType = {
   companyName: "",
   description: "",
   employmentType: "",
   industry: "",
   jobTitle: "",
   location: "",
   locationType: "",
   skills: "",
   startDate: { month: "", year: "" },
   endDate: { month: "", year: "" },
   currentlyWorking: false,
};

export default function AddExperience() {
   return (
      <ExperienceModal title="Create" values={defaultValues}>
         <div className="flex justify-end">
            <Button>
               <Plus className="mr-2 size-5" />
               Add Experience
            </Button>
         </div>
      </ExperienceModal>
   );
}
