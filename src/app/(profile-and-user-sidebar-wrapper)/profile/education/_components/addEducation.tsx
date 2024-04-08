"use client";

import { Plus } from "lucide-react";

import type { CreateEducationType } from "~/validations";
import { Button } from "~/components";
import EducationModal from "./edit";

const defaultValues: CreateEducationType = {
   degree: "",
   fieldOfStudy: "",
   grade: "",
   institute: "",
   activities: "",
   endDate: { month: "", year: "" },
   startDate: { month: "", year: "" },
   currentlyWorking: false,
};

export default function AddEducation() {
   return (
      <EducationModal title="Create" values={defaultValues}>
         <div className="flex justify-end">
            <Button>
               <Plus className="mr-2 size-5" />
               Add Education
            </Button>
         </div>
      </EducationModal>
   );
}
