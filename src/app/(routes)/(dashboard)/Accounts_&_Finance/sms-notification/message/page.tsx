"use client"

import { addCycle } from '@/assets'
import { DatePickerDemo } from '@/components/datepicker'
import Header from '@/components/header'
import SelectComponent from '@/components/selectComponent'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { createSmsNotificationMutationFn } from '@/lib/api'
import { smsNotificationFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MessagePage = () => {
  const [messageType, setMessageType] = useState<"notification" | "scheduled">("notification");
   const queryClient = useQueryClient();
    const [active, setActive] = useState(1)

    const { mutate, isPending } = useMutation({
      mutationFn: (values: z.infer<typeof smsNotificationFormSchema>) => 
        createSmsNotificationMutationFn(values),
    });

    const form = useForm<z.infer<typeof smsNotificationFormSchema>>({
      resolver: zodResolver(smsNotificationFormSchema),
      defaultValues: {
        message_subject: "",
        message_recipient: "",
        delivery_method: "",
        expected_date_delivery: "",
        message: "",
        delivery_time: "",
      },
    });

    const onSubmit = (values: z.infer<typeof smsNotificationFormSchema>) => {
      console.log(values)
      const payload = { ...values, type: messageType };
      console.log(payload);
      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['smsNotification'] });
          toast({
            title: "Success",
            description: "Message sent successfully",
            variant: "default",
          });
          form.reset();
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

  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header
        backIcon
        title={"Messaging"}
        subTitle={"Accounting & Finance"}
        hideSearch
      />

      <div className='w-full flex gap-y-[45px] flex-col bg-white h-auto p-[39px]'>
      <div className="flex w-full flex-col lg:flex-row justify-between lg:items-center gap-y-[20px]">
            <div className="flex gap-x-[16px]">
                <button onClick={()=> setActive(1)} className={`${active === 1 ? "bg-[#9D1217]":"bg-[#F6B2AD]"} h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}>Scheduled</button>
                <button onClick={()=> setActive(2)} className={`${active === 2 ? "bg-[#9D1217]":"bg-[#F6B2AD]"} h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}>Outbox</button>
           
            </div>
            
            <div className='flex flex-1 justify-end'>
                <Link href={"/Accounts_&_Finance/sms-notification/message"}>
                    <button className={`bg-[#9D1217] h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px] flex gap-x-[8px] items-center`}>
                    <Image src={addCycle} alt="new message icon" />
                    <p className="text-[20px] font-[500]">New Message</p>
                </button>
                </Link>
            
            </div>
          </div>
          {
  active === 1 ? (
    <Form {...form}>
      <form className='w-full flex-col flex gap-y-[32px]'  onSubmit={form.handleSubmit(onSubmit)}>
      <div className='grid lg:grid-cols-2 gap-[47px]'>
        {/* <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Message Recipient</Label>
          <SelectComponent className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]' items={["Unpaid Student sponsors"]} placeholder="Select qualification" />
        </div> */}
        <FormField
                  control={form.control}
                  name="message_recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1E1E1E] font-[600]">Message Recipient</FormLabel>
                      <FormControl>
                        <SelectComponent
                          className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]'
                          items={["Unpaid Student sponsors"]}
                          placeholder="Select recipient"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

<FormField
                  control={form.control}
                  name="delivery_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1E1E1E] font-[600]">Delivery Method</FormLabel>
                      <FormControl>
                        <SelectComponent
                          className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]'
                          items={["SMS", "E-mail"]}
                          placeholder="Select method"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message_subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1E1E1E] font-[600]">Message Subject</FormLabel>
                      <FormControl>
                        <Input
                          className='text-[#696A6A] text-[1rem] border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px] h-[48px] outline-none focus:outline-none'
                          placeholder="Enter subject"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
        {/* <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Delivery Method</Label>
          <SelectComponent className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]' items={["SMS", "E-mail"]} placeholder="Select qualification" />
        </div>
        <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Message Subject</Label>
          <Input className='text-[#696A6A] text-[1rem] border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px] h-[48px] outline-none focus:outline-none' placeholder="Unpaid Student sponsors" />
        </div> */}
      </div>

      <div className='w-full h-[1px] bg-[#B0B0B0]' />

      {/* <div>
        <Textarea className='focus:outline-none' />
      </div> */}
       <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className='focus:outline-none'
                        placeholder="Enter message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

        <div className='grid lg:grid-cols-2 gap-[47px]'>
        <FormField
                  control={form.control}
                  name="expected_date_delivery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1E1E1E] font-[600]">
                        Expected Date of Delivery <span className='text-[red]'>*</span>
                      </FormLabel>
                      <FormControl>
                        <DatePickerDemo
                          className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]'
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

