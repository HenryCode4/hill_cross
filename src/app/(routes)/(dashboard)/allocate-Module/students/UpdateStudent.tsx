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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import useAcademicCalendarData from "@/hooks/useAcademicCalendar";
import useModuleData from "@/hooks/useModule";
import useStudentData from "@/hooks/useStudent";
import {
  updateAllocatedModuleMutationFn,
  updateAllocatedStudentModuleMutationFn,
  updateSchoolMutationFn,
} from "@/lib/api";
import { allocateModuleFormSchema, allocateStudentModuleFormSchema, schoolFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateAllocatedModuleTriggerProps {
  open: boolean;
  onClose: () => void;
  event?: any;
}
const UpdateAllocatedModule = ({
  open,
  onClose,
  event,
}: UpdateAllocatedModuleTriggerProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof allocateStudentModuleFormSchema>) =>
      updateAllocatedStudentModuleMutationFn(event?.id, values),
  });
console.log(event)
  const {data: student} = useStudentData();
        const {data: academicCalender} = useAcademicCalendarData()
        const {data: modules} = useModuleData()
  
        const studentApi = student?.data?.data;
        const academicCalenderApi = academicCalender?.data?.data;
        const modulesApi = modules?.data?.data;
  
        const studentOption = studentApi?.map((item: any)=> ({
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

  const form = useForm<z.infer<typeof allocateStudentModuleFormSchema>>({
    resolver: zodResolver(allocateStudentModuleFormSchema),
    defaultValues: {
      student_id: event.student_id || "",
      academic_calender_id: event.academic_calender_id || "",
      modules: event.module ? [event.module] : [],
    },
  });

  // Update form values when event changes
  useEffect(() => {
    if (event) {
      form.reset({
        student_id: event.student_id || "",
      academic_calender_id: event.academic_calender_id || "",
      modules: event.module ? [event.module] : [],
      });
    }
  }, [event, form]);

  const onSubmit = (values: z.infer<typeof allocateStudentModuleFormSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        // Invalidate the Allocate module query to trigger a refetch
        queryClient.invalidateQueries({ queryKey: ["allocateModuleData"] });
        toast({
          title: "Success",
          description: "Allocate module updated successfully",
          variant: "default",
        });
        onClose();
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
            <DialogTitle>Allocate Module</DialogTitle>
            {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col gap-y-[16px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-y-[24px] px-6">
                <div className="flex flex-col gap-y-[8px]">
                  <FormField
                    control={form.control}
                    name="student_id" // or whatever field you want to bind this to
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Student
                        </FormLabel>
                        <FormControl>
                          <SelectComponent
                            items={studentOption}
                            placeholder={field.value || "Select Student"}
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
                            placeholder={field.value || "Select Academic Calender"}
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
                            placeholder={`${field.value && ["Modules have been selected"]}` || "Select Modules"}
                            className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                            onChange={(values) => {
                              field.onChange(values);
                            }} // Handle array of values
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
  );
};

export default UpdateAllocatedModule;
