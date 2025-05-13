'use client'

import CustomMultiSelectComponent from "@/components/multiSelectComponent";
import SelectComponent from "@/components/selectComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import useAcademicCalendarData from "@/hooks/useAcademicCalendar";
import useModuleData from "@/hooks/useModule";
import useQualificationData from "@/hooks/useQualification";
import useStudentData from "@/hooks/useStudent";
import { updateAllocatedStudentModuleMutationFn } from "@/lib/api";
import { allocateStudentModuleFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useState, useRef } from "react";
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
  const [qualification, setQualification] = useState<string | undefined>(
    event?.qualification_id || undefined
  );
  const initialRender = useRef(true);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof allocateStudentModuleFormSchema>) =>
      updateAllocatedStudentModuleMutationFn(event?.id, values),
  });

  const { data: student } = useStudentData(undefined, {
    qualification: qualification || undefined,
  });
  
  const {data: academicCalender} = useAcademicCalendarData("Active")
  const { data: modules } = useModuleData({ request_type: "all" });

  const { data: qualificationsData } = useQualificationData();
  const qualifications = qualificationsData?.data?.data;

  const studentApi = student?.data?.data;
  const academicCalenderApi = academicCalender?.data?.data;
  const modulesApi = modules?.data?.data;

  const studentOption = studentApi?.map((item: any) => ({
    id: item.id,
    label: item.name
  })) || [];

  const academicOption = academicCalenderApi?.map((item: any) => ({
    id: item.id,
    label: item.name
  })) || [];

  const modulesOption = modulesApi?.map((item: any) => ({
    id: item.id,
    label: item.name
  })) || [];

  const qualificationOption = qualifications?.map((item: any) => ({
    id: item.id,
    label: item.name
  })) || [];

  const form = useForm<z.infer<typeof allocateStudentModuleFormSchema>>({
    resolver: zodResolver(allocateStudentModuleFormSchema),
    defaultValues: {
      student_id: event?.student_id || "",
      academic_calender_id: event?.academic_calender_id || "",
      modules: [],
    },
  });

  // Handle qualification change once on initial render
  useEffect(() => {
    if (!initialRender.current) return;
    
    if (event?.qualification_id) {
      setQualification(event.qualification_id);
    }
    
    initialRender.current = false;
  }, [event?.qualification_id]);

  // Update form values when event and module options are available
  useEffect(() => {
    if (!event || !modulesOption?.length) return;
    
    let moduleIds: string[] = [];

    if (typeof event.module === "string") {
      // Split by commas and 'and'
      const rawNames = event.module
        .split(/,| and /i)
        .map((name: string) => name.trim());

      // Match labels to find module IDs
      moduleIds = modulesOption
        .filter((mod: any) => rawNames.includes(mod.label))
        .map((mod: any) => mod.id);
    } else if (Array.isArray(event.module)) {
      moduleIds = event.module;
    }

    form.reset({
      student_id: event.student_id || "",
      academic_calender_id: event.academic_calender_id || "",
      modules: moduleIds,
    });
  }, [event?.id, modulesOption.length]); // Only depend on the event ID and module options length

  const onSubmit = (values: z.infer<typeof allocateStudentModuleFormSchema>) => {
    mutate(values, {
      onSuccess: () => {
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
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col gap-y-[16px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-y-[24px] px-6">
                <div className="flex flex-col gap-y-[8px]">
                  <Label>
                    Qualification
                  </Label>
                  <SelectComponent
                    items={qualificationOption}
                    placeholder="Select Qualification"
                    className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                    onChange={(value) => setQualification(value)}
                    // value={qualification}
                  />
                </div>
                <div className="flex flex-col gap-y-[8px]">
                  <FormField
                    control={form.control}
                    name="student_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Student
                        </FormLabel>
                        <FormControl>
                          <SelectComponent
                            items={studentOption}
                            placeholder={event.name || "Select Student"}
                            className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                            onChange={field.onChange}
                            // value={field.value}
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
                          Academic Calendar
                        </FormLabel>
                        <FormControl>
                          <SelectComponent
                            items={academicOption}
                            placeholder={event.academic_calender || "Select Academic Calendar"}
                            className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                            onChange={field.onChange}
                            // value={field.value}
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
                    name="modules"
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