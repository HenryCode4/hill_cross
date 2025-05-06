"use client"

import Header from "@/components/header";
import React, { useState } from "react";
import SelectPage from "../../student-mgt/_component/select";
import InputPage from "../../student-mgt/_component/input";
import { DatePickerDemo } from "@/components/datepicker";
import { toast } from "@/hooks/use-toast";
import { academicStaffSchema } from "../../../../../lib/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { createAcademicStaff } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DatePicker } from "@/components/date_pickerNew";
import { Button } from "@/components/ui/button";
import { Loader, Plus, Trash2 } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import useQualificationData from "@/hooks/useQualification";
import useRoleData from "@/hooks/useRoles";
import SelectComponent from "@/components/selectComponent";

const NewAcademicStaff = () => {
  // createAcademicStaff()
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const {data: qualificationData} = useQualificationData();
    const {data: roleData} = useRoleData();
    const qualificationApi = qualificationData?.data?.data;
    const roleApi = roleData?.data?.data;
  
        const qualificationOption = qualificationApi?.map((item: any)=> ({
          label: item.name,
          id: item.name
        }))
  
        const roleOption = roleApi?.map((item: any)=> ({
          label: item.name,
          id: item.name
        }))


  const { mutate, isPending } = useMutation({
    mutationFn: createAcademicStaff,
  });

  const form = useForm<z.infer<typeof academicStaffSchema>>({
    resolver: zodResolver(academicStaffSchema),
    defaultValues: {
      name: "",
      staff_id: "",
      email: "",
      phone_number: "",
      dob: "",
      gender: "",
      mode: "",
      position: "",
      password: "",
      re_password: "",
      qualification: "",
      address: "",
      role: "",
    },
  });

  // Setup field array for qualifications
  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "qualifications",
  // });

  // // Add new qualification field
  // const addQualification = () => {
  //   append({ id: "", level: "" });
  // };


  const onSubmit = (values: z.infer<typeof academicStaffSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["hrData"] });
        toast({
          title: "Success",
          description: "Staff created successfully",
          variant: "default",
        });
        setModalOpen(false);
        form.reset();
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
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header
        backIcon
        subTitle="Hr Management"
        title={"Add Non Academic Staff"}
        hideSearch
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-[24px] bg-white p-[24px]"
        >
          <p className="text-[24px] font-[500]">Personal Information</p>

         <div className="grid grid-cols-2 gap-x-[20px] gap-y-[24px]">
                     <FormField
                       control={form.control}
                       name="name"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Name<span className="text-[#930C02]">*</span></FormLabel>
                           <FormControl>
                             <input
                               {...field}
                               placeholder="Enter Name"
                               className="h-[43px] w-full rounded-[8px] border border-[#AACEC9] bg-[#FCF9F9] px-4 outline-none"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
         
                     <FormField
                       control={form.control}
                       name="staff_id"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Staff ID<span className="text-[#930C02] ">*</span></FormLabel>
                           <FormControl>
                             <input
                               {...field}
                               placeholder="Enter Staff ID"
                               className="h-[43px] w-full rounded-[8px] border border-[#AACEC9] bg-[#FCF9F9] px-4 outline-none"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="email"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Email<span className="text-[#930C02] ">*</span></FormLabel>
                           <FormControl>
                             <input
                               {...field}
                               placeholder="Enter email"
                               className="h-[43px] w-full rounded-[8px] border border-[#AACEC9] bg-[#FCF9F9] px-4 outline-none"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="phone_number"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Phone number<span className="text-[#930C02] ">*</span></FormLabel>
                           <FormControl>
                             <input
                               {...field}
                               placeholder="Enter phone number"
                               className="h-[43px] w-full rounded-[8px] border border-[#AACEC9] bg-[#FCF9F9] px-4 outline-none"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="dob"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Date of birth<span className="text-[#930C02] ">*</span></FormLabel>
                           <FormControl>
                             
                             <DatePicker
                             value={field.value}
                             onChange={field.onChange}
                           />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="gender"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormControl>
                           <SelectPage
                             data={["Male", "Female"]}
                             required="*"
                             title={"Gender"}
                             placeholder="Select Gender"
                             onChange={field.onChange}
                             value={field.value}
                             academic
                           />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="mode"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormControl>
                           <SelectPage
                             data={["Full Time", "Part Time"]}
                             required="*"
                             title={"Mode"}
                             placeholder="Select Mode"
                             onChange={field.onChange}
                             value={field.value}
                             academic
                           />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="position"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormControl>
                           <SelectPage
                             data={["Intern", "Lecturer"]}
                             required="*"
                             title={"Position"}
                             placeholder="Select Position"
                             onChange={field.onChange}
                             value={field.value}
                             academic
                           />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="qualification"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Select Qualification<span className="text-[#930C02] ">*</span></FormLabel>
                           
                           <FormControl>
                             <SelectComponent
                               items={qualificationOption}
                               placeholder="Select Qualification"
                               className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                               onChange={field.onChange}
                               />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="address"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Address<span className="text-[#930C02] ">*</span></FormLabel>
                           <FormControl>
                             <input
                               {...field}
                               placeholder="Enter address"
                               className="h-[43px] w-full rounded-[8px] border border-[#AACEC9] bg-[#FCF9F9] px-4 outline-none"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="role" 
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Select Role<span className="text-[#930C02] ">*</span></FormLabel>
                           
                           <FormControl>
                             <SelectComponent
                               items={roleOption}
                               placeholder="Select Role"
                               className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                               onChange={field.onChange}
                               />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="password"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Password<span className="text-[#930C02] ">*</span></FormLabel>
                           <FormControl>
                             <input
                               {...field}
                               // type="password"
                               placeholder="Enter password"
                               className="h-[43px] w-full rounded-[8px] border border-[#AACEC9] bg-[#FCF9F9] px-4 outline-none"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="re_password"
                       render={({ field }) => (
                         <FormItem className="col-span-2 xl:col-span-1">
                           <FormLabel className="text-[16px] font-[600]">Confirm Password<span className="text-[#930C02] ">*</span></FormLabel>
                           <FormControl>
                             <input
                               {...field}
                               // type="password"
                               placeholder="Enter Confirm Password"
                               className="h-[43px] w-full rounded-[8px] border border-[#AACEC9] bg-[#FCF9F9] px-4 outline-none"
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                   </div>
          
          {/* Qualifications Section */}
          {/* <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-[500]">Qualifications</h3>
              <Button 
                type="button" 
                onClick={addQualification}
                className="flex items-center gap-2 bg-[#ED1000] text-white"
              >
                <Plus size={16} /> Add Qualification
              </Button>
            </div>

            {fields.length === 0 && (
              <div className="text-gray-500 italic py-4 text-center">
                No qualifications added. Click the button above to add qualifications.
              </div>
            )}

            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md mb-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Qualification #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(index)}
                    className="h-8 w-8 p-0 text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`qualifications.${index}.id`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[16px] font-[600]">
                          ID<span className="text-[#930C02]">*</span>
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            placeholder="Enter Qualification ID"
                            className="h-[43px] w-full rounded-[8px] border border-[#AACEC9] bg-[#FCF9F9] px-4 outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`qualifications.${index}.level`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[16px] font-[600]">
                          Level<span className="text-[#930C02]">*</span>
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            placeholder="Enter Qualification Level"
                            className="h-[43px] w-full rounded-[8px] border border-[#AACEC9] bg-[#FCF9F9] px-4 outline-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div> */}

           <DialogFooter className="px-6">
                                    <div className="flex w-full items-center justify-center">
                                   
                                                    <Button
                                                      className="h-[40px] w-[205px]"
                                                      disabled={isPending}
                                                      type="submit"
                                                    >
                                                      {isPending && <Loader className="animate-spin" />}
                                                      Create Staff
                                                    </Button>
                                           
                                    </div>
                                  </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default NewAcademicStaff;
