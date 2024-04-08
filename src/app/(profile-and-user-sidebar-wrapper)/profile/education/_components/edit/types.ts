import type { CreateEducationType, EducationType } from "~/validations";

export type CreateEducationProps = {
   title: "Create";
   values: CreateEducationType;
};

export type UpdateEducationProps = {
   title: "Update";
   values: EducationType;
};

export type EducationModalProps = CreateEducationProps | UpdateEducationProps;
