import { DatePicker } from '@/components/date_pickerNew'
import SelectComponent from '@/components/selectComponent'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import useAcademicData from '@/hooks/useAcademicSession'
import useSemesterData from '@/hooks/useSemester'
import { newCalendarMutationFn } from '@/lib/api'
import { calendarFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const NewCalendar = () => {
    const queryClient = useQueryClient();
    const [schoolState, setSchoolState] = useState("")
    const {data} = useSemesterData();
    const semesterApi = data?.data?.data;
    console.log(semesterApi)
     const schoolOptions = semesterApi?.map((school: { id: string; name: string }) => ({
        id: school.id,
        label: school.name
     }))

     const {data: academicData} = useAcademicData()
     const academicApi = academicData?.data?.data;
     console.log(academicApi)
     const academicOptions = academicApi?.map((academy: { id: string; name: string }) => ({
        id: academy.id,
        label: academy.name
     }))
     console.log(academicOptions)

      const [modalOpen, setModalOpen] = useState(false);
      const { mutate, isPending } = useMutation({
        mutationFn: (values: z.infer<typeof calendarFormSchema>) =>
        newCalendarMutationFn(values.session_id, values),
      });
    
      const form = useForm<z.infer<typeof calendarFormSchema>>({
        resolver: zodResolver(calendarFormSchema),
        defaultValues: {
          name: "",
          semester_id: "",
          start_date: "",
          end_date: "",
          course_registration_start_date: "",
          course_registration_end_date: "",
        },
      });
    
      const onSubmit = (values: z.infer<typeof calendarFormSchema>) => {
        console.log(values)
        mutate(values, {
          onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["calenderData"] });
            toast({
              title: "Success",
              description: "Calendar added successfully",
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
          <p className="text-[20px] md:text-[24px] font-[600] leading-[29.05px]">
            Academic Calendar
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="header-button bg-[#ED1000] font-[500]">
                Add new Calendar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
                <DialogTitle>Add New Calendar</DialogTitle>
                
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
                                name="session_id" // or whatever field you want to bind this to
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="font-[600] text-[#1E1E1E]">
                                        Select Session
                                    </FormLabel>
                                    <FormControl>
                                        <SelectComponent
                                        items={academicOptions}
                                        placeholder="Select Session"
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
  )
}

export default NewCalendar