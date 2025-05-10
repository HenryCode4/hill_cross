import { DatePicker } from "@/components/date_pickerNew";
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
import { toast } from "@/hooks/use-toast";
import { UpdateSessionMutationFn } from "@/lib/api";
import { sessionFormSchema, updateSessionFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UpdateQualificationTriggerProps {
  open: boolean;
  onClose: () => void;
  event?: any;
}
const UpdateSchool = ({
  open,
  onClose,
  event,
}: UpdateQualificationTriggerProps) => {
   const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
      mutationFn: (values: z.infer<typeof updateSessionFormSchema>) =>
        UpdateSessionMutationFn(event?.id, values),
    });
  
    const form = useForm<z.infer<typeof updateSessionFormSchema>>({
      resolver: zodResolver(updateSessionFormSchema),
      defaultValues: {
        name: event?.name || "",
      },
    });

     useEffect(() => {
        if (event) {
          form.reset({
            name: event.name,
          });
        }
      }, [event, form]);
  
    const onSubmit = (values: z.infer<typeof updateSessionFormSchema>) => {
      mutate(values, {
        onSuccess: (response) => {
          // if (response.data.mfaRequired) {
          //   router.replace(`/verify-mfa?email=${values.email}`);
          //   return;
          // }
          queryClient.invalidateQueries({ queryKey: ["academicData"] });
          toast({
            title: "Success",
            description: "Session updated successfully",
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
            <DialogTitle>Edit Session</DialogTitle>
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
                        </div>
                        <DialogFooter className="px-6">
                          <div className="flex w-full items-center justify-center">
                            <Button
                              className="h-[40px] w-[205px]"
                              disabled={isPending}
                              type="submit"
                            >
                              {isPending && <Loader className="animate-spin" />}
                              Update session
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

export default UpdateSchool;
