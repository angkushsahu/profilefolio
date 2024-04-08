"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { Button, Checkbox, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from "~/components";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast } from "~/components";
import { type CreateProjectType, createProject } from "~/validations";
import { useDates, useEndYearRange } from "~/hooks";
import type { ProjectModalProps } from "./types";
import { api } from "~/trpc/react";

export type ProjectFormProps = ProjectModalProps & { openModal: Dispatch<SetStateAction<boolean>> };

export default function ProjectForm(props: ProjectFormProps) {
   const utils = api.useUtils();
   const form = useForm<CreateProjectType>({ resolver: zodResolver(createProject), defaultValues: props.values });

   const { months, years } = useDates();
   const endDateYear = useEndYearRange({ getValues: form.getValues, watch: form.watch });

   const { mutate: createMutation, isLoading: creationLoading } = api.project.createProject.useMutation({
      async onSuccess(data) {
         await utils.project.getAllProjects.invalidate();
         toast({ title: data.message });
         form.reset();
         props.openModal(false);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   const { mutate: updateMutation, isLoading: updationLoading } = api.project.updateProject.useMutation({
      async onSuccess(data) {
         await utils.project.getAllProjects.invalidate();
         if (props.title === "Update") await utils.project.getProject.invalidate({ id: props.values.id });
         toast({ title: data.message });
         props.openModal(false);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onSubmit(values: CreateProjectType) {
      if (props.title === "Create") {
         if (creationLoading) return;
         createMutation(values);
      } else {
         if (updationLoading) return;
         updateMutation({ ...values, publicUrl: props.values.publicUrl, secureUrl: props.values.secureUrl, id: props.values.id });
      }
   }

   return (
      <section>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-6">
               <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Name of the project</FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Alphabet Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="projectLink"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Link to live project {"("}Optional but recommended{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. React, Node, System Design" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="githubLink"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Link to github repository {"("}Optional but recommended{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. React, Node, System Design" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Skills {"("}Optional but recommended{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. React, Node, System Design" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="flex gap-5 [&>*]:flex-1">
                  <FormField
                     control={form.control}
                     name="startDate.month"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Start Month {"("}Optional{")"}
                           </FormLabel>
                           <Select onValueChange={field.onChange}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select month" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {months.map((month) => (
                                    <SelectItem key={month} value={month}>
                                       {month}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="startDate.year"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>
                              Start Year {"("}Optional{")"}
                           </FormLabel>
                           <Select onValueChange={field.onChange}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {years.map((year) => (
                                    <SelectItem key={year} value={year}>
                                       {year}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div>
                  {form.watch("currentlyWorking") ? null : (
                     <div className="mb-3 flex gap-5 [&>*]:flex-1">
                        <FormField
                           control={form.control}
                           name="endDate.month"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>
                                    End Month {"("}Optional{")"}
                                 </FormLabel>
                                 <Select onValueChange={field.onChange}>
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select month" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       {months.map((month) => (
                                          <SelectItem key={month} value={month}>
                                             {month}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="endDate.year"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>
                                    End Year {"("}Optional{")"}
                                 </FormLabel>
                                 <Select onValueChange={field.onChange}>
                                    <FormControl>
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select year" />
                                       </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       {endDateYear.map((year) => (
                                          <SelectItem key={year} value={year}>
                                             {year}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  )}
                  <FormField
                     control={form.control}
                     name="currentlyWorking"
                     render={({ field }) => (
                        <FormItem className="flex items-end gap-x-4">
                           <FormControl>
                              <Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} />
                           </FormControl>
                           <FormLabel>Ongoing</FormLabel>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Description {"("}Optional{")"}
                        </FormLabel>
                        <FormControl>
                           <Textarea
                              className="h-28 resize-none"
                              placeholder="e.g. Describe about this project"
                              {...field}
                              value={field.value ?? ""}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" className="w-full" disabled={creationLoading || updationLoading}>
                  {props.title === "Create" ? "Add" : "Update"} Project
               </Button>
            </form>
         </Form>
      </section>
   );
}
