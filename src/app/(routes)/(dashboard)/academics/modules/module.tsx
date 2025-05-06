"use client";

import { edit, trash } from "@/assets";
import ActionIcons from "@/components/action-icon";
import Header from "@/components/header";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader, Pencil } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import modules from "@/lib/modules.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AddNewModule from "./moduleTable";
import { moduleFormSchema } from "@/lib/schema";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newModuleMutationFn } from "@/lib/api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import SelectComponent from "@/components/selectComponent";
import useSemesterData from "@/hooks/useSemester";
import useStandardData from "@/hooks/useStandard";
import MultiSelectComponent from "@/components/multiSelectComponent";
import useQualificationData from "@/hooks/useQualification";

const ModuleComponent = () => {
    const queryClient = useQueryClient();

    const {data} = useSemesterData();
    const semesterApi = data?.data?.data;
      const semesterOptions = semesterApi?.map((school: { id: string; name: string }) => ({
        id: school.id,
        label: school.name
      }))

    const {data: standard} = useStandardData();
    const standardApi = standard?.data?.data;
      const standardOptions = standardApi?.map((school: { id: string; name: string }) => ({
        id: school.id,
        label: school.name
      }))

      const {data: qualification} = useQualificationData();
      const qualificationApi = qualification?.data?.data;
      const qualificationOptions = qualificationApi?.map((school: { id: string; name: string }) => ({
        id: school.id,
        label: school.name
      }))



    const [modalOpen, setModalOpen] = useState(false);
    const { mutate, isPending } = useMutation({
      mutationFn: newModuleMutationFn,
    });
  
    const form = useForm<z.infer<typeof moduleFormSchema>>({
      resolver: zodResolver(moduleFormSchema),
      defaultValues: {
        name: "",
        default_semester: true,
        semester_id: "",
        standard_id: "",
        qualifications: []
      },
    });
  
    const onSubmit = (values: z.infer<typeof moduleFormSchema>) => {
      mutate(values, {
        onSuccess: (response) => {
          // if (response.data.mfaRequired) {
          //   router.replace(`/verify-mfa?email=${values.email}`);
          //   return;
          // }
          queryClient.invalidateQueries({ queryKey: ['moduleData'] });
          toast({
              title: "Success",
              description: "Module added successfully",
              variant: "default",
            });
          setModalOpen(false);
        },
        onError: (error) => {
          console.log(error.message);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    };
  
  return (
    <>
      <div className="relative flex w-full flex-col bg-white">
        <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
          <p className="text-[20px] font-[600] leading-[29.05px] md:text-[24px]">
            Modules
          </p>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button className="header-button bg-[#ED1000] font-[500]">
                Add new modules
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
                <DialogTitle>Add New Module</DialogTitle>
                {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
              </DialogHeader>
               <Form {...form}>
                          <form className="flex flex-col gap-y-[16px]" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-[24px] px-6">
                              <div className="flex flex-col gap-y-[8px]">
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-[600] text-[#1E1E1E]">
                                        Module Name
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                                          placeholder="Name of school"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col gap-y-[8px]">
                                <FormField
                                  control={form.control}
                                  name="semester_id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-[600] text-[#1E1E1E]">
                                        Semester
                                      </FormLabel>
                                      <FormControl>
                                        <SelectComponent
                                        items={semesterOptions}
                                        placeholder="Select Semester"
                                        className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                                        onChange={field.onChange}
                                        />
                                    </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="flex flex-col gap-y-[8px]">
                                <FormField
                                  control={form.control}
                                  name="standard_id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-[600] text-[#1E1E1E]">
                                       Standard
                                      </FormLabel>
                                      <FormControl>
                                        <SelectComponent
                                        items={standardOptions}
                                        placeholder="Select Standard"
                                        className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                                        onChange={field.onChange}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>

                              <div className="flex flex-col gap-y-[8px]">
                                <FormField
                                  control={form.control}
                                  name="qualifications"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-[600] text-[#1E1E1E]">
                                        Qualification
                                      </FormLabel>
                                      <FormControl>
                                        <MultiSelectComponent
                                        items={qualificationOptions}
                                        placeholder="Select question"
                                        className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                                        onChange={field.onChange}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
              
                              
                            </div>
                            <DialogFooter className="px-6">
                              <div className="flex w-full items-center justify-center">
                             
                                              <Button
                                                className="h-[40px] w-[205px]"
                                                disabled={isPending}
                                                type="submit"
                                              >
                                                {isPending && <Loader className="animate-spin" />}
                                                Create Module
                                              </Button>
                                     
                              </div>
                            </DialogFooter>
                          </form>
                        </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full px-4">
          <div className="h-[8px] w-full bg-[#F8F8F8]" />
        </div>

        <AddNewModule />
      </div>

      {/* <Pagination /> */}

      
    </>
  );
};

export default ModuleComponent;