<FormField
                  control={form.control}
                  name="delivery_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1E1E1E] font-[600]">
                        Delivery Time <span className='text-[red]'>*</span>
                      </FormLabel>
                      <FormControl>
                        <DatePickerDemo
                          selectTime
                          className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]'
                          date={field.value}
                          setDate={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
        </div>

      {/* <div className='grid lg:grid-cols-2 gap-[47px]'>
        <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Expected Date of Delivery <span className='text-[red]'>*</span></Label>
          <DatePickerDemo className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]' />
        </div>
        <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Delivery Time <span className='text-[red]'>*</span></Label>
          <DatePickerDemo selectTime className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]' />
        </div>
      </div>

      <div className='flex gap-x-[48px]'>
        <button className={`bg-[#9D1217] h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}>Send Now</button>
        <button className={`bg-[#F6B2AD] h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}>Schedule for later</button>
      </div> */}

<div className='flex gap-x-[48px]'>
                <button
                  type="submit"
                  className={`bg-[#9D1217] h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px] flex items-center gap-x-2`}
                  disabled={isPending}
                  onClick={() => setMessageType("notification")}
                >
                 
                  Send Now
                </button>
                <button
                  type="button"
                  className={`bg-[#F6B2AD] h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}
                  onClick={() => {
                    setMessageType("scheduled");
                    form.handleSubmit(onSubmit)();
                  }}
                >
                  Schedule for later
                </button>
              </div>
    </form>
    </Form>
    
  ) : (
    <div className='w-full flex-col flex gap-y-[32px]'>
      <div className='grid lg:grid-cols-2 gap-[47px]'>
        <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Message Recipient</Label>
          <SelectComponent className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]' items={["Unpaid Student sponsors"]} placeholder="Select qualification" />
        </div>
        <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Delivery Method</Label>
          <SelectComponent className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]' items={["SMS", "E-mail"]} placeholder="Select qualification" />
        </div>
        <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Message Subject</Label>
          <Input className='text-[#696A6A] text-[1rem] border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px] h-[48px] outline-none focus:outline-none' placeholder="Unpaid Student sponsors" />
        </div>
      </div>

      <div className='w-full h-[1px] bg-[#B0B0B0]' />

      <div>
        <Textarea className='focus:outline-none' />
      </div>

      <div className='grid lg:grid-cols-2 gap-[47px]'>
        <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Expected Date of Delivery <span className='text-[red]'>*</span></Label>
          <DatePickerDemo className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]' />
        </div>
        <div className="flex flex-col gap-y-[8px]">
          <Label className="text-[#1E1E1E] font-[600]">Delivery Time <span className='text-[red]'>*</span></Label>
          <DatePickerDemo selectTime className='border border-[#AACEC9] bg-[#F9FCFB] rounded-[8px]' />
        </div>
      </div>

      <div className='flex gap-x-[48px]'>
        <button className={`bg-[#9D1217] h-[48px] w-auto text-white rounded-[8px] px-[16px] py-[12px]`}>Re-Send</button>
        
      </div>
    </div>
  )
}
          

          
      </div>

    </div>
  )
}

export default MessagePage