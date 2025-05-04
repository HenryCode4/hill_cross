import SelectComponent from '@/components/selectComponent';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import useQualificationData from '@/hooks/useQualification';
import { createAcademicStaff } from '@/lib/api';
import { adminSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface AddAdminProps {
    tabAdmin: number | null;
}

const AddAdmin = ({tabAdmin}: AddAdminProps) => {

     const queryClient = useQueryClient();
    const {data: qualificationData} = useQualificationData();
        const qualificationApi = qualificationData?.data?.data;

        const qualificationOption = qualificationApi?.map((item: any)=> ({
            label: item.name,
            id: item.name
          }))
    

    const { mutate, isPending } = useMutation({
        mutationFn: createAcademicStaff,
      });
    
      const form = useForm<z.infer<typeof adminSchema>>({
        resolver: zodResolver(adminSchema),
        defaultValues: {
          name: "",
          email: "",
          staff_id: "",
          phone_number: "",
          password: "",
          re_password: "",
          qualification: ""
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
    
    
      const onSubmit = (values: z.infer<typeof adminSchema>) => {
        mutate(values, {
          onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["hrData"] });
            toast({
              title: "Success",
              description: "Admin added successfully",
              variant: "default",
            });
            // setModalOpen(false);
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
    <div className="flex h-auto flex-1 flex-col gap-y-[37px]">
    <div className="h-auto w-full rounded-[16px] border border-[#B0B0B0] bg-white">
      <div className="flex w-full justify-between px-[24px] py-[30px]">
        <h4 className="text-[24px] font-[600px] text-[#00473E]">
          Add Admin
        </h4>

        <button className="h-[41px] w-[157px] rounded-[8px] bg-[#EB001B] text-white">
          Add Permissions
        </button>
      </div>

      {/* <div className="grid 2xl:grid-cols-2 gap-[12px] w-full p-[25px]">
        <div className="flex flex-col gap-y-[12px]">
          <Label className="text-[#595959] font-[500]">Full Name</Label>
          <Input placeholder="Jessica" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
        </div>

        <div className="flex flex-col gap-y-[12px]">
          <Label className="text-[#595959] font-[500]">Email</Label>
          <Input placeholder="jessica@gmail.com" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
        </div>

        <div className="flex flex-col gap-y-[12px]">
          <Label className="text-[#595959] font-[500]">Cell Phone Number</Label>
          <Input placeholder="" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
        </div>

        <div className="flex flex-col gap-y-[12px]">
          <Label className="text-[#595959] font-[500]">Designation</Label>
          <SelectComponent className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]" items={["Designation"]} placeholder="Select Designation" />
        </div>

        <div className="flex flex-col gap-y-[12px]">
          <Label className="text-[#595959] font-[500]">Create Password <span className="text-[#038F3E]">*</span></Label>
          <Input placeholder="" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
        </div>

        <div className="flex flex-col gap-y-[12px]">
          <Label className="text-[#595959] font-[500]">Confirm Password <span className="text-[#038F3E]">*</span></Label>
          <Input placeholder="" className="w-full h-[57px] bg-[#F5F5F5] border border-[#DADADA] rounded-[8px]"/>
        </div>
      </div> */}

      <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-[24px] bg-white p-[24px]"
              >
                {/* <p className="text-[24px] font-[500]">Personal Information</p> */}
      
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
                             name="qualification"
                             render={({ field }) => (
                               <FormItem className="col-span-2 xl:col-span-1">
                                 <FormLabel className="text-[16px] font-[600]">Select Destination<span className="text-[#930C02] ">*</span></FormLabel>
                                 
                                 <FormControl>
                                   <SelectComponent
                                     items={qualificationOption}
                                     placeholder="Select Destination"
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
      
                 <DialogFooter className="px-6">
                                          <div className="flex w-full items-center justify-center">
                                         
                                                          <Button
                                                            className="h-[40px] w-[205px]"
                                                            disabled={isPending}
                                                            type="submit"
                                                          >
                                                            {isPending && <Loader className="animate-spin" />}
                                                            {
                                                            tabAdmin === 4 ? ("Add Admin") : ("Save Changes")
                                                            }
                                                          </Button>
                                                 
                                          </div>
                                        </DialogFooter>
              </form>
            </Form>
    </div>

    {/* <div className="flex w-full items-center justify-center">
      <button className="h-[48px] w-[174px] rounded-[8px] bg-[#ED1000] text-white">
        {
          tabAdmin === 4 ? ("Add Admin") : ("Save Changes")
        }
        
      </button>
    </div> */}
  </div>
  )
}

export default AddAdmin