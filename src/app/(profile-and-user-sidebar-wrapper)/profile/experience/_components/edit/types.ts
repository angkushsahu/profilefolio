import type { CreateExperienceType, ExperienceType } from "~/validations";

export type CreateExperienceProps = {
   title: "Create";
   values: CreateExperienceType;
};

export type UpdateExperienceProps = {
   title: "Update";
   values: ExperienceType;
};

export type ExperienceModalProps = CreateExperienceProps | UpdateExperienceProps;
