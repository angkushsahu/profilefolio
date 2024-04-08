import type { CreateSkillType, SkillType } from "~/validations";

export type CreateSkillProps = {
   title: "Create";
   values: CreateSkillType;
};

export type UpdateSkillProps = {
   title: "Update";
   values: SkillType;
};

export type SkillModalProps = CreateSkillProps | UpdateSkillProps;
