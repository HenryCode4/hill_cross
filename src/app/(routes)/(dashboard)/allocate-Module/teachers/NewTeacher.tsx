"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { newAllocateModuleMutationFn, newTeacherMutationFn } from '@/lib/api';
import { useForm } from 'react-hook-form';
import { allocateModuleFormSchema, teacherFormSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import SelectComponent from '@/components/selectComponent';
import { useTeacherData } from '@/hooks/useSchool';
import useAcademicCalendarData from '@/hooks/useAcademicCalendar';
import useModuleData from '@/hooks/useModule';
import MultiSelectComponent from '@/components/multiSelectComponent';

const NewTeacher = () => {
     const queryClient = useQueryClient();
      const [modalOpen, setModalOpen] = useState(false);

      const {data: teacher} = useTeacherData();
      const {data: academicCalender} = useAcademicCalendarData()
      const {data: modules} = useModuleData()

      const teacherApi = teacher?.data?.data;
      const academicCalenderApi = academicCalender?.data?.data;
      const modulesApi = modules?.data?.data;

      console.log(academicCalenderApi)
      const teacherOption = teacherApi?.map((item: any)=> ({
        id: item.id,
        label: item.name
      }))
      const academicOption = academicCalenderApi?.map((item: any)=> ({
        id: item.id,
        label: item.name
      }))
      const modulesOption = modulesApi?.map((item: any)=> ({
        id: item.id,
        label: item.name
      }))

      const { mutate, isPending } = useMutation({
        mutationFn: newAllocateModuleMutationFn,
      });
    
      const form = useForm<z.infer<typeof allocateModuleFormSchema>>({
        resolver: zodResolver(allocateModuleFormSchema),
        defaultValues: {
          teacher_id: "",
          academic_calender_id: "",
          modules: [""],
        },
      });
    
      const onSubmit = (values: z.infer<typeof allocateModuleFormSchema>) => {
        mutate(values, {
          onSuccess: (response) => {
            // if (response.data.mfaRequired) {
            //   router.replace(`/verify-mfa?email=${values.email}`);
            //   return;
            // }
            queryClient.invalidateQueries({ queryKey: ['allocateModuleData'] });
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
    <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
          <p className="text-[24px] font-[600] leading-[29.05px]">Teachers Module</p>

          <Dialog>
      <DialogTrigger asChild>
      <Button className="h-[48px] w-[187px] bg-[#ED1000] text-[16px] font-[500]">
          Allocate Module
          </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="flex justify-center items-center w-full bg-[#FCF9F9] mt-3 p-2">
          <DialogTitle>Allocate Module</DialogTitle>
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
                              name="teacher_id" // or whatever field you want to bind this to
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel className="font-[600] text-[#1E1E1E]">
                                      Teacher
                                  </FormLabel>
                                  <FormControl>
                                      <SelectComponent
                                      items={teacherOption}
                                      placeholder="Select Teacher"
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
                            name="academic_calender_id" // or whatever field you want to bind this to
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="font-[600] text-[#1E1E1E]">
                                    Academic Calender
                                </FormLabel>
                                <FormControl>
                                    <SelectComponent
                                    items={academicOption}
                                    placeholder="Select Academic Calender"
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
                            name="modules" // or whatever field you want to bind this to
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="font-[600] text-[#1E1E1E]">
                                    Select Modules
                                </FormLabel>
                                <FormControl>
                                    <MultiSelectComponent
                                    items={modulesOption}
                                    placeholder="Select Modules"
                                    className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                                    onChange={(values) => {
                                      console.log('Selected values:', values);
                                      field.onChange(values)
                                    } } // Handle array of values
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
                                              Allocate Module
                                            </Button>
                                   
                            </div>
                          </DialogFooter>
                        </form>
                      </Form>
      </DialogContent>
    </Dialog>
        </div>
  )
}

export default NewTeacher