"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Dispatch, SetStateAction } from "react";
import { Plus, Trash } from "lucide-react";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, toast } from "~/components";
import { createProfile, type CreateProfileType, type IdValidationType, type ProfileType } from "~/validations";
import { api } from "~/trpc/react";

export type ProfileFormProps = ProfileType & IdValidationType & { openModal: Dispatch<SetStateAction<boolean>> };

export default function ProfileForm({ openModal, ...props }: ProfileFormProps) {
   const utils = api.useUtils();
   const form = useForm<CreateProfileType>({ resolver: zodResolver(createProfile), defaultValues: props });
   const { append, fields, remove } = useFieldArray({ control: form.control, name: "websiteLinks" });

   const { mutate, isLoading } = api.profile.updateProfile.useMutation({
      async onSuccess(data) {
         await utils.profile.getProfile.invalidate();
         toast({ title: data.message });
         openModal(false);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onSubmit(values: CreateProfileType) {
      if (isLoading) return;
      mutate({ ...values, id: props.id });
   }

   return (
      <section>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-6">
               <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Headline</FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Mern Stack Developer || React || Typescript" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="currentPosition"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Current Position {"("}Optional but recommended{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. SDE @ Alphabet Inc." {...field} value={field.value ?? ""} />
                        </FormControl>
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
                           Location {"("}Optional{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. Mumbai, Maharashtra" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>
                           Contact Number {"("}Optional{")"}
                        </FormLabel>
                        <FormControl>
                           <Input placeholder="e.g. 9988776655" {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Write about yourself</FormLabel>
                        <FormControl>
                           <Textarea
                              className="h-28 resize-none"
                              placeholder="e.g. With years of experience in MERN stack ...."
                              {...field}
                              value={field.value ?? ""}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <h3>Add Websites</h3>
               {fields.map((field, index) => (
                  <div key={field.id}>
                     <div className="flex gap-5 [&>*]:flex-1">
                        <FormField
                           control={form.control}
                           name={`websiteLinks.${index}.key`}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Website Platform</FormLabel>
                                 <FormControl>
                                    <Input placeholder="e.g. Linkedin" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name={`websiteLinks.${index}.value`}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Link</FormLabel>
                                 <FormControl>
                                    <Input placeholder="e.g. https://linkedin.com/...." {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <div className="flex items-center justify-end">
                        <Button
                           type="button"
                           variant="outline"
                           size="icon"
                           className="mt-2 rounded-full"
                           onClick={() => remove(index)}
                        >
                           <Trash className="size-4" />
                        </Button>
                     </div>
                  </div>
               ))}
               <Button type="button" variant="secondary" onClick={() => append({ key: "", value: "" })}>
                  <Plus className="mr-2 size-4" /> Add Website Link
               </Button>
               <Button type="submit" className="w-full" disabled={isLoading}>
                  Update Profile
               </Button>
            </form>
         </Form>
      </section>
   );
}
