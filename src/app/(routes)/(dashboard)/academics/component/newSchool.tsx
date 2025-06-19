"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { newSchoolMutationFn } from "@/lib/api";
import { schoolFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewSchool = () => {
    const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: newSchoolMutationFn,
  });

  const form = useForm<z.infer<typeof schoolFormSchema>>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schoolFormSchema>) => {
    mutate(values, {
      onSuccess: (response) => {
        // if (response.data.mfaRequired) {
        //   router.replace(`/verify-mfa?email=${values.email}`);
        //   return;
        // }
        queryClient.invalidateQueries({ queryKey: ['schoolData'] });
        toast({
            title: "Success",
            description: "School added successfully",
            variant: "default",
          });
        setModalOpen(false);
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
    <div className="flex h-[80px] w-full items-center justify-between px-[32px]">
      <p className="text-[20px] font-[600] leading-[29.05px] md:text-[24px]">
        Schools
      </p>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button className="h-[40px] w-[150px] bg-[#ED1000] text-[14px] font-[500] md:h-[48px] md:w-[187px] md:text-[16px]">
            Add new school
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
            <DialogTitle>Add new school</DialogTitle>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          School Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Name of school"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-[600] text-[#1E1E1E]">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-[189px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                            placeholder="Description of the school."
                            {...field}
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
                                  Create school
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

export default NewSchool;
