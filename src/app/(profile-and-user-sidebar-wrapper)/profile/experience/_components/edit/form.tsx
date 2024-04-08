"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { Button, Checkbox, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from "~/components";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast } from "~/components";
import { type CreateExperienceType, createExperience } from "~/validations";
import { EMPLOYMENT_TYPE_VALUES, LOCATION_TYPE_VALUES } from "~/constants";
import type { ExperienceModalProps } from "./types";
import { useDates, useEndYearRange } from "~/hooks";
import { api } from "~/trpc/react";

const employmentTypeValues = EMPLOYMENT_TYPE_VALUES.filter((val) => val.length > 0);
const locationTypeValues = LOCATION_TYPE_VALUES.filter((val) => val.length > 0);

export type ExperienceFormProps = ExperienceModalProps & { openModal: Dispatch<SetStateAction<boolean>> };

export default function ExperienceForm(props: ExperienceFormProps) {
   const utils = api.useUtils();
   const form = useForm<CreateExperienceType>({ resolver: zodResolver(createExperience), defaultValues: props.values });

   const { months, years } = useDates();
   const endDateYear = useEndYearRange({ getValues: form.getValues, watch: form.watch });

   const { mutate: createMutation, isLoading: creationLoading } = api.experience.createExperience.useMutation({
      async onSuccess(data) {
         await utils.experience.getAllExperiences.invalidate();
         toast({ title: data.message });
         form.reset();
         props.openModal(false);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   const { mutate: updateMutation, isLoading: updationLoading } = api.experience.updateExperience.useMutation({
      async onSuccess(data) {
         await utils.experience.getAllExperiences.invalidate();
         if (props.title === "Update") await utils.experience.getExperience.invalidate({ id: props.values.id });
         toast({ title: data.message });
         props.openModal(false);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onSubmit(values: CreateExperienceType) {
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
                  name="companyName"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Name of the organisation</FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Alphabet Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Software Development Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="employmentType"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select Employment Type" />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              {employmentTypeValues.map((employment) => (
                                 <SelectItem key={employment} value={employment}>
                                    {employment}
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
                  name="locationType"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Location Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select Location Type" />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent>
                              {locationTypeValues.map((location) => (
                                 <SelectItem key={location} value={location}>
                                    {location}
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
                  name="location"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Job Location {"("}Optional{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. London, United Kingdom" {...field} value={field.value ?? ""} />
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
                  name="industry"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Industry {"("}Optional{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Information Technology and Services" {...field} value={field.value ?? ""} />
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
                           Skills {"("}Optional{")"}
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
                  name="description"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Description {"("}Optional{")"}
                        </FormLabel>
                        <FormControl>
                           <Textarea
                              className="h-28 resize-none"
                              placeholder="e.g. Describe about this experience"
                              {...field}
                              value={field.value ?? ""}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" className="w-full" disabled={creationLoading || updationLoading}>
                  {props.title === "Create" ? "Add" : "Update"} Experience
               </Button>
            </form>
         </Form>
      </section>
   );
}
