"use client";

import type { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Checkbox, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from "~/components";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast } from "~/components";
import { type CreateEducationType, createEducation } from "~/validations";
import { useDates, useEndYearRange } from "~/hooks";
import type { EducationModalProps } from "./types";
import { api } from "~/trpc/react";

export type EducationFormProps = EducationModalProps & { openModal: Dispatch<SetStateAction<boolean>> };

export default function EducationForm(props: EducationFormProps) {
   const utils = api.useUtils();
   const form = useForm<CreateEducationType>({ resolver: zodResolver(createEducation), defaultValues: props.values });

   const { months, years } = useDates();
   const endDateYear = useEndYearRange({ getValues: form.getValues, watch: form.watch });

   const { mutate: createMutation, isLoading: creationLoading } = api.education.createEducation.useMutation({
      async onSuccess(data) {
         await utils.education.getAllEducations.invalidate();
         toast({ title: data.message });
         form.reset();
         props.openModal(false);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   const { mutate: updateMutation, isLoading: updationLoading } = api.education.updateEducation.useMutation({
      async onSuccess(data) {
         await utils.education.getAllEducations.invalidate();
         if (props.title === "Update") await utils.education.getEducation.invalidate({ id: props.values.id });
         toast({ title: data.message });
         props.openModal(false);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onSubmit(values: CreateEducationType) {
      if (props.title === "Create") {
         if (creationLoading) return;
         createMutation(values);
      } else {
         if (updationLoading) return;
         updateMutation({ ...values, id: props.values.id });
      }
   }

   return (
      <section>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-6">
               <FormField
                  control={form.control}
                  name="institute"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Institute Name</FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Indian Institute of Technology" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Degree {"("}Optional but recommended{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Bachelor of Techonology" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="fieldOfStudy"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Field of study {"("}Optional but recommended{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Computer Science" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Grade {"("}Optional but recommended{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Computer Science" {...field} value={field.value ?? ""} />
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
                           <FormLabel>Start Month</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                           <FormLabel>Start Year</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                 <FormLabel>End Month</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
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
                                 <FormLabel>End Year</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
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
                  name="activities"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Activities and socities {"("}Optional{")"}
                        </FormLabel>
                        <FormControl>
                           <Textarea
                              className="h-28 resize-none"
                              placeholder="e.g. Coding, Football"
                              {...field}
                              value={field.value ?? ""}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" className="w-full" disabled={creationLoading || updationLoading}>
                  {props.title === "Create" ? "Add" : "Update"} Education
               </Button>
            </form>
         </Form>
      </section>
   );
}
