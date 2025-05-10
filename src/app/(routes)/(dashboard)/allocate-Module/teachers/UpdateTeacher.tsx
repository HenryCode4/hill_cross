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
import { useTeacherData } from "@/hooks/useSchool";
import {
  updateAllocatedModuleMutationFn,
  updateSchoolMutationFn,
} from "@/lib/api";
import { allocateModuleFormSchema, schoolFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useMemo } from "react";
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
  console.log(event)
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof allocateModuleFormSchema>) =>
      updateAllocatedModuleMutationFn(event?.id, values),
  });
  const {data: teacher} = useTeacherData();
        const {data: academicCalender} = useAcademicCalendarData()
        const { data: modules } = useModuleData({ request_type: "all" });
        console.log(modules)
        const teacherApi = teacher?.data?.data;
        const academicCalenderApi = academicCalender?.data?.data;
        
        const modulesApi = modules?.data?.data;
        console.log(modulesApi)
        const teacherOption = teacherApi?.map((item: any)=> ({
          id: item.id,
          label: item.name
        }));

        const academicOption = academicCalenderApi?.map((item: any)=> ({
          id: item.id,
          label: item.name
        }));

        const modulesOption = useMemo(() => {
          return modulesApi?.map((item: any) => ({
            id: item.id,
            label: item.name,
          })) ?? [];
        }, [modulesApi]);

  const form = useForm<z.infer<typeof allocateModuleFormSchema>>({
    resolver: zodResolver(allocateModuleFormSchema),
    defaultValues: {
      teacher_id: event.teacher_id || "",
      academic_calender_id: event.academic_calender_id || "",
      modules: event.module ? [event.module] : [],
    },
  });

  // Update form values when event changes
  useEffect(() => {
    if (event) {
      let moduleIds: string[] = [];
  
      if (typeof event.module === "string") {
        // Split by commas and 'and'
        const rawNames = event.module
          .split(/,| and /i)
          .map((name: string) => name.trim());
  
        // Match labels to find module IDs
        moduleIds = modulesOption
          ?.filter((mod: any) => rawNames.includes(mod.label))
          .map((mod: any) => mod.id) ?? [];
      } else if (Array.isArray(event.module)) {
        moduleIds = event.module;
      }
  
      form.reset({
        teacher_id: event.teacher_id || "",
        academic_calender_id: event.academic_calender_id || "",
        modules: moduleIds,
      });
    }
  }, [event, form, modulesOption]);
  

  const onSubmit = (values: z.infer<typeof allocateModuleFormSchema>) => {
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
                    name="teacher_id" // or whatever field you want to bind this to
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Teacher
                        </FormLabel>
                        <FormControl>
                          <SelectComponent
                            items={teacherOption}
                            placeholder={event.teacher || "Select Teacher"}
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
                    name="academic_calender_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Academic Calender
                        </FormLabel>
                        <FormControl>
                          <SelectComponent
                            items={academicOption}
                            placeholder={event.academic_calendar || "Select Academic Calender"}
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
                        <CustomMultiSelectComponent
                          placeholder="Select Modules"
                          items={modulesOption}
                          value={field.value}
                          onChange={(values) => field.onChange(values)}
                          className="h-[auto]"
                        />
                        </FormControl>

                         {/* Selected items tags container */}
      {/* {field.value && field.value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {field.value.map((moduleId, index) => {
            // Find the matching module object to get the label
            const moduleItem = modulesOption?.find((item: any) => item.id === moduleId);
            const moduleLabel = moduleItem ? moduleItem.label : moduleId;
            
            return (
              <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm">
                <span className="mr-1">{moduleLabel}</span>
                <button
                  type="button"
                  onClick={() => {
                    // Remove this item from the array
                    const newValues = field.value.filter(id => id !== moduleId);
                    field.onChange(newValues);
                  }}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )} */}
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
