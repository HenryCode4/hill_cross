"use client";

import { detailsAvatar } from "@/assets";
import Header from "@/components/header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import student from "@/lib/student-mgt.json";
import transaction from "@/lib/transaction.json";
import { useParams } from "next/navigation";
import InputPage from "../_component/input";
import { Eye, EyeOff, Loader } from "lucide-react";
import SelectPage from "../_component/select";
import Table from "@/components/Table";
import { useStudentByIdData } from "@/hooks/useStudent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentMutationFn } from "@/lib/api";
import { z } from "zod";
import { personalDetailsSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface PersonalDetailsProps {
    filteredStudent: any
}
const PersonalDetails = ({filteredStudent}: PersonalDetailsProps) => {
     const queryClient = useQueryClient();
    
      const { mutate, isPending } = useMutation({
        mutationFn: (values: z.infer<typeof personalDetailsSchema>) =>
          updateStudentMutationFn(filteredStudent.id, "personal-details", values),
      });
    
      const form = useForm<z.infer<typeof personalDetailsSchema>>({
        resolver: zodResolver(personalDetailsSchema),
        defaultValues: {
          title: filteredStudent?.profile?.title || "",
          gender: filteredStudent?.profile?.gender || "",
          first_name: filteredStudent?.first_name || "",
          last_name: filteredStudent?.last_name || "",
          other_name: filteredStudent?.profile?.other_name || "",
          dob: filteredStudent?.profile?.dob || "",
          selectNationality: filteredStudent?.profile?.nationality || "",
          home_language: filteredStudent?.profile?.home_language || "",
          race: filteredStudent?.profile?.race || "",
          disability: filteredStudent?.profile?.disability || "",
          maiden_name: filteredStudent?.profile?.maiden_name || "",
          passport_number: filteredStudent?.profile?.passport_number || "",
          country_id: filteredStudent?.address?.country?.id || "",
        },
      });
    
      // Update form values when event changes
      useEffect(() => {
        if (filteredStudent) {
          form.reset({
            title: filteredStudent?.profile?.title || "",
            gender: filteredStudent?.profile?.gender || "",
            first_name: filteredStudent?.first_name || "",
            last_name: filteredStudent?.last_name || "",
            other_name: filteredStudent?.profile?.other_name || null,
            dob: filteredStudent?.profile?.dob || "",
            selectNationality: filteredStudent?.profile?.nationality || "",
            home_language: filteredStudent?.profile?.home_language || "",
            race: filteredStudent?.profile?.race || "",
            disability: filteredStudent?.profile?.disability ? "Yes" : "No",
            maiden_name: filteredStudent?.profile?.maiden_name || null,
            passport_number: filteredStudent?.profile?.passport_number || "",
            country_id: filteredStudent?.address?.country?.id || "",
          });
        }
      }, [filteredStudent, form]);
    
      const onSubmit = (values: z.infer<typeof personalDetailsSchema>) => {
        mutate(values, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["studentDataById"] });
            toast({
              title: "Success",
              description: "Personal details updated successfully",
              variant: "default",
            });
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

      const title = ["Mr", "Mrs", "Miss"];
      const gender = ["Male", "Female"];

  return (
    <Form {...form}>
                <form
                  className="flex flex-col gap-y-[16px]"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="grid gap-x-[20px] gap-y-[24px] lg:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            Title <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <SelectPage
                              data={title}
                              placeholder={
                                filteredStudent?.profile?.title ||
                                "Select Title"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            Gender <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <SelectPage
                              data={gender}
                              placeholder={
                                filteredStudent?.profile?.gender ||
                                "Select Gender"
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            First Name <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputPage
                              placeholder="Enter First Name"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            Last Name <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputPage
                              placeholder="Enter Last Name"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="other_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            Other Name <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputPage
                              placeholder="Enter Last Name"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            DOB <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputPage
                              placeholder="1988-07-06"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            Country ID <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputPage
                              placeholder="94f47406-a183-4757-874e-f72a701034f2"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="race"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            Race <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputPage
                              placeholder="Race"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="passport_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            Passport Number{" "}
                            <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputPage
                              placeholder="Enter ID/Passport Number"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="home_language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            Home Language{" "}
                            <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputPage
                              placeholder="Enter Home Language"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="disability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[16px] font-[600]">
                            Do you have any disability{" "}
                            <span className="text-[#930C02]">*</span>
                          </FormLabel>
                          <FormControl>
                            <InputPage
                              placeholder="Any disability"
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-6 flex w-full justify-center">
                    <Button
                      type="submit"
                      className="h-[48px] w-[181px] bg-[#ED1000] text-white"
                      disabled={isPending}
                    >
                      {isPending && (
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
  )
}

export default PersonalDetails