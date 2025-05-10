import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import useSchoolData from "@/hooks/useSchool";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { qualificationFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { newQualificationMutationFn } from "@/lib/api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader } from "lucide-react";

const NewQualification = () => {
    const queryClient = useQueryClient();
    const [schoolState, setSchoolState] = useState("")

  const { data: school } = useSchoolData();
  // Transform school data into simple array of strings
  const schoolOptions = school?.data?.data?.map((school: { id: string; name: string }) => ({
    id: school.id,
    label: school.name
  })) || [];

      const [modalOpen, setModalOpen] = useState(false);
      const { mutate, isPending } = useMutation({
        mutationFn: (values: z.infer<typeof qualificationFormSchema>) => newQualificationMutationFn(values, schoolState),
      });
    
      const form = useForm<z.infer<typeof qualificationFormSchema>>({
        resolver: zodResolver(qualificationFormSchema),
        defaultValues: {
          name: "",
          description: "",
          duration: "",
        },
      });
    
      const onSubmit = (values: z.infer<typeof qualificationFormSchema>) => {
        mutate(values, {
          onSuccess: (response) => {
            // if (response.data.mfaRequired) {
            //   router.replace(`/verify-mfa?email=${values.email}`);
            //   return;
            // }
            queryClient.invalidateQueries({ queryKey: ['qualificationData'] });
            toast({
                title: "Success",
                description: "Qualification added successfully",
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
    <>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button className="header-button bg-[#ED1000] font-[500]">
            Add new qualification
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mt-3 flex w-full items-center justify-center bg-[#FCF9F9] p-2">
            <DialogTitle>Add New Qualification</DialogTitle>
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
                                  Qualification Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                                      placeholder="Name of qualification "
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
                              name="duration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-[600] text-[#1E1E1E]">
                                    Duration
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      className="h-[48px] rounded-[8px] outline outline-1 outline-[#AACEC9] focus-visible:outline"
                                      placeholder="Duration of study "
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex flex-col gap-y-[8px]">
                            <Label className="font-[600] text-[#1E1E1E]">Select School</Label>
                            <SelectComponent
                                items={schoolOptions || []}
                                placeholder="Select School"
                                className="h-[48px] rounded-[8px] border border-[#AACEC9]"
                                onChange={(value) => {
                      
                                    setSchoolState(value);
                                  }}
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
    </>
  );
};

export default NewQualification;
