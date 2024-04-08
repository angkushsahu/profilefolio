import type { CreateProjectType, ProjectType } from "~/validations";

export type CreateProjectProps = {
   title: "Create";
   values: CreateProjectType;
};

export type UpdateProjectProps = {
   title: "Update";
   values: ProjectType;
};

export type ProjectModalProps = CreateProjectProps | UpdateProjectProps;
