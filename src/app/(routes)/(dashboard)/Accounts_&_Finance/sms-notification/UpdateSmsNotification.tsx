"use client"
import { DatePickerDemo } from "@/components/datepicker";
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
import { updateSchoolMutationFn, updateSmsNotificationMutationFn } from "@/lib/api";
import { schoolFormSchema, smsNotificationFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateSmsTriggerProps {
    open: boolean;
    onClose: () => void;
    event?: any;
  }
const UpdateSmsNotification = ({ open, onClose, event }: UpdateSmsTriggerProps) => {
  const queryClient = useQueryClient();
   const { mutate, isPending } = useMutation({
      mutationFn: (values: z.infer<typeof smsNotificationFormSchema>) => updateSmsNotificationMutationFn(event?.id, values),
    });
  
    const form = useForm<z.infer<typeof smsNotificationFormSchema>>({
      resolver: zodResolver(smsNotificationFormSchema),
      defaultValues: {
        message_subject: event?.title || "",
        message_recipient: event?.recipients || "",
        delivery_method: event?.channel || "",
        expected_date_delivery: event?.deliveryDate || "",
        message: event?.message || "",
        delivery_time: event?.delivery_time || "",
      },
    });

    // Update form values when event changes
  useEffect(() => {
    if (event) {
      form.reset({
        message_subject: event?.title || "",
        message_recipient: event?.recipients || "",
        delivery_method: event?.channel || "",
        expected_date_delivery: event?.deliveryDate || "",
        message: event?.message || "",
        delivery_time: event?.delivery_time || "",
      });
    }
  }, [event, form]);
  
    const onSubmit = (values: z.infer<typeof smsNotificationFormSchema>) => {
      mutate(values, {
        onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: ['smsNotification'] });
          toast({
              title: "Success",
              description: "Sms Notification updated successfully",
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
        <DialogTrigger>
          
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex justify-center items-center w-full bg-[#FCF9F9] mt-3 p-2">
          <DialogTitle>Update message</DialogTitle>
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
                    name="message_recipient"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Message recipient
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Message recipient"
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
                    name="message_subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Message Subject
                        </FormLabel>
                        <FormControl>
                        <Input
                            className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Message recipient"
                            {...field}
                          />
                          {/* <Textarea
                            className="h-[189px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Message Subject."
                            {...field}
                          /> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-y-[8px]">

                  <FormField
                    control={form.control}
                    name="delivery_method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Delivery Method
                        </FormLabel>
                        <FormControl>
                        <Input
                            className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Delivery Method"
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-[189px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Message Subject."
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
                    name="expected_date_delivery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Sent Date
                        </FormLabel>
                        <FormControl>
                        <DatePickerDemo
                          placeholder="Select date"
                          date={field.value}
                          setDate={field.onChange}
                        />
                          {/* <Textarea
                            className="h-[189px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Message Subject."
                            {...field}
                          /> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-y-[8px]">

                  <FormField
                    control={form.control}
                    name="delivery_time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                         Delivery time 
                        </FormLabel>
                        <FormControl>
                          {/* <DatePickerDemo selectTime/> */}
                          <DatePickerDemo 
                        selectTime
                        placeholder="Select time"
                        // date={selectedTime}
                        // setDate={setSelectedTime}
                        date={field.value}
                          setDate={field.onChange}
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
                                  Update Sms Notification
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

export default UpdateSmsNotification;
