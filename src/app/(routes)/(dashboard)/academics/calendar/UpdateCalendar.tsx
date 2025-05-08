'use client'
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date_pickerNew";
import DropdownSelect from "@/components/customDropdown";
import { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useSemesterData from "@/hooks/useSemester";
import useAcademicData from "@/hooks/useAcademicSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { calendarFormSchema, updateCalendarFormSchema } from "@/lib/schema";
import { updateCalendarMutationFn } from "@/lib/api";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

interface UpdateQualificationTriggerProps {
  open: boolean;
  onClose: () => void;
  event?: any;
}
const UpdateCalendar = ({
  open,
  onClose,
  event,
}: UpdateQualificationTriggerProps) => {
  const queryClient = useQueryClient();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const {data} = useSemesterData();
      const semesterApi = data?.data?.data;
       const schoolOptions = semesterApi?.map((school: { id: string; name: string }) => ({
          id: school.id,
          label: school.name
       }))
  
       const {data: academicData} = useAcademicData()
       const academicApi = academicData?.data?.data;
       const academicOptions = academicApi?.map((academy: { id: string; name: string }) => ({
          id: academy.id,
          label: academy.name
       }))
  
        const [modalOpen, setModalOpen] = useState(false);
        const { mutate, isPending } = useMutation({
          mutationFn: (values: z.infer<typeof updateCalendarFormSchema>) =>
          updateCalendarMutationFn(values.session_id, event.id, values),
        });
      
        const form = useForm<z.infer<typeof updateCalendarFormSchema>>({
          resolver: zodResolver(updateCalendarFormSchema),
          defaultValues: {
            name: event.name || "",
            semester_id: event.semesterId || "",
            session_id: event.sessionId || "",
            start_date: event.startDate || "",
            end_date: event.endDate || "",
            course_registration_start_date: event.course_registration_start_date || "",
            course_registration_end_date: event.course_registration_end_date || "",
          },
        });

        useEffect(() => {
                if (event) {
                  form.reset({
                    name: event.name || "",
                    semester_id: event.semesterId || "",
                    session_id: event.sessionId || "",
                    start_date: event.startDate || "",
                    end_date: event.endDate || "",
                    course_registration_start_date: event.course_registration_start_date || "",
                    course_registration_end_date: event.course_registration_end_date || "",
                  });
                }
              }, [event, form]);
      
        const onSubmit = (values: z.infer<typeof updateCalendarFormSchema>) => {
          mutate(values, {
            onSuccess: (response) => {
              queryClient.invalidateQueries({ queryKey: ["academicCalendarData"] });
              toast({
                title: "Success",
                description: "Calendar Updated successfully",
                variant: "default",
              });
              setModalOpen(false);
              onClose();
            },
            onError: (error) => {
              toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
              });
            },
          });
        };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
            <DialogTitle>Edit Calendar</DialogTitle>
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
                                            name="name"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel className="font-[600] text-[#1E1E1E]">
                                                  Session Name
                                                </FormLabel>
                                                <FormControl>
                                                  <Input
                                                    className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                                                    placeholder="Name of session"
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
                                          name="semester_id" // or whatever field you want to bind this to
                                          render={({ field }) => (
                                              <FormItem>
                                              <FormLabel className="font-[600] text-[#1E1E1E]">
                                                  Select Semester
                                              </FormLabel>
                                              <FormControl>
                                                  <SelectComponent
                                                  items={schoolOptions}
                                                  placeholder={field.value || "Select Semester"}
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
                                          name="session_id" // or whatever field you want to bind this to
                                          render={({ field }) => (
                                              <FormItem>
                                              <FormLabel className="font-[600] text-[#1E1E1E]">
                                                  Select Session
                                              </FormLabel>
                                              <FormControl>
                                                  <SelectComponent
                                                  items={academicOptions}
                                                  placeholder={field.value || "Select Session"}
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
                                            name="start_date"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel className="font-[600] text-[#1E1E1E]">
                                                  Start Date
                                                </FormLabel>
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
                                        </div>
                                        <div className="flex flex-col gap-y-[8px]">
                                          <FormField
                                            control={form.control}
                                            name="end_date"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel className="font-[600] text-[#1E1E1E]">
                                                  End Date
                                                </FormLabel>
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
                                        </div>
                                        <div className="flex flex-col gap-y-[8px]">
                                          <FormField
                                            control={form.control}
                                            name="course_registration_start_date"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel className="font-[600] text-[#1E1E1E]">
                                                  Course Reg start date
                                                </FormLabel>
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
                                        </div>
                                        <div className="flex flex-col gap-y-[8px]">
                                          <FormField
                                            control={form.control}
                                            name="course_registration_end_date"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel className="font-[600] text-[#1E1E1E]">
                                                Course Reg end date
                                                </FormLabel>
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
                                            Create calendar
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

export default UpdateCalendar;
