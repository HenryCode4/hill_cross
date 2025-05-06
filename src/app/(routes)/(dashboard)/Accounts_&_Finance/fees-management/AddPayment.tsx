import { DatePicker } from '@/components/date_pickerNew';
import SelectComponent from '@/components/selectComponent';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { studentPaymentMutationFn } from '@/lib/api';
import { paymentFormSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const AddPayment = () => {
    const queryClient = useQueryClient();
     const [modalOpen, setModalOpen] = useState(false);

     const { mutate, isPending } = useMutation({
       mutationFn: studentPaymentMutationFn,
     });
   
     const form = useForm<z.infer<typeof paymentFormSchema>>({
       resolver: zodResolver(paymentFormSchema),
       defaultValues: {
        student_id: "",
        amount_paid: "",
        total_amount_payable: "",
        payment_date: "",
        payment_mode: "",
        fee_category: "",
        no_of_month_owed: "",
       },
     });
   
     const onSubmit = (values: z.infer<typeof paymentFormSchema>) => {
       mutate(values, {
         onSuccess: (response) => {
           // if (response.data.mfaRequired) {
           //   router.replace(`/verify-mfa?email=${values.email}`);
           //   return;
           // }
           queryClient.invalidateQueries({ queryKey: ['paymentData'] });
           toast({
               title: "Success",
               description: "Payment added successfully",
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
    <div className="h-auto w-full bg-white px-[32px] py-[26px] flex flex-col gap-y-[16px]">
            
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-[16px]">
                    <FormField
                    control={form.control}
                    name="student_id"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                        Id Number
                        </FormLabel>
                        <FormControl>
                        <div className="flex h-[52px] w-full xl:w-[821px] items-center justify-between overflow-hidden rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB] px-[16px] py-[14px]">
                            <input
                            className="w-full bg-[#F9FCFB] outline-none focus:outline-none"
                            placeholder="Enter student ID"
                            {...field}
                            />
                            <Search />
                        </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="payment_date"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                        Payment Date
                        </FormLabel>
                        <FormControl>
                        <div className="flex w-full xl:w-[821px] items-center justify-between ">
                        <DatePicker value={field.value} onChange={field.onChange} />
                        </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

        <FormField
            control={form.control}
            name="payment_mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[600] text-[#1E1E1E]">
                  Payment Mode
                </FormLabel>
                <FormControl>
                  <SelectComponent
                    className="h-[52px] w-full xl:w-[821px] rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB]"
                    items={["EFT", "Cash", "Debit Order", "Other Payment"]}
                    placeholder="Select payment mode"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="total_amount_payable"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[600] text-[#1E1E1E]">
                  Arrears Payment
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[52px] w-full xl:w-[821px] bg-[#F9FCFB] rounded-[8px] border border-[#AACEC9]"
                    placeholder="Enter amount paid"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="amount_paid"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[600] text-[#1E1E1E]">
                  Amount paid
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[52px] w-full xl:w-[821px] bg-[#F9FCFB] rounded-[8px] border border-[#AACEC9]"
                    placeholder="Enter amount paid"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="fee_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[600] text-[#1E1E1E]">
                  Payment Reason
                </FormLabel>
                <FormControl>
                  <SelectComponent
                    className="h-[52px] w-full xl:w-[821px] rounded-[8px] border border-[#AACEC9] bg-[#F9FCFB]"
                    items={[
                      "Fees",
                      "Outstanding Fees",
                      "Examination Fees",
                      "Books",
                      "Registration Fees",
                      "Assessment and Moderation fee",
                      "Certificate",
                      "Graduation Fee",
                      "Practical Fee",
                      "Miscellaneous"
                    ]}
                    placeholder="Select payment category"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="no_of_month_owed"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-[600] text-[#1E1E1E]">
                  Number of month owed
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[52px] w-full xl:w-[821px] bg-[#F9FCFB] rounded-[8px] border border-[#AACEC9]"
                    placeholder="Enter number of month owed"
                    {...field}
                  />
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
              {isPending ? "Adding Payment..." : "Add Payment"}
            </Button>
          </div>

            </form>
            </Form>

          </div>
  )
}

export default AddPayment