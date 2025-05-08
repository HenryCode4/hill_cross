"use client"

import { DatePickerDemo } from '@/components/datepicker'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { createPushNotification } from '@/lib/api'
import { createNotificationFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const NewNotificationPage = () => {
  const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
         mutationFn: createPushNotification,
       });
     
       const form = useForm<z.infer<typeof createNotificationFormSchema>>({
         resolver: zodResolver(createNotificationFormSchema),
         defaultValues: {
          body: "",
          title: "",
         },
       });
     
       const onSubmit = (values: z.infer<typeof createNotificationFormSchema>) => {
         mutate(values, {
           onSuccess: (response) => {
             // if (response.data.mfaRequired) {
             //   router.replace(`/verify-mfa?email=${values.email}`);
             //   return;
             // }
             queryClient.invalidateQueries({ queryKey: ['pushNotificationData'] });
             toast({
                 title: "Success",
                 description: "Notification created successfully",
                 variant: "default",
               });
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
        <Header backIcon title={"Add New Notification"} hideSearch  />

        <div className="w-full bg-white px-[8px]">
        <div className="h-auto w-full bg-white px-[32px] py-[26px] flex flex-col gap-y-[16px]">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-[16px]">
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[600] text-[#1E1E1E]">
                  Notification Title
                </FormLabel>
                <FormControl>
                  <div className="flex h-[52px] w-full xl:w-[821px] items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px]">
                    <input
                      className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                      placeholder="Enter notification title"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[600] text-[#1E1E1E]">
                  Notification Details
                </FormLabel>
                <FormControl>
                  <div className="flex  w-full xl:w-[821px] items-center justify-between  rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] ">
                    <Textarea
                      className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                      placeholder="Enter notification Details"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <div className="flex w-full xl:w-[821px] justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#9D1217] h-[48px] w-auto rounded-[8px] px-[16px] py-[12px] text-white"
            >
              {isPending && <Loader className="animate-spin" />}
              {isPending ? "Setting Notification..." : "Set Notification"}
            </Button>
          </div>

          
        </form> 
        </Form>

          </div>
        </div>
    </div>
  )
}

export default NewNotificationPage