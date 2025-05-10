import CustomMultiSelectComponent from "@/components/multiSelectComponent";
import MultiSelectComponent from "@/components/multiSelectComponent";
import SelectComponent from "@/components/selectComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import useQualificationData from "@/hooks/useQualification";
import useSemesterData from "@/hooks/useSemester";
import useStandardData from "@/hooks/useStandard";
import { updateModuleMutationFn, updateSchoolMutationFn } from "@/lib/api";
import { schools } from "@/lib/constants";
import { moduleFormSchema, schoolFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateQualificationTriggerProps {
  open: boolean;
  onClose: () => void;
  event?: any;
}
const UpdateSchool = ({
  open,
  onClose,
  event,
}: UpdateQualificationTriggerProps) => {
 const queryClient = useQueryClient();
     const [modalOpen, setModalOpen] = useState(false);

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
     
     const { mutate, isPending } = useMutation({
       mutationFn: (values: z.infer<typeof moduleFormSchema>) => updateModuleMutationFn(event?.id, values),
     });
     const form = useForm<z.infer<typeof moduleFormSchema>>({
       resolver: zodResolver(moduleFormSchema),
       defaultValues: {
         name: event?.qualifications || "",
         default_semester: event?.default_semester || true,
         semester_id: event?.semester_id || "",
         standard_id: event?.standard_id || "",
         qualifications: Array.isArray(event?.qualifications) 
        ? event.qualifications 
        : event?.qualifications?.split(',').map((q: any) => q.trim()) || []
       },
     });

       
     useEffect(() => {
      if (event) {
        // Convert qualifications to array if it's a string
        const qualifications = Array.isArray(event.qualifications) 
          ? event.qualifications 
          : event.qualifications?.split(',').map((q: any)  => q.trim()) || [];
  
        form.reset({
          name: event.qualifications || "",
          default_semester: event.default_semester || false,
          semester_id: event.semester_id || "",
          standard_id: event.standard_id || "",
          qualifications: qualifications
        });
      }
    }, [event, form]);
   
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
               description: "Module updated successfully",
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
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
            <DialogTitle>Edit Module</DialogTitle>
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
                                      <CustomMultiSelectComponent
                                          placeholder="Select question"
                                          items={qualificationOptions}
                                          value={field.value}
                                          onChange={(values) => field.onChange(values)}
                                          className="h-[auto]"
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
  );
};

export default UpdateSchool;
